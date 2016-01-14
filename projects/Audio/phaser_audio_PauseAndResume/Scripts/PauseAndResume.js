/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var PauseAndResume = qc.defineBehaviour('qc.demo.PauseAndResume', qc.Behaviour, function() {
    this.pauseBtn = null;
    this.resumeBtn = null;
}, {
    pauseBtn: qc.Serializer.NODE,
    resumeBtn: qc.Serializer.NODE
});

PauseAndResume.prototype.awake = function() {
    var self = this;
    this.addListener(self.pauseBtn.onNativeClick, function() {
        self.gameObject.pause();
    });
    this.addListener(self.resumeBtn.onNativeClick, function() {
        self.gameObject.resume();
    });
};