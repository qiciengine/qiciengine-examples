/**
* 绘制最高分数
*/
var BestScore = qc.defineBehaviour('qc.tetris.BestScore', qc.Behaviour, function() {
    var self = this;
    self.runInEditor = true;
}, {
});

/**
* 初始化处理
*/
BestScore.prototype.awake = function() {
    this.setScore(qc.Tetris.score.current);
};

/**
* 更新最新的高分
*/
BestScore.prototype.setScore = function(best) {
    this.gameObject.innerHTML = 'Best: ' + best;
};