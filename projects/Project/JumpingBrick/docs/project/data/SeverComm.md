# 服务器连接
服务器部分已经搭建完成，这里就需要与服务器进行通讯。构建一个与服务器的通讯类： Interactive.js，使用引擎[AssetUtil](http://docs.zuoyouxi.com/api/assets/AssetUtil.html)功能，将这个脚本加载到UIRoot上，进行与服务器的通讯。  
代码如下：  

````javascript

var Interactive = qc.defineBehaviour('qc.engine.Interactive', qc.JumpingBrick.GameOver, function() {
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

````