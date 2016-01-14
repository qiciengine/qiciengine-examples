/**
 * Created by qcplay on 9/10/15.
 */

var CollideControl = qc.mario.CollideControl = function(game, mario, map) {
    var self = this;

    self.game = game;

    self.mario = mario;

    self.map = map;

    /**
     * 小马里奥的大小
     * @type {{width: number, height: number}}
     */
    self.mini_mario_size = { width: 12, height: 16 };

    /**
     * 大马里奥的大小
     * @type {{width: number, height: number}}
     */
    self.mario_size = { width: 14, height: 32 };

    self.cellWidth = self.map.tileWidth;

    self.cellHeight = self.map.tileHeight;

    self.mapWidth = self.map.mapWidth;

    self.mapHeight = self.map.mapHeight;

    self.barrier = self.map.getLayerByName('Barrier');

    self.foreground = self.map.getLayerByName('Foreground');
};

CollideControl.prototype = {};
CollideControl.prototype.constructor = CollideControl;

/**
 * 是否能跳跃
 * @param isMini
 * @returns {boolean}
 */
CollideControl.prototype.canJump = function(isMini) {
    var offset = { x: 0, y: 1 };
    this.testCollide(offset, isMini);
    return offset.y === 0;
};

/**
 * 判定范围是否有碰撞
 * @param minX
 * @param minY
 * @param maxX
 * @param maxY
 * @returns {boolean}
 */
CollideControl.prototype.testRectCollide = function(minX, maxX, minY, maxY) {
    var self = this;
    for (var x = minX; x <= maxX; ++x) {
        for (var y = minY; y <= maxY; ++y) {
            if (self.barrier.getTileIndex(x, y) > 0||
                self.foreground.getTileIndex(x, y) > 0) {
                return true;
            }
        }
    }
    return false;
};

/**
 * 检测碰撞
 * @param offset
 * @param isMini
 * @param callback
 */
CollideControl.prototype.testCollide = function(offset, isMini) {
    var self = this,
        mario = self.mario,
        map = self.map;

    if (offset.x === 0 && offset.y === 0) {
        return CollideControl.NO;
    }

    var gameWidth = self.game.width / map.getWorldScale().x;
    var scrollX = map.scrollX;
    var size = isMini ? self.mini_mario_size : self.mario_size;

    // 计算移动后的位置
    var xLeftPos = mario.x - 0.5 * size.width + offset.x;
    var xRightPos = mario.x + 0.5 * size.width + offset.x;
    var yTopPos = mario.y - size.height + offset.y;
    var yBottomPos = mario.y + offset.y;
    var xLeftCell = Math.floor(xLeftPos / self.cellWidth);
    var xRightCell = Math.ceil(xRightPos / self.cellWidth) - 1;
    var yTopCell = Math.floor(yTopPos / self.cellHeight);
    var yBottomCell = Math.ceil(yBottomPos / self.cellHeight) - 1;

    // 计算移动前位置
    var xOldLeftPos = mario.x - 0.5 * size.width;
    var xOldRightPos = mario.x + 0.5 * size.width;
    var yOldTopPos = mario.y - size.height;
    var yOldBottomPos = mario.y;
    var xOldLeftCell = Math.floor((mario.x - 0.5 * size.width) / self.cellWidth);
    var xOldRightCell = Math.ceil((mario.x + 0.5 * size.width) / self.cellWidth) - 1;
    var yOldTopCell = Math.floor((mario.y - size.height) / self.cellHeight);
    var yOldBottomCell = Math.ceil((mario.y) / self.cellHeight) - 1;

    // 不可出屏幕
    if (gameWidth > size.width) {
        if (scrollX + xLeftPos < 0) {
            offset.x -= scrollX + xLeftPos;
            return CollideControl.OUT_SCREEN;
        }
        else if (scrollX + xRightPos > gameWidth) {
            offset.x -= scrollX + xRightPos - gameWidth;
            return CollideControl.OUT_SCREEN;
        }
    }

    // 不可出地图
    if (xLeftCell < 0) {
        offset.x -= xLeftPos;
        return CollideControl.OUT_WORLD;
    }
    else if (xRightCell >= self.mapWidth) {
        offset.x -= xLeftPos - self.cellWidth * self.mapWidth;
        return CollideControl.OUT_WORLD;
    }

    // 在上边界外，默认无碰撞
    if (yTopCell < 0) {
        return CollideControl.NO;
    }

    // 在下边界死亡
    if (yBottomCell >= self.mapHeight) {
        offset.die = true;
        return CollideControl.NO;
    }

    var yPass = true, xPass = true, yOldPass = true, xOldPass = true;
    // 检测x,y同时移动，只移动x，和只移动y的碰撞情况
    if (self.testRectCollide(xLeftCell, xRightCell, yTopCell, yBottomCell)) {
        (offset.y !== 0) && (yPass = false);
        (offset.x !== 0) && (xPass = false);
    }
    if (self.testRectCollide(xOldLeftCell, xOldRightCell, yTopCell, yBottomCell)) {
        yOldPass = false;
    }
    if (self.testRectCollide(xLeftCell, xRightCell, yOldTopCell, yOldBottomCell)) {
        xOldPass = false;
    }

    // 如果有碰撞则移动到当前所在格子的边界上
    if (xPass && yPass) {
        return CollideControl.NO;
    }
    else if (!xPass && (yPass || yOldPass)) {
        offset.x = offset.x < 0 ? xOldLeftCell * self.cellWidth - xOldLeftPos : (xOldRightCell + 1) * self.cellWidth - xOldRightPos;
        return CollideControl.CONTINUE;
    }
    else if (!yPass && (xPass || xOldPass)) {
        var offY = offset.y;
        offset.y = offset.y < 0 ? yOldTopCell * self.cellHeight - yOldTopPos : (yOldBottomCell + 1) * self.cellHeight - yOldBottomPos;
        return offY >= 0 ? CollideControl.CLEAR_JUMP : CollideControl.CLEAR_Y_V;
    }
    else {
        var offY = offset.y;
        offset.x = offset.x < 0 ? xOldLeftCell * self.cellWidth - xOldLeftPos : (xOldRightCell + 1) * self.cellWidth - xOldRightPos;
        offset.y = offset.y < 0 ? yOldTopCell * self.cellHeight - yOldTopPos : (yOldBottomCell + 1) * self.cellHeight - yOldBottomPos;
        return offY >= 0 ? CollideControl.CLEAR_JUMP : CollideControl.CLEAR_Y_V;
    }
    return CollideControl.NO;
};

var value = 0;
// 无碰撞
CollideControl.NO = value++;
// 需要以修正过的offset重新检测
CollideControl.CONTINUE = value++;
// 出屏幕
CollideControl.OUT_SCREEN = value++;
// 出世界
CollideControl.OUT_WORLD = value++;
// 清理跳跃状态
CollideControl.CLEAR_JUMP = value++;
// 在上方碰撞时需要清零y轴上的速度
CollideControl.CLEAR_Y_V = value++;
