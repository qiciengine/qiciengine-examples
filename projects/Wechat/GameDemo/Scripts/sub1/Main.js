// 主场景的UI脚本
// created by chenx, 2018.7.27

// define a user behaviour
var Main = qc.defineBehaviour('FW.Main', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
}, {
    // fields need to be serialized
});

// Called when the script instance is being loaded.
Main.prototype.awake = function() {
    var self = this;

    var openDomainBtn = self.gameObject.find("bg/btn");
    openDomainBtn.addListener(openDomainBtn.onClick, function(node, pointerEvent) {
        // 加载开放域界面
        self.game.assets.load('Assets/prefab/openDomain.bin', function(asset) {
            self.game.add.clone(asset, self.gameObject);
        });
    }, openDomainBtn);
};
