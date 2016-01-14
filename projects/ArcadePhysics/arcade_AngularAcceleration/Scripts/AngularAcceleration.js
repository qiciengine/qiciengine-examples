/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 角加速度示例
 */
var AngularAcceleration = qc.defineBehaviour('qc.demo.AngularAcceleration', qc.Behaviour, function() {
    this.speed = 200;
}, {
    speed: qc.Serializer.NUMBER
});

AngularAcceleration.prototype.update = function() {
    var self = this,
        rigidbody = this.getScript('qc.arcade.RigidBody');

    rigidbody.angularAcceleration = 0;
    if (self.game.input.isKeyDown(qc.Keyboard.LEFT)) {
        rigidbody.angularAcceleration -= self.speed;
    }
    else if (self.game.input.isKeyDown(qc.Keyboard.RIGHT)) {
        rigidbody.angularAcceleration += self.speed;
    }
};
