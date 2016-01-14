/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 移动到目标点
 */
var AccelerateToPoint = qc.defineBehaviour('qc.demo.AccelerateToPoint', qc.Behaviour, function() {
    this.speed = 60;
    this.maxTime = 500;
}, {
    speed: qc.Serializer.NUMBER,
    maxTime: qc.Serializer.NUMBER
});

AccelerateToPoint.prototype.awake = function() {
    this.rigidbody = this.getScript('qc.arcade.RigidBody');
};

// 帧调度
AccelerateToPoint.prototype.update = function() {
    var self = this;
    self.gameObject.rotation = this.rigidbody.moveToObject(self.game.input.cursorPosition, self.speed,self.maxTime);
};
