/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 物理的控制
 */
var BodyEnable = qc.defineBehaviour('qc.demo.BodyEnable', qc.Behaviour, function() {
}, {
});

BodyEnable.prototype.onClick = function() {
    var rigidBody = this.getScript('qc.arcade.RigidBody');
    rigidBody.enable = !rigidBody.enable;
};
