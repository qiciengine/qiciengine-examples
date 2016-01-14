var KillLineEffect = qc.defineBehaviour('qc.tetris.KillLineEffect', qc.Behaviour, function() {
    var self = this;

    /**
     * 所有的行
     */
    self.lines = {};
}, {
    linePrefab: qc.Serializer.PREFAB
});

/**
 * 初始化：将用于表现的行全部创建出来放着
 */
KillLineEffect.prototype.awake = function() {
    var self = this;

    // 创建用于消除表现的格子行
    var createLine = function(flag, start, end) {
        var ob = self.game.add.clone(self.linePrefab, self.gameObject);
        var line = ob.getScript('qc.tetris.LineUI');
        line.init(flag, start, end);
        self.lines[line.key] = line;
    };
    var pts = qc.Tetris.board.xyLines;
    for (var i = 0; i < pts.length; i++) {
        var start = pts[i], end = [start[1], start[0]];
        createLine('xy', start, end);
    }

    var pts = qc.Tetris.board.yLines;
    for (var i = 0; i < pts.length; i++) {
        var start = pts[i], end = [start[0] + start[2] - 1, start[1]];
        createLine('y', start, end);

    }
    var pts = qc.Tetris.board.xLines;
    for (var i = 0; i < pts.length; i++) {
        var start = pts[i], end = [start[0], start[1] + start[2] - 1];
        createLine('x', start, end);
    }
};

KillLineEffect.prototype.find = function(flag) {
    return this.lines[flag];
};

KillLineEffect.prototype.play = function(index, flag, score) {
    var self = this;
    var line = self.find(flag);

    // 消失动画
    line.playDisappear();
};