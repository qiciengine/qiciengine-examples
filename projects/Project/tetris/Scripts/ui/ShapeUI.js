/**
 * 绘制一个形状
 */
var ShapeUI = qc.defineBehaviour('qc.tetris.ShapeUI', qc.Behaviour, function() {
    var self = this;

    // 格子的预置，一个形状下有多个格子
    self.blockPrefab = null;

    // 下属所有的格子
    self._blocks = {};
}, {
    blockPrefab: qc.Serializer.PREFAB
});

Object.defineProperties(ShapeUI.prototype, {
    /**
     * 关联的数据
     */
    data: {
        get: function() { return this._data; },
        set: function(v) {
            this._data = v;
            this.redraw();
        }
    },

    /**
     * 第几个？
     */
    index: {
        get: function() {
            return this.gameObject.parent.getChildIndex(this.gameObject);
        }
    }
});

/**
 * 初始化
 */
ShapeUI.prototype.awake = function() {
    // 点击时的偏移量
    var self = this;
    self.offsetY = self.game.device.desktop ? 0 : 50;
};

/**
 * 重新绘制区块
 */
ShapeUI.prototype.redraw = function() {
    var self = this;
    var frame = qc.Tetris.IMAGES[self.data.value];
    self.data.list.forEach(function(pos) {
        var x = pos[0], y = pos[1];
        var block = self.game.add.clone(self.blockPrefab, self.gameObject);
        block.find('block').frame = frame + '.png';
        block.name = x + '_' + y;
        self._blocks[qc.Tetris.makePos(x, y)] = block;
    });
    self.reset();
};

/**
 * 重设区块大小和排列下属格子的位置
 */
ShapeUI.prototype.reset = function(fixToBoard) {
    var self = this, o = self.gameObject;
    for (var pos in self._blocks) {
        var p = qc.Tetris.readPos(pos);
        var pt = qc.Tetris.board.toWorld(p, fixToBoard ? qc.Tetris.BLOCK_H : qc.Tetris.POOL_DISTANCE_NORMAL);
        var block = self._blocks[pos];
        block.anchoredX = pt.x;
        block.anchoredY = pt.y;

        var scale = fixToBoard ? 1.13 : 1;
        block.find('shadow').scaleX = scale;
        block.find('shadow').scaleY = scale;
        block.find('block').scaleX = scale;
        block.find('block').scaleY = scale;
    }
};

/**
 * 鼠标按下：放大区块
 */
ShapeUI.prototype.onDown = function(e) {
    var self = this, o = self.gameObject;
    self.drop = false;
    self.reset(true);

    // 在手机下，需要往上做点偏移
    o.y -= self.offsetY;
};

/**
 * 鼠标松开：重置区块大小
 */
ShapeUI.prototype.onUp = function() {
    var self = this;
    self.reset();
};

/**
 * 拖拽开始
 */
ShapeUI.prototype.onDragStart = function(e) {
    var self = this;
    self.drop = false;
    self.drag = true;
    self.lastPos = '';
    self.game.input.nativeMode = true;
    self.reset(true);

    self.game.log.trace('Start drag:{0}', self.index);

    // 复制出可放入标记
    var ob = self.flagBlocks = self.game.add.clone(self.gameObject, qc.Tetris.boardUI.gameObject);
    ob.children.forEach(function(block) {
        block.find('shadow').visible = false;
        var b = block.find('block');
        b.width = qc.Tetris.BLOCK_W;
        b.height = qc.Tetris.BLOCK_H;
        b.scaleX = 1;
        b.scaleY = 1;
        b.frame = 'dark' + b.frame;
    });
    ob.scaleX = 1;
    ob.scaleY = 1;
    ob.interactive = false;
    self.hideFlag();
};

/**
 * 拖拽中
 */
ShapeUI.prototype.onDrag = function(e) {
    var self = this,
        o = self.gameObject;
    if (self.drag) {
        // 改变节点的目标位置
        var p = o.getWorldPosition();
        p.x += e.source.deltaX;
        p.y += e.source.deltaY;
        var lp = o.parent.toLocal(p);
        o.x = lp.x;
        o.y = lp.y;

        // 计算当前对应棋盘中心点的偏移
        var board = qc.Tetris.boardUI.gameObject;
        p = board.toLocal(p);
        p.y += board.height * 0.5;

        // 反算出对应的归一化坐标
        var xy = qc.Tetris.board.toLocal(p);
        var x = Math.round(xy.x),
            y = Math.round(xy.y),
            pos = qc.Tetris.makePos(x, y);
        if (self.lastPos !== pos) {
            self.lastPos = pos;
            if (qc.Tetris.board.data[pos] &&
                qc.Tetris.board.checkPutIn(pos, self.data.list)) {
                self.showFlag(pos);
            }
            else {
                self.hideFlag();
            }
        }
    }
};

/**
 * 拖拽结束
 */
ShapeUI.prototype.onDragEnd = function(e) {
    var self = this,
        o = self.gameObject;
    self.drag = false;

    if (self.flagBlocks.visible && self.lastPos) {
        // 放到这个位置中去
        self.drop = true;
        qc.Tetris.operation.putIn(self.index, self.lastPos, self.data);
    }
    else {
        self.reset();
        o.parent.getScript('qc.tetris.Pool').resize();
    }

    // 显示标记可以干掉了
    self.flagBlocks.destroy();
    delete self.flagBlocks;
};

/**
 * 隐藏指示标记
 */
ShapeUI.prototype.hideFlag = function() {
    this.flagBlocks.visible = false;
};

/**
 * 显示指示标记
 */
ShapeUI.prototype.showFlag = function(pos) {
    this.flagBlocks.visible = true;
    var pt = qc.Tetris.board.data[pos];
    this.flagBlocks.anchoredX = pt.x;
    this.flagBlocks.anchoredY = pt.y;
};

/**
 * 飞入动画
 */
ShapeUI.prototype.flyIn = function(offset) {
    var self = this,
        tp = self.getScript('qc.TweenPosition');

    tp.delay = 0.5;
    tp.to = new qc.Point(self.gameObject.x, self.gameObject.y);
    tp.from = new qc.Point(tp.to.x + offset, tp.to.y);
    tp.resetToBeginning();
    tp.playForward();
};