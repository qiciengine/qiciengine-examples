/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 粒子跟随精灵运动
 */
var FireStarter = qc.defineBehaviour('qc.demo.FireStarter', qc.Behaviour, function() {
    this.emitter = null;
}, {
    // 需要序列化的字段
    emitter: qc.Serializer.NODE
});

// 初始化处理
FireStarter.prototype.awake = function() {
    // 记录粒子发射器与精灵的相对位置
    var self = this;
    self._offset = new qc.Point(self.gameObject.x - self.emitter.x, self.gameObject.y - self.emitter.y);
};

// 帧调度
FireStarter.prototype.update = function() {
    var self = this;

    // 计算粒子的运动速度
    var rigid = self.getScript('qc.arcade.RigidBody');
    var px = rigid.velocity.x;
    var py = rigid.velocity.y;
    px *= -1;
    py *= -1;
    self.emitter.minParticleSpeed.set(px, py);
    self.emitter.maxParticleSpeed.set(px, py);

    // 保持相对位置不变
    self.emitter.x = self.gameObject.x - self._offset.x;
    self.emitter.y = self.gameObject.y - self._offset.y;
};
