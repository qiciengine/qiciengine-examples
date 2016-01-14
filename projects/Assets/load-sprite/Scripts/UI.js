var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
    // Load the sprite
    // Same to 'load the image'
    var self = this;
    this.game.assets.load('Assets/sprite/panda.bin', function(texture) {
        console.log('Load ok', texture);
        
        // Create a Sprite
        var node = self.game.add.sprite(self.gameObject);
        node.x = 150;
        node.y = 150;
        
        // Also:
        // node.texture = self.game.assets.find('Assets/sprite/panda.bin');
        node.texture = texture;
        
        node.playAnimation('idle');
    });
};