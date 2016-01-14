var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    clue: qc.Serializer.NODE
});

UI.prototype.onClick = function() {
    // change color
    this.gameObject.colorTint = new qc.Color(this.game.math.random(0, 0xffffff));
};