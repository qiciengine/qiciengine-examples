var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    texture: qc.Serializer.TEXTURE
});

UI.prototype.awake = function() {
    // create a Node
    var node = this.game.add.node();
    node.name = 'enemies';
    node.parent.setChildIndex(node, 0);
    
    for (var i = 0; i < 16; i++)
    {
        //  This creates a new Sprite instance within the node
        //  It will be randomly placed within the world and use the 'baddie' image to display
        var o = this.game.add.sprite(node);
        o.x = 360 + Math.random() * 200;
        o.y = 120 + Math.random() * 200;
        o.texture = this.texture;
        o.resetNativeSize();
    }
};
