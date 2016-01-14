var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    texture: qc.Serializer.TEXTURE
});

UI.prototype.awake = function() {
    //  Here we'll create a new Node
    var node = this.game.add.node();

    //  And add 10 images to it
    for (var i = 0; i < 10; i++)
    {
        var image = this.game.add.image(node);
        image.texture = this.texture;
        image.resetNativeSize();
        image.x = this.game.math.random(0, this.game.world.width);
        image.y = this.game.math.random(0, this.game.world.height);
    }

    //  Each images is now a member of your Node
};