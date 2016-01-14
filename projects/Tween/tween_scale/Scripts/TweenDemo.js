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
    var ts = this.getScript('qc.TweenScale');
    ts.resetToBeginning();
    ts.onFinished.addOnce(function() {
        console.log('End');
    });
    this.addListener(ts.onStart, function() {
        console.log('Start');
    });
    ts.playForward();
};

TweenDemo.prototype.onClick = function() {
    var ts = this.getScript('qc.TweenScale');
    if (ts.enable)
        ts.stop();
    else {
        ts.resetToBeginning();
        ts.playForward();
    }
};
