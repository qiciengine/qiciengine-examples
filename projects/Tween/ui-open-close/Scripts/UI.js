/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
    openBtn: qc.Serializer.NODE,
    closeBtn: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    this.addListener(self.openBtn.onClick, self.open, self);
    this.addListener(self.closeBtn.onClick, self.close, self);
};

UI.prototype.open = function() {
    var ts = this.getScript('qc.TweenScale');
    var self = this,
        o = self.gameObject;
    
    o.visible = true;
    o.alpha = 1;
    ts.resetToBeginning();
    ts.playForward();
};

UI.prototype.close = function() {
    var ta = this.getScript('qc.TweenAlpha');
    var self = this,
        o = self.gameObject;
    
    ta.resetToBeginning();
    ta.onFinished.addOnce(function() {
        o.visible = false;
    });
    ta.playForward();
};