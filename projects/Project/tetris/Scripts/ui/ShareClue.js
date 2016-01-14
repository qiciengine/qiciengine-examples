/**
 * 分享提示页面
 */
var ShareClue = qc.defineBehaviour('qc.tetris.ShareClue', qc.Behaviour, function() {
    var self = this;
    self.runInEditor = true;
}, {
    descNode: qc.Serializer.NODE
});

/**
 * 初始化
 */
ShareClue.prototype.awake = function() {
    this.descNode.div.innerHTML = '请点击右上角<br/>分享给您的好友吧<br/>看下他们能取得多少分';
};

/**
 * 点击时干掉本页面
 */
ShareClue.prototype.onClick = function() {
    this.gameObject.destroy();
};