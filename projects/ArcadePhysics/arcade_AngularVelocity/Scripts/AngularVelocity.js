/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 角速度示例
 */
var AngularVelocity = qc.defineBehaviour('qc.demo.AngularVelocity', qc.Behaviour, function() {
    this.speed = 200;
}, {
    speed: qc.Serializer.NUMBER
});

AngularVelocity.prototype.update = function() {
    var self = this,
        rigidbody = this.getScript('qc.arcade.RigidBody');

    rigidbody.angularAcceleration = 0;
    if (self.game.input.isKeyDown(qc.Keyboard.LEFT)) {
        rigidbody.angularVelocity -= self.speed;
    }
    else if (self.game.input.isKeyDown(qc.Keyboard.RIGHT)) {
        rigidbody.angularVelocity += self.speed;
    }
};
