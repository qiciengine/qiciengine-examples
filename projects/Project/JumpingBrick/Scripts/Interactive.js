
var Interactive = qc.defineBehaviour('qc.engine.Interactive', qc.Behaviour, function() {
    var self = this;
	// 设置到全局
    JumpingBrick.service = self;
    
    self.serverUrl = "http://127.0.0.1/JumpingBrick/";
}, {
	serverUrl: qc.Serializer.STRING
});

/**
 * 上传分数
 * @param {string} rid - 用户唯一标示
 * @param {string} token - 当前登陆用户的临时标示
 * @param {number} score - 分数
 * @param {func} callbackFunc - 回调函数
 */
Interactive.prototype.updateScorers = function(rid, token, score, callbackFunc) {
    var url = this.serverUrl + "updateScorers.php";
    url += "?rid=" + rid;
    url += "&token=" + token;
    url += "&score=" + score;

    qc.AssetUtil.get(url, callbackFunc);
};

/**
 * 获取排行榜
 * @param {string} rid - 用户唯一标示
 * @param {string} token - 当前登陆用户的临时标示
 * @param {func} callbackFunc - 回调函数
 */
Interactive.prototype.getRank = function(rid, token, callbackFunc) {
    var url = this.serverUrl + "getRank.php";
    url += "?rid=" + rid;
    url += "&token=" + token;

    qc.AssetUtil.get(url, callbackFunc);
};