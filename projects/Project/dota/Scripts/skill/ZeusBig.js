/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var s = qc.Serializer;

/**
 * 宙斯的大招
 */
var ZeusBig = qc.defineBehaviour('qc.demo.ZeusBig', qc.Behaviour, function() {
    var self = this;

    // 攻击时播放的动作
    self.attackAni = 'ult';

    // 精灵对象
    self.sprite = null;

    // 大招的凸显时间
    self.duration = 0.8;

    // 从开始到命中的时间
    self.hitTime = 1.5;
    self._hitCountDown = 0;

    // 命中特效
    self.hitEffect = null;

    self.audio = null;

    // 在编辑器模式下需要运行
    self.runInEditor = true;
}, {
    // 需要序列化的字段
    attackAni: s.STRING,
    sprite: s.NODE,
    effect: s.PREFAB,
    duration: s.NUMBER,
    hitTime: s.NUMBER,
    hitEffect: s.PREFAB,
    audio: s.AUDIO
});
ZeusBig.__menu = 'Dota/宙斯/big';

// 初始时不可用
ZeusBig.prototype.awake = function() {
    this.enable = false;
}

// 帧调度，看是否命中了
ZeusBig.prototype.update = function() {
    var self = this;
    if (self.hadHit || !self.sprite || self.sprite.paused) return;
    self._hitCountDown -= self.game.time.deltaTime;
    if (self._hitCountDown <= 0) {
        // 命中的处理
        self.onHit();
    }
}

// 开始对目标（可能多个）进行攻击
ZeusBig.prototype.play = function(targets, damage) {
    var self = this;
    var fighter = self.sprite.getScript('qc.demo.Fighter');
    damage = damage || 1200;

    // 记录数据
    self.targets = targets;
    self.damage = damage;

    // 播放攻击动作
    self.enable = true;
    self.hadHit = false;
    self.sprite.playAnimation(self.attackAni);
    self.sprite.onFinished.addOnce(function() {
        // 攻击完毕，切换回默认动作
        self.sprite.getScript('qc.demo.Fighter').resumeIdle();
        self.sprite.getScript('qc.demo.Fighter').resetRound();
    });

    // 战场和其他参展者全部暂停动作一段时间
    window.combatUI.enableUlt(self.sprite, true);
    self.game.timer.add(self.duration * 1000, function() {
        window.combatUI.enableUlt(self.sprite, false);
    });

    // 播放音效
    if (self.audio) {
        var sound = self.game.add.sound();
        sound.audio = self.audio;
        sound.play();
    }

    // 计算命中的倒计时
    self._hitCountDown = self.hitTime * 1000;
};

// 命中的处理
ZeusBig.prototype.onHit = function() {
    var self = this;
    self.hadHit = true;
    self.enable = false;

    // 目标播放受创动作
    for (var i in self.targets) {
        var fighter = self.targets[i].getScript('qc.demo.Fighter');
        if (fighter.die) continue;
        fighter.receiveDamage(self.damage, self.hitEffect);
    }
}
