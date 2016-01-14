/**
 * Anchored the Node to Left-Top
 */ 
var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    // fields need to serialize
});

UI.prototype.awake = function() {
	// Download the texture and then create UIImage
    var self = this;
    self.game.assets.load('texture2', 'Assets/texture/texture2.bin', function(t) {
        // create UIImage
        var node = self.game.add.image(self.gameObject);
        node.name = 'Percentage2';
        node.texture = t;
        
        // Set minAnchor and maxAnchor
        node.setAnchor(new qc.Point(0.2, 0.3), new qc.Point(0.2, 0.3));
        
        // Set Position
        node.anchoredX = 100;
        node.anchoredY = 100;
        
        // set size
        node.resetNativeSize();
    });
};
