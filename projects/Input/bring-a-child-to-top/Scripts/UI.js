var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
    this.textures = [];
}, {
    textures: qc.Serializer.TEXTURES
});

UI.prototype.awake = function() {
    // create 20 UIImage by random
    var math = this.game.math;
    for (var i = 0; i < 20; i++) {
        var node = this.game.add.image(this.gameObject);
        node.texture = this.textures[math.random(0, this.textures.length - 1)];
        node.resetNativeSize();
        node.x = math.random(0, this.gameObject.width - node.width);
        node.y = math.random(0, this.gameObject.height - node.height);
        
        // enable click
        node.interactive = true;
        
        // add script to control
        node.addScript('qc.demo.Drag');
    }
};
