/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var ClickProcess = qc.defineBehaviour('qc.demo.ClickProcess', qc.Behaviour, function() {
    this.btn = null;
}, {
    btn: qc.Serializer.NODE
});

ClickProcess.prototype.awake = function() {
    var self = this;
    if (!this.btn) return;
    this.addListener(this.btn.onClick, function() {
        var interactive = self.gameObject.interactive = !self.gameObject.interactive;
        self.gameObject.alpha = (interactive ? 1.0 : 0.3);
    });
};

ClickProcess.prototype.onClick = function() {
    alert(this.name + ' Click!');
};
