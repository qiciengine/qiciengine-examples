/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var DeltaTime = qc.defineBehaviour('qc.demo.DeltaTime', qc.Behaviour, function() {
}, {
});

DeltaTime.prototype.update = function() {
    this.gameObject.text = 'DeltaTime: ' + this.game.time.deltaTime;
};
