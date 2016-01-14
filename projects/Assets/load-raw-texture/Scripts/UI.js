var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
    var self = this;
    
    // Load from website
    // !!!May cause cross-origin error!!!
    var url = 'http://www.qcplay.com/Public/Qcplay/images/logo.png';
    self.game.assets.loadTexture(url, function(texture) {
        // ALSO:
        // self._display(0, 0, self.game.assets.find(url));
        self._display(20, 20, texture);
    });
};

UI.prototype._display = function(x, y, texture) {
    var o = this.game.add.image(this.gameObject);
    o.texture = texture;
    o.x = x;
    o.y = y;
    o.resetNativeSize();
};