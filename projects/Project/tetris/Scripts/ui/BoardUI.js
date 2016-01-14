var s = qc.Serializer;

/**
 * 管理棋盘的数据并绘制棋盘
 */
var BoardUI = qc.defineBehaviour('qc.tetris.BoardUI', qc.Behaviour, function() {
    var self = this;
    
    // 登记下本对象
    qc.Tetris.boardUI = self;

    /**
     * 棋盘的棋子元素
     */
    self.pieces = {};

    // 本脚本在编辑模式下可以运行
    self.runInEditor = true;
}, {
    linePrefab: s.PREFAB
});

/**
 * 初始化处理
 */
BoardUI.prototype.awake = function() {
    var self = this;
    self.reset();

    // 立刻重绘制下
    self.redraw();

    // 缓存图片，防止在图片切换过程中出现卡顿
    if (self.game.device.editor) return;
    qc.Tetris.IMAGES.forEach(function(c) {
        var div = document.createElement('div');
        div.className = 'board board_' + c;
        div.style.left = '-2000px';
        div.style.left = '-2000px';
        self.gameObject.div.appendChild(div);
    });
};

/**
 * 重绘棋盘
 * @private
 */
BoardUI.prototype.redraw = function() {
    var self = this;

    // 绘制背景
    self.drawBackground();
};

/**
 * 绘制棋盘背景
 */
BoardUI.prototype.drawBackground = function() {
    var self = this;

    for (var pos in self.pieces) {
        var div = self.pieces[pos];
        div.className = 'board board_' + qc.Tetris.IMAGES[qc.Tetris.board.data[pos].value];
    }
};

/**
 * 初始化棋盘
 */
BoardUI.prototype.reset = function() {
    var self = this, o = self.gameObject;

    // 构建棋盘数据
    self.gameObject.innerHTML = '';
    if (o.children.length === 0) {
        for (var pos in qc.Tetris.board.data) {
            var info = qc.Tetris.board.data[pos];
            var div = self.pieces[pos] = document.createElement('div');
            div.className = 'board board_' + qc.Tetris.IMAGES[info.value];
            div.style.left = Math.round(info.x + (o.width - qc.Tetris.BLOCK_W) / 2) + 'px';
            div.style.top = Math.round(info.y + (o.height - qc.Tetris.BLOCK_H) / 2) + 'px';
            o.div.appendChild(div);
        }
    }
    else {
        o.children.forEach(function(child) {
            self.pieces[child.name] = child;
        });
    }
};