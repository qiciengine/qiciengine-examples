var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
    texture: qc.Serializer.TEXTURE
});

UI.prototype.awake = function() {
    // create 100 images
    for (var i = 0; i < 100; i++) {
        var node = this.game.add.image(this.gameObject);
        node.texture = this.texture;
        node.resetNativeSize();
        node.x = this.game.math.random(0, this.gameObject.width);
        node.y = this.game.math.random(0, this.gameObject.height);
    }
    
    this.gameObject.setChildIndex(this.gameObject.find('clue'), this.gameObject.children.length - 1);
};

// Get minX minY maxX maxY
UI.prototype.getBounds = function() {
    var self = this, o = self.gameObject;
    var minX = -o.width/2 + o.parent.width;
    var minY = -o.height/2 + o.parent.height;
    var maxX = o.width/2;
    var maxY = o.height/2;
    
    return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
    };
};

UI.prototype.update = function() {
    var bound = this.getBounds();
    var input = this.game.input;
    
    if (input.isKeyDown(qc.Keyboard.LEFT)) {
        this.gameObject.x -= 4;
        if (this.gameObject.x < bound.minX) this.gameObject.x = bound.minX;
    }
    else if (input.isKeyDown(qc.Keyboard.RIGHT)) {
        this.gameObject.x += 4;
        if (this.gameObject.x > bound.maxX) this.gameObject.x = bound.maxX;
    }
    else if (input.isKeyDown(qc.Keyboard.UP)) {
        if (input.isShiftDown()) {
            this.gameObject.rotation += 0.05;
            return;
        }
        this.gameObject.y -= 4;
        if (this.gameObject.y < bound.minY) this.gameObject.y = bound.minY;
    }
    else if (input.isKeyDown(qc.Keyboard.DOWN)) {
        if (input.isShiftDown()) {
            this.gameObject.rotation -= 0.05;
            return;
        }
        this.gameObject.y += 4;
        if (this.gameObject.y > bound.maxY) this.gameObject.y = bound.maxY;
    }
};
