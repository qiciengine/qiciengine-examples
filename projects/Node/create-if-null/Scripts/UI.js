var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
    this.visibleCount = 0;
    this.hiddenCount = 5;
}, {
    texture: qc.Serializer.TEXTURE,
    clue: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    //  Add 5 images to it
    for (var i = 0; i < this.hiddenCount; i++)
    {
        var image = this.game.add.image(this.gameObject);
        image.texture = this.texture;
        image.frame = 0;
        image.resetNativeSize();
        image.x = this.game.math.random(0, this.game.world.width);
        image.y = this.game.math.random(0, this.game.world.height);
        
        // hide it
        image.visible = false;
    }
    
    // Set-up a timer
    this.timer = this.game.timer.loop(1000, this.resurrect, this);
};

UI.prototype.resurrect = function() {
    var children = this.gameObject.children;
    for (var i = 0; i < children.length; i++) {
        if (children[i].visible) continue;
        
        children[i].visible = true;
        children[i].frame = this.game.math.random(0, 36);
        this.visibleCount++;
        this.hiddenCount--;
        return;
    }
    
    // Create a new image
    var image = this.game.add.image(this.gameObject);
    image.texture = this.texture;
    image.frame = this.game.math.random(0, 36);
    image.resetNativeSize();
    image.x = this.game.math.random(0, this.game.world.width);
    image.y = this.game.math.random(0, this.game.world.height);
    this.visibleCount++;
    
    if (this.visibleCount >= 20) {
        this.game.timer.remove(this.timer);
    }
};

UI.prototype.update = function() {
    this.clue.text = 'Visible: ' + this.visibleCount + 
        '\nHidden: ' + this.hiddenCount;
};

