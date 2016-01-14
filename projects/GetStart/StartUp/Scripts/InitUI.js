/**
 * 界面和资源的初始化
 */
var InitUI = qc.defineBehaviour('qc.startup.InitUI', qc.Behaviour, function() {
}, {});

/**
 * 初始化工作
 */
InitUI.prototype.awake = function() {
    var self = this;

    // 下载excel文件
    self.game.assets.load('config', 'Assets/excel/config.bin', function(r) {
        if (!r) {
            alert('Download fail.');
            return;
        }

        // 下载成功了
        G.monsters.init();
        
        // 切换到主场景
        self.game.state.load('Game');
    });
};
