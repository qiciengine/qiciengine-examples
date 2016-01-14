var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
    this.mouses = {};
    this.touchs = {};
}, {
    texture: qc.Serializer.TEXTURE
});

UI.prototype.awake = function() {
    var self = this, input = self.game.input;
    
    this.addListener(input.onPointerDown, self.onPointerDown, self);
    this.addListener(input.onPointerUp, self.onPointerUp, self);
    this.addListener(input.onPointerMove, self.onPointerMove, self);
};

UI.prototype.onPointerDown = function(id, x, y) {
    var self = this,
        input = self.game.input;
    
    // create a UIImage at point (x, y)
    var node = self.game.add.image(self.gameObject);
    node.pivotX = 0.5;
    node.pivotY = 0.5;
    node.texture = self.texture;
    node.x = x;
    node.y = y;
    node.resetNativeSize();
    
    var pointer = input.getPointer(id);
    if (pointer.isMouse) {
        self.mouses[id] = node;
    }
    else {
        self.touchs[id] = node;
    }
};

UI.prototype.onPointerUp = function(id, x, y) {
    var self = this,
        input = self.game.input;
    
    // destroy the UIImage
    var pointer = input.getPointer(id);
    if (pointer.isMouse) {
        self.mouses[id].destroy();
        delete self.mouses[id];
    }
    else {
        self.touchs[id].destroy();
        delete self.touchs[id];
    }
};

UI.prototype.onPointerMove = function(id, x, y) {
    var self = this,
        input = self.game.input;
    
    // move the UIImage
    var node;
    var pointer = input.getPointer(id);
    if (pointer.isMouse) {
        node = self.mouses[id];
    }
    else {
        node = self.touchs[id];
    }
    node.x = x;
    node.y = y;
};
