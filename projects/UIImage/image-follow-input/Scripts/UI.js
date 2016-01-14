var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
    this.addListener(this.game.input.onPointerMove, this.onPointerMove, this);
};

UI.prototype.onPointerMove = function(id, x, y) {
    this.gameObject.x = x;
    this.gameObject.y = y;
};
