var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
    // Load the texture
    var self = this;
    this.game.assets.load('Assets/texture/block.bin', function(texture) {
        console.log('Load ok', texture);
        
        // Create a UIImage
        var node = self.game.add.image(self.gameObject);
        
        // You can use 'texture' :
        //   node.texture = texture
        // Also, find(url) = texture :
        node.texture = self.game.assets.find('Assets/texture/block.bin');
        node.resetNativeSize();
    });
};