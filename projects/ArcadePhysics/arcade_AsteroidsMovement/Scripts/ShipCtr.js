/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 飞船的控制
 */
var ShipCtr = qc.defineBehaviour('qc.demo.ShipCtr', qc.Behaviour, function() {
    this.bulletRoot = null;
    this.bulletPrefab = null;
    this._fireTime = 0;
}, {
    bulletRoot: qc.Serializer.NODE,
    bulletPrefab: qc.Serializer.PREFAB
});

ShipCtr.prototype.update = function() {
    var self = this,
        rigidbody = this.getScript('qc.arcade.RigidBody');

    rigidbody.angularAcceleration = 0;
    if (self.game.input.isKeyDown(qc.Keyboard.UP)) {
        rigidbody.velocityFromRotation(self.gameObject.rotation, 200, rigidbody.acceleration);
    }
    else {
        rigidbody.acceleration.set(0, 0);
    }

    if (self.game.input.isKeyDown(qc.Keyboard.LEFT)) {
        rigidbody.angularVelocity = -300;
    }
    else if (self.game.input.isKeyDown(qc.Keyboard.RIGHT)) {
        rigidbody.angularVelocity = 300;
    }
    else {
        rigidbody.angularVelocity = 0;
    }

    if (self.game.input.isKeyDown(qc.Keyboard.SPACEBAR)) {
        self.fire();
    }
};

ShipCtr.prototype.fire = function() {
    var self = this,
        rigidbody = this.getScript('qc.arcade.RigidBody');
    if (self.game.time.now - self._fireTime < 50) return;
    self._fireTime = self.game.time.now;

    // 复制出一个子弹
    var bullet = self.game.add.clone(self.bulletPrefab, self.bulletRoot);
    bullet.x = self.gameObject.x;
    bullet.y = self.gameObject.y;
    bullet.rotation = self.gameObject.rotation;

    // 让子弹运动
    var tp = bullet.getScript('qc.TweenPosition');
    var distance = 3000;
    tp.from = new qc.Point(bullet.x, bullet.y);
    tp.to = new qc.Point(tp.from.x + distance * Math.cos(bullet.rotation), tp.from.y + distance * Math.sin(bullet.rotation));
    tp.resetToBeginning();
    tp.onFinished.addOnce(function() {
        bullet.destroy();
    });
    tp.playForward();
};
