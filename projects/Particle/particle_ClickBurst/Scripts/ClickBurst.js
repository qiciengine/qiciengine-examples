/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 点击爆炸的粒子效果
 */
var ClickBurst = qc.defineBehaviour('qc.demo.ClickBurst', qc.Behaviour, function() {
    this.emitter = null;
}, {
    // 需要序列化的字段
    emitter: qc.Serializer.NODE
});

// 初始化处理
ClickBurst.prototype.onClick = function(e) {
    var self = this;
    if (!self.emitter) return;

    self.emitter.x = e.source.x;
    self.emitter.y = e.source.y;
    self.emitter.explode(self.emitter.lifespan, 10);
};
