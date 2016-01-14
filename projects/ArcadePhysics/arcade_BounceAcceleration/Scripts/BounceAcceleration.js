/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var BounceAcceleration = qc.defineBehaviour('qc.demo.BounceAcceleration', qc.Behaviour, function() {
}, {
});

BounceAcceleration.prototype.update = function() {
    var self = this,
        rigidBody = self.getScript('qc.arcade.RigidBody');

    if (self.game.input.isKeyDown(qc.Keyboard.UP)) {
        rigidBody.acceleration.y = -600;
        self.gameObject.playAnimation('move');
    }
    else if (self.game.input.isKeyDown(qc.Keyboard.DOWN)) {
        rigidBody.acceleration.y = 600;
        self.gameObject.playAnimation('move');
    }
    else if (self.game.input.isKeyDown(qc.Keyboard.LEFT)) {
        rigidBody.acceleration.x = -500;
        self.gameObject.playAnimation('move');
    }
    else if (self.game.input.isKeyDown(qc.Keyboard.RIGHT)) {
        rigidBody.acceleration.x = 500;
        self.gameObject.playAnimation('move');
    }
    else {
        self.gameObject.playAnimation('idle');
        rigidBody.acceleration.setTo(0, 0);
    }

    self.gameObject.scaleX = rigidBody.velocity.x > 0 ? 1 : -1;
};
