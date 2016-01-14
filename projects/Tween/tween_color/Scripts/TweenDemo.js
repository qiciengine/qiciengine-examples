/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var TweenDemo = qc.defineBehaviour('qc.demo.TweenDemo', qc.Behaviour, function() {
    this.image2 = null;
}, {
    image2: qc.Serializer.NODE
});

TweenDemo.prototype.onEnable = function() {
    var self = this;
    var tc = this.getScript('qc.TweenColor');
    tc.resetToBeginning();
    tc.onFinished.addOnce(self.onTweenEnd, self);
    tc.playForward();
};

TweenDemo.prototype.onTweenEnd = function() {
    // Tween image2
    var tc = this.image2.addScript('qc.TweenColor');
    tc.from = qc.Color.black;
    tc.to = qc.Color.blue;
    tc.duration = 2;
    tc.resetToBeginning();
    tc.playForward();
};
