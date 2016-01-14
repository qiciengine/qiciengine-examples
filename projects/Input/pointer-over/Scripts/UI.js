var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
    var self = this, o = self.gameObject;
    this.addListener(this.gameObject.onEnter, function() {
        o.alpha = 1;
    });
    this.addListener(this.gameObject.onExit, function() {
        o.alpha = 0.5;
    });
};
