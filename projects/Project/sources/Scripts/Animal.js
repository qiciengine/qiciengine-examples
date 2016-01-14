/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 动物信息
 */
var Animal = qc.defineBehaviour('qc.demo.Animal', qc.Behaviour, function() {
    var self = this;

    self.type = 0;
    self.index = 0;

    self.explode = null;
}, {
    // 需要序列化的字段
    icon: qc.Serializer.NODE,
    explode: qc.Serializer.NODE
});

// 设置动物的数据
Animal.prototype.setData = function(data) {
    var self = this;
    self.icon.frame = data.icon;
    self.type = data.type;
    self.index = data.index;
    self.name = '' + self.index;
};

/**
 * 播放消失爆炸的效果
 * @param cb
 */
Animal.prototype.disappear = function(cb) {
    var self = this;
    self.icon.visible = false;

    // 播放爆炸特效
    self.explode.visible = true;
    self.explode.onFinished.addOnce(function() {
        self.explode.visible = false;
        cb();
    });
    self.explode.playAnimation('explode');
};

/**
 * 从fromIndex往下掉落
 * @param icon
 * @param fromIndex
 */
Animal.prototype.drop = function(type, icon, fromIndex, cb) {
    var self = this;
    self.icon.frame = icon;
    self.type = type;
    self.icon.visible = true;
    var c = self.getScript('qc.TweenPosition');
    c.from = new qc.Point(((fromIndex + 64) % 8) * 76,
        self.game.math.floorTo(fromIndex / 8) * 72);
    c.to = new qc.Point(((self.index) % 8) * 76,
        self.game.math.floorTo(self.index / 8) * 72);
    c.duration = (c.to.y - c.from.y) / 72 * 0.13;
    c.resetToBeginning();
    c.onFinished.addOnce(function() {
        cb();
    });
    c.playForward();
}