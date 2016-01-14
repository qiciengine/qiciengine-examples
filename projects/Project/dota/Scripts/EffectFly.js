/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var s = qc.Serializer;

/**
 * 特效从攻击者飞到受创者的控制
 */
var EffectFly = qc.defineBehaviour('qc.demo.EffectFly', qc.Behaviour, function() {
    // 目标位置的偏移量
    this.offset = new qc.Point(0, 0);

    // 飞行方向（向左还是向右）
    this.left = true;
}, {
    // 需要序列化的字段
    offset: s.POINT,
    left: s.BOOLEAN
});

// 开始播放
EffectFly.prototype.play = function(attacker, defenser) {
    var self = this;
    var o1 = attacker.parent, o2 = defenser.parent;
    var tp = self.gameObject.getScript('qc.TweenPosition');
    tp.from = new qc.Point(self.gameObject.x, self.gameObject.y);
    if (self.left) {
        tp.to = new qc.Point(tp.from.x + (o2.x - o1.x) + self.offset.x,
            tp.from.y + (o2.y - o1.y) + self.offset.y);
    }
    else {
        tp.to = new qc.Point(tp.from.x - (o2.x - o1.x) - self.offset.x,
            tp.from.y + (o2.y - o1.y) + self.offset.y);
    }
    tp.playForward();
    tp.onFinished.addOnce(function() {
        self.gameObject.destroy();
    });
}
