/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var s = qc.Serializer;

/**
 * 船长的普通攻击3
 */
var CaptainAttack3 = qc.defineBehaviour('qc.demo.CaptainAttack3', qc.Behaviour, function() {
    var self = this;

    // 攻击时播放的动作
    self.attackAni = 'atk3';

    // 精灵对象
    self.sprite = null;

    // 命中的特效
    self.hitEffect = null;

    // 从开始到命中的时间
    self.hitTime = 1.5;
    self._hitCountDown = 0;

    // 飞上去的距离，时间
    self.flyDistance = 200;
    self.flyDuration = 0.2;

    // 到落下的时间点
    self.dropTime = 0.3;

    // 音效
    self.audio = null;

    // 在编辑器模式下需要运行
    self.runInEditor = true;
}, {
    // 需要序列化的字段
    attackAni: s.STRING,
    sprite: s.NODE,
    hitTime: s.NUMBER,
    hitEffect: s.PREFAB,
    flyDistance: s.NUMBER,
    flyDuration: s.NUMBER,
    dropTime: s.NUMBER,
    audio: s.AUDIO
});
CaptainAttack3.__menu = 'Dota/船长/atk3';

// 初始时不可用
CaptainAttack3.prototype.awake = function() {
    this.enable = false;
}

// 帧调度，看是否命中了
CaptainAttack3.prototype.update = function() {
    var self = this;
    if (self.sprite.paused) return;
    self._hitCountDown -= self.game.time.deltaTime;
    if (self._hitCountDown <= 0 && !self.hadHit) {
        // 命中的处理
        self.onHit();
    }
}

// 开始对目标（可能多个）进行攻击
CaptainAttack3.prototype.play = function(targets, damage) {
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
CaptainAttack3.prototype.onHit = function() {
    var self = this;
    self.hadHit = true;
    self.enable = false;

    // 目标播放受创动作
    for (var i in self.targets) {
        var fighter = self.targets[i].getScript('qc.demo.Fighter');
        if (fighter.die) continue;
        fighter.receiveDamage(self.damage, self.hitEffect);

        // 目标飞起来
        self.fly(self.targets[i]);
    }
}

// 目标飞起来的动画
CaptainAttack3.prototype.fly = function(target) {
    var self = this;
    var tp = target.getScript('qc.TweenPosition');
    if (!tp) {
        tp = target.addScript('qc.TweenPosition');
    }
    tp.duration = self.flyDuration;
    tp.from = new qc.Point(target.x, target.y);
    tp.to = new qc.Point(target.x, target.y - self.flyDistance);
    tp.resetToBeginning();
    tp.playForward();
}
