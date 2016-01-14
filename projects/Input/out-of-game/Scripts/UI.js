var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
    bubble: qc.Serializer.NODE,
    cursor: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    this.addListener(this.game.input.onPointerMove, this.onPointerMove, this);
};

UI.prototype.onPointerMove = function(id, x, y) {
    var pointer = this.game.input.getPointer(id);
    if (!pointer || !pointer.withinGame) {
        // Out of game
        this.bubble.alpha = 0.5;
        return;
    }  
    
    this.cursor.x = x;
    this.cursor.y = y;
    this.bubble.alpha = 1;
};
