var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    atari1: qc.Serializer.TEXTURE,
    sonic: qc.Serializer.TEXTURE,
    snot: qc.Serializer.TEXTURE
});

UI.prototype.awake = function() {
    // Create a Node that will sit above the background image
    var node1 = this.node1 = this.game.add.node();
    node1.name = 'node1';
    
    // Create a Node that will sit above Node 1
    var node2 = this.node2 = this.game.add.node();
    node2.name = 'node2';
    
    // Now let's create some random sprites and enable 'bring to top'
    var math = this.game.math;
    for (var i = 0; i < 10; i++) {
        var sprite = this.game.add.sprite(node1);
        sprite.name = 'atari' + i;
        sprite.x = math.random(0, this.gameObject.width);
        sprite.y = math.random(0, this.gameObject.height);
        sprite.texture = this.atari1;
        sprite.resetNativeSize();
        
        // Sonics
        sprite = this.game.add.sprite(node2);
        sprite.name = 'sonic' + i;
        sprite.x = math.random(0, this.gameObject.width);
        sprite.y = math.random(0, this.gameObject.height);
        sprite.texture = this.sonic;
        sprite.resetNativeSize();
    }
    
    //  Create a foreground image - everything should appear behind this
    var snot = this.game.add.sprite();
    snot.pivotX = 0.5;
    snot.pivotY = 1;
    snot.x = this.gameObject.width/2;
    snot.y = this.gameObject.height;
    snot.texture = this.snot;
    snot.resetNativeSize();
};

UI.prototype.update = function() {
    var input = this.game.input;
    if (input.isKeyDown(qc.Keyboard.ONE)) {
        var parent = this.node1.parent;
        parent.setChildIndex(this.node1, parent.children.length - 1);
    }
    else if (input.isKeyDown(qc.Keyboard.TWO)) {
        var parent = this.node2.parent;
        parent.setChildIndex(this.node2, parent.children.length - 1);
    }
};

