/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var Restart = qc.defineBehaviour('qc.demo.Restart', qc.Behaviour, function() {
    this.btn = null;
}, {
    btn: qc.Serializer.NODE
});

Restart.prototype.awake = function() {
    var self = this;
    this.addListener(self.btn.onClick, function() {
        self.gameObject.stop();
        self.gameObject.play();
    });
};