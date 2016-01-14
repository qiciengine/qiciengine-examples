/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var FixedTime = qc.defineBehaviour('qc.demo.FixedTime', qc.Behaviour, function() {
}, {
});

FixedTime.prototype.update = function() {
    this.gameObject.text = 'FixedTime: ' + this.game.time.fixedTime;
};
