var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    texture: qc.Serializer.TEXTURE
});

UI.prototype.awake = function() {
    this.addListener(this.game.input.onPointerUp, this.createBaddie, this);
    
    // Create a Node
    this.enemies = this.game.add.node();
    
    // Create some enemies
    for (var i = 0; i < 8; i++) this.createBaddie();
};

UI.prototype.createBaddie = function() {
    var self = this,
        math = self.game.math;
    var buddie = self.game.add.image(this.enemies);
    buddie.texture = this.texture;
    buddie.resetNativeSize();
    buddie.x = 360 + Math.random() * 200;
    buddie.y = 120 + Math.random() * 200;
};
