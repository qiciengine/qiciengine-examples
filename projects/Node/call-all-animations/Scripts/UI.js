var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    coinAtlas: qc.Serializer.TEXTURE
});

UI.prototype.awake = function() {
    for (var i = 0; i < 50; i++) {
        var sprite = this.game.add.sprite(this.gameObject);
        sprite.texture = this.coinAtlas;
        sprite.resetNativeSize();
        sprite.x = this.game.math.random(0, this.gameObject.width);
        sprite.y = this.game.math.random(0, this.gameObject.height);
    }
    
    // Play Animation
    this.gameObject.children.forEach(function(child) {
        child.playAnimation('rotate');
    });
};