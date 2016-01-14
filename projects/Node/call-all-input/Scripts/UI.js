var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    coinAtlas: qc.Serializer.TEXTURE
});

UI.prototype.awake = function() {
    var self = this;
    
    for (var i = 0; i < 50; i++) {
        var sprite = this.game.add.sprite(this.gameObject);
        sprite.texture = this.coinAtlas;
        sprite.resetNativeSize();
        sprite.x = this.game.math.random(0, this.gameObject.width);
        sprite.y = this.game.math.random(0, this.gameObject.height);
        sprite.interactive = true;
    }
    
    this.gameObject.children.forEach(function(child) {
        self.addListener(child.onClick, self.onCoinClick, self);
    });
};

UI.prototype.onCoinClick = function(coin) {
    coin.alpha = 0.3;
};