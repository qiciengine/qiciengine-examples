var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.onClick = function() {
    var math = this.game.math;
    this.gameObject.scaleX = math.random(3, 30)/10;
    this.gameObject.scaleY = math.random(3, 30)/10;
};