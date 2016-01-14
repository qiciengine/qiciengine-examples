/**
 * 游戏结束界面
 */
var GameOverUI = qc.defineBehaviour('qc.tetris.GameOverUI', qc.Behaviour, function() {
    var self = this;
    qc.Tetris.gameOver = self;
    self.runInEditor = true;
}, {
    shareClue: qc.Serializer.PREFAB
});

GameOverUI.prototype.awake = function() {
    var div = this.gameObject.div;
    var score = qc.Tetris.score.current;
    var percent = 40;

    this.rawHtml =
        '<div class="gameover_title">Game Over</div>' +
        '<div class="gameover_score">__SCORE__</div>' +
        '<div class="gameover_pos">你击败了全球__PERCENT__%的玩家</div>' +
        '<div class="gameover_desc">让朋友们来膜拜大神吧！</div>' +
        '<div class="gameover_share" onclick="qc.Tetris.gameOver.share()" ontouchstart="qc.Tetris.gameOver.share()">马上告诉他们</div>' +
        '<div class="gameover_restart" onclick="qc.Tetris.gameOver.restart()" ontouchstart="qc.Tetris.gameOver.restart()">再玩一次</div>' +
        '<div class="gameover_act">' +
        '    <div class="gameover_logo"></div><div class="gameover_act_desc">点击关注送好礼</div> ' +
        '</div>' +
        '<div class="clear"></div>';
    this.rawHtml = this.rawHtml.replace('__SCORE__', '' + score);
    this.rawHtml = this.rawHtml.replace('__PERCENT__', '' + percent);
    div.innerHTML = this.rawHtml;
};

GameOverUI.prototype.onDestroy = function() {
    delete qc.Tetris.gameOver;
};

GameOverUI.prototype.share = function() {
    // 打开share界面
    this.game.add.clone(this.shareClue, this.gameObject.parent);
};

GameOverUI.prototype.restart = function() {
    this.gameObject.destroy();
    qc.Tetris.operation.restart();
};