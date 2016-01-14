var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
    // Load the texture identified by 'block'
    var self = this;
    this.game.assets.load('block', 'Assets/texture/block.bin', function(texture) {
        console.log('Load ok', texture);
        
        // Create a UIImage
        var node = self.game.add.image(self.gameObject);
        
        // You can use 'texture' :
        //   node.texture = texture
        // Also, find(url) = texture
        //   node.texture = self.game.assets.find('Assets/texture/block.bin');
        // Also, find(key) = texture :
        node.texture = self.game.assets.find('block');
        node.resetNativeSize();
    });
};