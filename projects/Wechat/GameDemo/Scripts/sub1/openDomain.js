// 开放域界面UI脚本
// created by chenx, 2018.7.27

// define a user behaviour
var OpenDomain = qc.defineBehaviour('FW.OpenDomain', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
}, {
    // fields need to be serialized
});

// Called when the script instance is being loaded.
OpenDomain.prototype.awake = function() {
    var self = this;

    var back = self.gameObject.find("back");
    back.addListener(back.onClick, function(node, pointerEvent) {
        // 关闭界面
        self.gameObject.destroy();
    }, back);

    if (!window.__wx) {
        self.gameObject.find('tip').visible = true;
        return;
    }
    else {
        self.gameObject.find('tip').visible = false;
    }

    self.initCanvasAtlas();
};

OpenDomain.prototype.initCanvasAtlas = function() {
    var self = this;

    // 创建小游戏共享 canvas 对应的 atlas 资源
     var img = self.gameObject.find('openDomainImg');
    sharedCanvas.width = img.width, sharedCanvas.height = img.height;
    self.atlas = qc.AssetUtil.createAtlasFromCanvas(self.game, "openDomainCanvas", sharedCanvas);

    // 取得开放子域工程中对应的 canvas 区域
    var toPos = img.toGlobal({x:0, y:0});
    var y = toPos.y;

    // 取得 openDomainImg 在子域 canvas 对应的区域
    var subY = y / (self.game.world.height) * canvas.height;
    this.x = 0, this.y = subY, this.width = canvas.width, this.height = canvas.width/sharedCanvas.width*sharedCanvas.height;
}

// 每帧更新子域的 canvas 内容
OpenDomain.prototype.update = function() {
    if (!this.atlas)
        return;

    wx.getOpenDataContext().postMessage({
        msg: 'update',
        para: { x: this.x, y: this.y, width: this.width, height: this.height }
    });

    this.atlas = qc.AssetUtil.createAtlasFromCanvas(this.game, "openDomainCanvas", sharedCanvas);
    var img = this.gameObject.find('openDomainImg');
    img.texture = this.atlas;
    img.resetNativeSize();
}
