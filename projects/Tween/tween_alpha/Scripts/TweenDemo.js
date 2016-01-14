/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var TweenDemo = qc.defineBehaviour('qc.demo.TweenDemo', qc.Behaviour, function() {
    this.counter = 0;
}, {
});

TweenDemo.prototype.onEnable = function() {
    var self = this;
    var ta = this.getScript('qc.TweenAlpha');
    ta.resetToBeginning();
    this.addListener(ta.onLoopFinished, self.onTweenEnd, self);
    ta.playForward();
};

TweenDemo.prototype.onClick = function() {
    // Stop tween.
    var ta = this.getScript('qc.TweenAlpha');
    ta.stop();
};

TweenDemo.prototype.onTweenEnd = function() {
    this.counter++;
    console.log('counter', this.counter);
};
