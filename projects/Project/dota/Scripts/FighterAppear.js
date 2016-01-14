/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var s = qc.Serializer;

/**
 * 战斗者出现的动画表现
 */
var FighterAppear = qc.defineBehaviour('qc.demo.FighterAppear', qc.Behaviour, function() {
    var self = this;

    // 走动的动作名称
    self.moveAni = 'move';

    // 偏移量，需要加上屏幕的宽度
    self.offset = 20;

    // 在编辑器模式下需要运行
    self.runInEditor = true;
}, {
    // 需要序列化的字段
    moveAni: s.STRING,
    offset: s.NUMBER
});

// 播放动作
FighterAppear.prototype.play = function() {
    var self = this, o = self.gameObject;
    var fighter = o.getScript('qc.demo.Fighter');
    o.parent.visible = true;
    o.alpha = 1;

    var tp = o.parent.getScript('qc.TweenPosition');
    tp.to.x = o.parent.x;
    tp.to.y = o.parent.y;
    tp.from.y = tp.to.y;
    if (fighter.isPet)
        tp.from.x = tp.to.x - self.game.world.width / 2 - self.offset;
    else
        tp.from.x = tp.to.x + self.game.world.width / 2 + self.offset;
    tp.resetToBeginning();
    tp.playForward();
    o.playAnimation(self.moveAni, 1, true);
    tp.onFinished.addOnce(function() {
        // 动作播放完毕，播放idle动作
        fighter.resumeIdle();

        // 可以出招了
        fighter.nextRound = 0;
        fighter.bigTime = fighter.freeze * 1000;
    });
}
