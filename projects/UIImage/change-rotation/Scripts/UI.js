var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.update = function() {
    this.gameObject.rotation += 0.01;
};