/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var s = qc.Serializer;

/**
 * 飘血的动画表现
 */
var DamageFly = qc.defineBehaviour('qc.demo.DamageFly', qc.Behaviour, function() {
    var self = this;

    // 在编辑器模式下需要运行
    self.runInEditor = true;
}, {
    // 需要序列化的字段
});

// 创建出来就开始播放动作
DamageFly.prototype.play = function(damage) {
    var self = this, o = self.gameObject;
    o.text = '-' + damage;
    o.scaleDirtyInterval = 0;

    // 设定初生点位置
    var tp = o.getScript('qc.TweenPosition');
    tp.from.x = o.x + self.game.math.random(-30, 30);
    tp.from.y = o.y - self.game.math.random(-10, 10);
    tp.to.x = tp.from.x;
    tp.to.y = tp.from.y - 80;
    o.x = tp.from.x;
    o.y = tp.from.y;

    // 放大
    var ts = o.getScript('qc.TweenScale'),
        ta = o.getScript('qc.TweenAlpha');

    // 往上移动并淡出
    ts.onFinished.addOnce(function() {
        tp.resetToBeginning();
        tp.playForward();

        ta.from = 1;
        ta.to = 0;
        ta.onFinished.addOnce(function() {
            o.destroy();
        });
        ta.resetToBeginning();
        ta.playForward();
    });
    ts.resetToBeginning();
    ts.playForward();
};
