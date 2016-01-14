/**
 * 绘制当前分数
 */
var CurrentScore = qc.defineBehaviour('qc.tetris.CurrentScore', qc.Behaviour, function() {
    var self = this;
    self.runInEditor = true;
}, {
});

/**
 * 初始化处理
 */
CurrentScore.prototype.awake = function() {
    this.setScore(qc.Tetris.score.current);
};

/**
 * 更新最新的分数
 */
CurrentScore.prototype.setScore = function() {
    this.gameObject.innerHTML = '' + qc.Tetris.score.current;
    
    // 播放缩放动画
    if (qc.Tetris.score.current > 0) {
    	var ts = this.getScript('qc.TweenScale');
        ts.resetToBeginning();
        ts.playForward();    
    }
};