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
    tp.resetGroupToBeginning();
    tp.playGroupForward();
};