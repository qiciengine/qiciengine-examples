/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var BodyScale = qc.defineBehaviour('qc.demo.BodyScale', qc.Behaviour, function() {
}, {
});

BodyScale.prototype.update = function() {
    var rigidBody = this.getScript('qc.arcade.RigidBody');
    rigidBody.velocity.x = -200;
};
