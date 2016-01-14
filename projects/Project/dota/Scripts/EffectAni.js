/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var s = qc.Serializer;

/**
 * 特效的动作
 */
var EffectAni = qc.defineBehaviour('qc.demo.EffectAni', qc.Behaviour, function() {
    var self = this;

    // 动作类型
    // moveFromOut - 从屏幕外移动进来到目标点
    self.type = 'moveFromOut';

    // 目标点
    self.to = new qc.Point(0, 0);

    self.runInEditor = true;
}, {
    // 需要序列化的字段
    type: s.STRING,
    to: s.POINT
});

// 启动处理
EffectAni.prototype.awake = function() {
    var self = this, o = self.gameObject;
    switch (self.type) {
    case 'moveFromOut':
        var tp = o.getScript('qc.TweenPosition');
        tp.to = self.to;
        tp.from.x = tp.to.x - self.game.world.width / 2;
        tp.from.y = self.to.y;
        tp.resetToBeginning();
        tp.playForward();
        break;
    }
}
