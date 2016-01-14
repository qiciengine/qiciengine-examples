/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var BounceKnock = qc.defineBehaviour('qc.demo.BounceKnock', qc.Behaviour, function() {
}, {
});

BounceKnock.prototype.update = function() {
    var self = this,
        rigidBody = self.getScript('qc.arcade.RigidBody');

    if (self.game.input.isKeyDown(qc.Keyboard.UP)) {
        rigidBody.velocity.y = -300;
    }
    else if (self.game.input.isKeyDown(qc.Keyboard.DOWN)) {
        rigidBody.velocity.y = 300;
    }
    else if (self.game.input.isKeyDown(qc.Keyboard.LEFT)) {
        rigidBody.velocity.x = -300;
    }
    else if (self.game.input.isKeyDown(qc.Keyboard.RIGHT)) {
        rigidBody.velocity.x = 300;
    }
    else {
        rigidBody.velocity.setTo(0, 0);
    }
};
