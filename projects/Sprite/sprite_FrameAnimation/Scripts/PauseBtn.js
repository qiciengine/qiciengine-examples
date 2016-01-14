/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var PauseBtn = qc.defineBehaviour('qc.demo.PauseBtn', qc.Behaviour, function() {
    this.sprite = null;
}, {
    sprite: qc.Serializer.NODE
});

PauseBtn.prototype.onClick = function() {
    this.sprite.paused = !this.sprite.paused;
};
