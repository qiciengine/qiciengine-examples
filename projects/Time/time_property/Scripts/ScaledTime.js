/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var ScaledTime = qc.defineBehaviour('qc.demo.ScaledTime', qc.Behaviour, function() {
}, {
});

ScaledTime.prototype.update = function() {
    this.gameObject.text = 'ScaledTime: ' + this.game.time.scaledTime;
};
