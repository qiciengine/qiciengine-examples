var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
    bubble: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    this.addListener(this.game.input.onPointerDown, this.onPointerDown, this);
    this.addListener(this.game.input.onPointerUp, this.onPointerUp, this);
};

UI.prototype.onPointerDown = function(id, x, y) {
    this.bubble.alpha = 0.3;
};

UI.prototype.onPointerUp = function(id, x, y) {
    this.bubble.alpha = 1;
};
