/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var TweenDemo = qc.defineBehaviour('qc.demo.TweenDemo', qc.Behaviour, function() {
}, {
});

TweenDemo.prototype.onEnable = function() {
    var self = this;
    var tp = this.getScript('qc.TweenPosition');
    tp.resetToBeginning();
    tp.onFinished.addOnce(self.onTweenEnd, self);
    tp.playForward();
};

TweenDemo.prototype.onTweenEnd = function() {
    var self = this,
        tp = self.getScript('qc.TweenPosition');
    tp.playReverse();
    tp.onFinished.addOnce(function() {
        console.log('End.');
    });
};
