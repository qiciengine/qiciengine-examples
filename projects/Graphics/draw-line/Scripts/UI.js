var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
    this.runInEditor = true;
}, {
});

UI.prototype.awake = function() {
    var graphics = this.gameObject;
    graphics.beginFill(0xFF3300);
    graphics.lineStyle(10, 0xffd900, 1);
    graphics.lineTo(250, 50);
    graphics.lineTo(100, 100);
    graphics.lineTo(250, 220);
    graphics.lineTo(50, 220);
    graphics.lineTo(50, 50);
    graphics.endFill();
};