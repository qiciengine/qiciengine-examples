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
        node.name = 'LeftTop2';
        node.texture = t;
        
        // Default:
        //  pivotX = pivotY = 0
        //  minAnchor = maxAnchor = (0, 0)
        node.anchoredX = 100;
        node.anchoredY = 150;
        
        // set size
        node.resetNativeSize();
    });
};
