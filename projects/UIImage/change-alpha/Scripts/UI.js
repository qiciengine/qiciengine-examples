var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    clue: qc.Serializer.NODE
});

UI.prototype.onClick = function() {
    // change alpha
    this.gameObject.alpha = Math.random();
};