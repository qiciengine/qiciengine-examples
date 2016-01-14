/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 消消乐游戏的实现demo
 */
var SourcesUI = qc.defineBehaviour('qc.demo.SourcesUI', qc.Behaviour, function() {
    var self = this;

    // 6种动物的图标配置
    self.icons = ['bear.png', 'owl.png', 'fox.png', 'hippopotamus.png', 'frog.png', 'chicken.png'];

    // 棋盘配置（测试用）：8*8
    self.grids = [
        0, 2, 1, 1, 0, 0, 1, 0,
        1, 0, 2, 2, 0, 0, 1, 0,
        0, 0, 1, 0, 1, 2, 0, 1,
        1, 1, 2, 1, 2, 2, 1, 2,
        0, 0, 1, 0, 1, 0, 0, 4,
        1, 0, 1, 1, 3, 1, 1, 3,
        0, 1, 0, 1, 1, 2, 2, 1,
        0, 0, 1, 0, 0, 2, 1, 1
    ];

    // 动物的预制
    self.gridPrefab = null;

    // 当前棋盘的信息
    self._animations = [];

    // 当前分数
    self.score = 0;

    // 格子的大小
    self.W = 76;
    self.H = 72;

    // 显示分数
    self.scoreLabel = null;

    // 爆炸音效
    self.explodeAudio = null;
}, {
    // 需要序列化的字段
    gridPrefab: qc.Serializer.PREFAB,
    scoreLabel: qc.Serializer.NODE,
    explodeAudio: qc.Serializer.AUDIO
});

Object.defineProperties(SourcesUI.prototype, {
    score: {
        get: function() { return this._score || 0; },
        set: function(v) {
            this._score = v;
            if (this.scoreLabel)
                this.scoreLabel.text = '' + v;
        }
    }
});

// 初始化处理
SourcesUI.prototype.awake = function() {
    this.resetGame();
}

// 重置下游戏
SourcesUI.prototype.resetGame = function() {
    var self = this;
    self.score = 0;

    // 根据配置生成棋盘信息
    self.gameObject.removeChildren();
    self._animations = [];
    for (var i = 0; i < self.grids.length; i++) {
        var node = self.game.add.clone(self.gridPrefab, self.gameObject);
        node.x = (i % 8) * this.W;
        node.y = self.game.math.floorTo(i / 8) * this.H;
        var c = node.getScript('qc.demo.Animal');
        c.setData({
            index: i,
            icon: self.icons[self.grids[i]],
            type: self.grids[i]
        });
        self._animations.push(c);
    }
}

// 拖拽开始的处理
SourcesUI.prototype.onDragStart = function(e) {
    // 播放交换动画过程中不能操作
    if (this._switch) return;
    var source = e.source,
        gPoint = new qc.Point(source.x, source.y),
        point = this.gameObject.toLocal(gPoint);

    this._dragIndex = this.toIndex(point.x, point.y);
    this._dragging = true;
    this.game.log.trace('开始拖拽: {0}', this._dragIndex);
};

// 拖拽的处理
SourcesUI.prototype.onDrag = function(e) {
    if (!this._dragging) return;

    // 计算当前的位置
    var source = e.source,
        gPoint = new qc.Point(source.x, source.y),
        point = this.gameObject.toLocal(gPoint);
    var index = this.toIndex(point.x, point.y);
    if (index === this._dragIndex) return;

    // 位置发生变化了，拖拽结束
    this._dragging = false;

    //如果两者没有啥关系，则不做其他处理
    var relation = this.getRelation(this._dragIndex, index);
    if (!relation) {
        this.game.log.trace('强制取消拖拽: {0}', index);
        return;
    }

    // 播放交换动画
    this.switch(index, this._dragIndex);
};

// 拖拽结束的处理
SourcesUI.prototype.onDragEnd = function(e) {
    this.game.log.trace('拖拽结束');
    this._dragging = false;
};

// 根据坐标换算为第几个格子
SourcesUI.prototype.toIndex = function(x, y) {
    var len = 8;
    var col = this.game.math.floorTo(x / this.W), row = this.game.math.floorTo(y / this.H);
    return row * len + col;
}

/**
 * 获取两个格子的关系
 * @param a - 第一个格子位置
 * @param b - 第二个格子位置
 * @return
 * left - a在b左边
 * right - a在b右边
 * top - a在b上边
 * bottom - a在b下面
 * undefined - 不相邻
 */
SourcesUI.prototype.getRelation = function(a, b) {
    var size = 8;
    var col1 = a % size, row1 = this.game.math.floorTo(a / size);
    var col2 = b % size, row2 = this.game.math.floorTo(b / size);

    if (col1 + 1 === col2 && row1 === row2) return 'left';
    if (col1 - 1 === col2 && row1 === row2) return 'right';
    if (col1 === col2 && row1 + 1 === row2) return 'top';
    if (col1 === col2 && row1 - 1 === row2) return 'bottom';
}

/**
 * 交换位置，如果有可以消除的则消除之，否则重置回来
 * @param index1
 * @param index2
 */
SourcesUI.prototype.switch = function(index1, index2) {
    var self = this;
    self._switch = true;

    // 复制一份出来，预先交换位置
    var grids = self.grids.concat();
    var a = grids[index1];
    grids[index1] = grids[index2],
    grids[index2] = a;
    var result = qc.demo.SourcesUtil.findResult(grids);

    var count = 2;
    var o1 = self._animations[index1].gameObject,
        o2 = self._animations[index2].gameObject;
    var reset = function() {
        self.moveGrid(o2, index2, function() { self._switch = false; });
        self.moveGrid(o1, index1, function() { self._switch = false; });
    };
    var afterSwitch = function() {
        if (result.length < 1) {
            // 无法消除，重置回去
            self.game.log.trace('无效的移动');
            reset();
        }
        else {
            // 更新下棋盘的最新信息
            self.grids = grids;
            var t = self._animations[index1];
            self._animations[index1] = self._animations[index2];
            self._animations[index2] = t;
            self._animations[index1].index = index1;
            self._animations[index2].index = index2;

            // 消除之
            self.game.log.trace('开始播放消除动画');
            self.disappear(result);
        }
    };
    var waitEnd = function() {
        count--;
        if (count <= 0) {
            // 交换结束的处理
            afterSwitch();
        }
    };
    self.moveGrid(o1, index2, waitEnd);
    self.moveGrid(o2, index1, waitEnd);
};

/**
 * 格子从当前位置移动到目标格子
 * @param grid
 * @param targetIndex
 */
SourcesUI.prototype.moveGrid = function(grid, targetIndex, cb) {
    var self = this, c = grid.getScript('qc.TweenPosition');
    c.from = new qc.Point(grid.x, grid.y);
    c.to = new qc.Point((targetIndex % 8) * this.W,
        this.game.math.floorTo(targetIndex / 8) * this.H);
    c.duration = 0.3;
    c.onFinished.addOnce(function() {
        if (cb)
            self.game.timer.add(1, cb);
    });
    c.resetToBeginning();
    c.playForward();
};

/**
 * 播放格子消失的动画
 * @param result
 */
SourcesUI.prototype.disappear = function(result) {
    var self = this, count = 0, score = 0;

    // 播放爆炸音效
    var sound = self.game.add.sound();
    sound.audio = self.explodeAudio;
    sound.play();

    // 消失动画完毕后的处理
    var waitDisappear = function() {
        if (--count <= 0) {
            // 开始补充新的格子
            self.addAnimations();
        }
    };

    for (var i in result) {
        var line = result[i];

        // 累积分数
        score += 2 + (line.length - 3) * 2;
        self.score += score;
        for (var j in line) {
            // 这个格子消失掉并播放爆炸效果
            var index = line[j];
            self.grids[index] = -1;
            count++;
            self._animations[index].disappear(waitDisappear);
        }
    }
};

/**
 * 补充新的格子
 */
SourcesUI.prototype.addAnimations = function() {
    var self = this, count = 0;

    // 掉落完毕的处理
    var waitDrop = function() {
        if (--count <= 0) {
            var result = qc.demo.SourcesUtil.findResult(self.grids);
            if (result.length === 0)
                self._switch = false;
            else
                self.disappear(result);
        }
    };

    for (var col = 0; col < 8; col++) {
        var empty = 0;
        for (var row = 7; row >= 0; row--) {
            var index = col + row * 8;
            var type = self.grids[index];
            if (type === -1) {
                // 这是个空格
                empty++;
                continue;
            }

            if (empty === 0) continue;

            // 格子(index + 8 * empty)需要从index往下掉落
            count++;
            self.grids[index + 8 * empty] = type;
            self.game.log.trace('drop: {0} -> {1}', index, index + 8 * empty);
            self._animations[index + 8 * empty].drop(type, self.icons[type], index, waitDrop);
        }

        // 需要生成empty个格子，填满前几个空行
        for (var i = 0; i < empty; i++) {
            // TODO: 正确应该是(0, 5)
            // 这里为了演示效果，少放几个
            var type = self.game.math.random(0, 2);
            count++;
            self.grids[i * 8 + col] = type;
            self.game.log.trace('drop: {0} -> {1}', (i - empty) * 8 + col, i * 8 + col);
            self._animations[i * 8 + col].drop(type, self.icons[type], (i - empty) * 8 + col, waitDrop);
        }
    }
};
