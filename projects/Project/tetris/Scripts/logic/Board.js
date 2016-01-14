var Board = qc.Tetris.Board = function() {
    var self = this,
        size = qc.Tetris.SIZE,
        len = qc.Tetris.BLOCK_H;

    // 构建用来转换格子坐标的矩阵
    var m = self.m = new qc.Matrix();
    m.a = len;
    m.c = len / 2;
    m.d = len * (Math.sqrt(3) / 2);

    // 初始化棋盘数据
    self.data = {};
    for (var i = -size; i <= size; i++) {
        for (var j = -size; j <= size; j++) {
            // 这些格子落在六边形外，忽略掉
            if (i * j > 0 && Math.abs(i + j) > size) continue;
            if (i * j < 0 && (Math.abs(i) > size || Math.abs(j) > size)) continue;

            // 计算格子的坐标和对应屏幕上的偏移
            var pos = Tetris.makePos(i, j);
            var pt = self.toWorld(new qc.Point(i, j));
            self.data[pos] = {
                value: 0,
                x: pt.x,
                y: pt.y
            };
        }
    }
    
    // 左斜的9条线
    self.xyLines = [
        [0, -4],
        [1, -4],
        [2, -4],
        [3, -4],
        [4, -4],

        [4, -3],
        [4, -2],
        [4, -1],
        [4, 0]
    ];

    // 横向9条线
    self.yLines = [
        [0, -4, 5],
        [-1, -3, 6],
        [-2, -2, 7],
        [-3, -1, 8],
        [-4, 0, 9],
        [-4, 1, 8],
        [-4, 2, 7],
        [-4, 3, 6],
        [-4, 4, 5]
    ];

    // 右斜9条线
    self.xLines = [
        [-4, 0, 5],
        [-3, -1, 6],
        [-2, -2, 7],
        [-1, -3, 8],
        [0, -4, 9],
        [1, -4, 8],
        [2, -4, 7],
        [3, -4, 6],
        [4, -4, 5]
    ];
};
Board.prototype = {};
Board.prototype.constructor = Board;

Object.defineProperties(Board.prototype, {
    /**
     * @property {boolean} die - 当前是否已经死亡了
     * @readonly
     */ 
    die: {
        get: function() {
            // 如果有单个点形状的，一定死不了
            var pool = qc.Tetris.Shapes.pool;
            for (var i = 0; i < pool.length; i++) {
                if (pool[i].list.length === 1) return false;
            }

            // 逐一检查，各形状能否扔来进来
            for (var pos in this.data) {
                for (var i = 0; i < pool.length; i++) {
                    if (this.checkPutIn(pos, pool[i].list)) return false;
                }
            }
            return true;
        }
    }
});

/**
 * 清空棋盘
 */
Board.prototype.clear = function() {
    for (var pos in this.data) {
        this.data[pos].value = 0;
    }
};

/**
 * 重新开始游戏
 */
Board.prototype.restart = function() {
    this.clear();
};

// 判定形状可以放进来不
// pos: 目标逻辑坐标
// list: 形状的信息
Board.prototype.checkPutIn = function(pos, list) {
    var self = this;
    var pt = qc.Tetris.readPos(pos),
        x = pt.x,
        y = pt.y;

    for (var i = 0; i < list.length; i++) {
        var x0 = x + list[i][0],
            y0 = y + list[i][1];

        // 这个点应该是空的
        var block = self.data[qc.Tetris.makePos(x0, y0)];
        if (!block) return false;
        if (block.value !== 0) return false;
    }
    return true;
};

// 放进来
Board.prototype.putIn = function(pos, list, value) {
    var self = this;
    var pt = qc.Tetris.readPos(pos),
        x = pt.x,
        y = pt.y;

    for (var i = 0; i < list.length; i++) {
        var x0 = x + list[i][0],
            y0 = y + list[i][1];

        // 这个点应该是空的
        var block = self.data[qc.Tetris.makePos(x0, y0)];
        block.value = value;
    }
};

// 干掉一行
Board.prototype.clearLine = function(pts) {
    var self = this;
    pts.forEach(function(pos) {
        self.data[pos].value = 0;
    });
};

// 取得可以消除的行
Board.prototype.getFullLines = function() {
    var self = this,
        lines = [];

    // 横向9条线
    var pts = self.yLines;
    for (var i = 0; i < pts.length; i++) {
        var start = pts[i], end = [start[0] + start[2] - 1, start[1]];
        var ok = true;
        for (var x = start[0], y = start[1]; x <= end[0];) {
            var pos = qc.Tetris.makePos(x, y);
            if (self.data[pos].value === 0) {
                // 不符合，不能消除
                ok = false; break;
            }

            // 下一个点
            x++;
        }
        if (ok) {
            // 这条线可以消除，添加进来
            lines.push('y' + qc.Tetris.makePos(start[0], start[1]));
        }
    }

    // 右斜9条线
    var pts = self.xLines;
    for (var i = 0; i < pts.length; i++) {
        var start = pts[i], end = [start[0], start[1] + start[2] - 1];
        var ok = true;
        for (var x = start[0], y = start[1]; y <= end[1];) {
            var pos = qc.Tetris.makePos(x, y);
            if (self.data[pos].value === 0) {
                // 不符合，不能消除
                ok = false; break;
            }

            // 下一个点
            y++;
        }
        if (ok) {
            // 这条线可以消除，添加进来
            lines.push('x' + qc.Tetris.makePos(start[0], start[1]));
        }
    }

    // 左斜的9条线
    var pts = self.xyLines;
    for (var i = 0; i < pts.length; i++) {
        var start = pts[i], end = [start[1], start[0]];
        var ok = true;
        for (var x = start[0], y = start[1]; true;) {
            var pos = qc.Tetris.makePos(x, y);
            if (self.data[pos].value === 0) {
                // 不符合，不能消除
                ok = false; break;
            }

            // 下一个点
            if (end[0] > start[0]) {
                x++, y--;
                if (x > end[0]) break;
            }
            else {
                x--, y++;
                if (x < end[0]) break;
            }
        }
        if (ok) {
            // 这条线可以消除，添加进来
            lines.push('xy' + qc.Tetris.makePos(start[0], start[1]));
        }
    }

    return lines;
};

// 根据格子的逻辑坐标，算出所在的屏幕坐标
// distance: 两个格子中心点之间的距离
Board.prototype.toWorld = function(p, distance) {
    if (!distance)
        return this.m.apply(p);

    var m = new qc.Matrix();
    m.a = distance;
    m.c = distance * 0.5;
    m.d = distance * (Math.sqrt(3) * 0.5);
    return m.apply(p);
};

// 根据格子的屏幕坐标，反算格子的逻辑坐标
Board.prototype.toLocal = function(p) {
    return this.m.applyInverse(p);
};