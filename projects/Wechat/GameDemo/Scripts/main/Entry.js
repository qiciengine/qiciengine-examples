// 入口场景的UI脚本
// created by chenx, 2018.7.27

// define a user behaviour
var Entry = qc.defineBehaviour('FW.Entry', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    this.md5ListDone = false;
    this.subpackageDone = false;
}, {
    // fields need to be serialized
});

// Called when the script instance is being loaded.
Entry.prototype.awake = function() {
    var self = this;

    if (qici.config.scene && qici.config.scene[0] && qici.config.scene[0].indexOf("Temp") === 0) {
        // 本地浏览器调试
        window.IS_BROWER_PREVIEW = true;
        self.md5ListDone = true;
        self.subpackageDone = true;
    }

    // 启动定时器，md5列表和分包加载完毕后进入主场景
    var timerId = self.game.timer.loop(100, function() {
        if (self.md5ListDone && self.subpackageDone) {
            self.game.timer.remove(timerId);
            self.enterMainScene();
        }
    })

    if (!window.IS_BROWER_PREVIEW) {
        window.dislist = {};
        // 下载 dislist 文件，比对版本号
        DISLIST_URL = (qici.config.baseUrl || '') + "dislist.dis";
        MD5_URL = (qici.config.baseUrl || '') + "Assets/assets.md5";
        qc.AssetUtil.updateWxResMd5(self.game, DISLIST_URL, MD5_URL, function(dislist) {
            if (!dislist) {
                self.game.log.error('Assets update fail.');
                return;
            }
            window.dislist = dislist;
            self.md5ListDone = true;
        });
    }

    // 加载分包
    if (window.__wx) {
        wx.loadSubpackage({
            name: 'sub1',
            success: function(res) {
                self.game.log.trace("分包加载完毕。");
                self.subpackageDone = true;
            },
            fail: function(res) {
                self.game.log.error('download sub1 package fail({0}).', res);
            }
        });
    }
    else {
        self.subpackageDone = true;
    }
};

Entry.prototype.enterMainScene = function() {
    var self = this;
    var preloadList = [
        'Assets/scene/Main.bin',
    ];

    // 单个资源下载完毕的回调
    var singleDone = function(assetInfo) {
        self.game.log.trace("下载进度：{0}/{1}", self.game.assets.loaded, self.game.assets.total);

        if (!assetInfo.asset && !assetInfo.dependenceAsset)
            self.game.log.important("资源({0})下载失败！", assetInfo.url);
        else if(assetInfo.asset) {
            // 若该资源有加载回调，则调用回调
        }
    }

    // 预加载资源
    var assets = [];
    for (var i = 0; i < preloadList.length; i++) {
        var url = preloadList[i];
        var assetInfo = {
            key: url,
            url: url,
            callback: singleDone,
        };

        assets.push(assetInfo);
    }

    // 开始批量下载
    self.game.assets.loadBatch(assets, function() {
        // 全部加载完毕，跳转到 Main
        self.game.scene.load("Main");
    });
}
