/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var s = qc.Serializer;

/**
 * 默认的普通攻击
 */
var CommonAttack = qc.defineBehaviour('qc.demo.CommonAttack', qc.Behaviour, function() {
    var self = this;

    // 攻击时播放的动作
    self.attackAni = 'atk';

    // 精灵对象
    self.sprite = null;

    // 命中的特效
    self.hitEffect = null;

    // 从攻击者飞到受创者的光效
    self.flyEffect = null;
    self.flyEffectTime = 1;

    // 从开始到命中的时间
    self.hitTime = 1.5;
    self._hitCountDown = 0;
    self.hadHit = true;

    // 声音
    self.audio = null;

    // 在编辑器模式下需要运行
    self.runInEditor = true;
}, {
    // 需要序列化的字段
    attackAni: s.STRING,
    sprite: s.NODE,
    hitTime: s.NUMBER,
    hitEffect: s.PREFAB,
    flyEffect: s.PREFAB,
    flyEffectTime: s.NUMBER,
    audio: s.AUDIO
});
CommonAttack.__menu = 'Dota/普通攻击';

// 初始时不可用
CommonAttack.prototype.awake = function() {
    this.enable = false;
}

// 帧调度，看是否命中了
CommonAttack.prototype.update = function() {
    var self = this;
    if (self.hadHit || !self.sprite || self.sprite.paused) return;
    self._hitCountDown -= self.game.time.deltaTime;
    if (self._hitCountDown <= 0) {
        // 命中的处理
        self.onHit();
    }
}

// 开始对目标（可能多个）进行攻击
CommonAttack.prototype.play = function(targets, damage) {
    var self = this;
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

    // 延迟播放特效飞出去的特效
    if (self.flyEffect) {
        self.game.timer.add(self.flyEffectTime * 1000, function() {
            for (var i in targets) {
                var e = self.game.add.clone(self.flyEffect, self.sprite.parent);
                var ef = e.getScript('qc.demo.EffectFly');
                ef.play(self.sprite, targets[i]);
            }
        });
    }

    // 播放声音
    if (self.audio) {
        var sound = self.game.add.sound();
        sound.audio = self.audio;
        sound.play();
    }

    // 计算命中的倒计时
    self._hitCountDown = self.hitTime * 1000;
};

// 命中的处理
CommonAttack.prototype.onHit = function() {
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
