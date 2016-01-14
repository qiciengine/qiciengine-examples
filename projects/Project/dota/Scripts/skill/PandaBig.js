/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var s = qc.Serializer;

/**
 * 熊猫的大招
 */
var PandaBig = qc.defineBehaviour('qc.demo.PandaBig', qc.Behaviour, function() {
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

    // 后续3次命中的时间差
    self.doubleHit = [0.1, 0.1, 0.1];

    // 开始飞起的时间
    self.flyTime = 2;

    // 飞起的高度和时间
    self.flyDistance = 200;
    self.flyDuration = 0.5;
    self.hadHit = true;

    self.audio = null;

    // 在编辑器模式下需要运行
    self.runInEditor = true;
}, {
    // 需要序列化的字段
    attackAni: s.STRING,
    sprite: s.NODE,
    duration: s.NUMBER,
    hitTime: s.NUMBER,
    flyDistance: s.NUMBER,
    flyDuration: s.NUMBER,
    doubleHit: s.NUMBERS,
    flyTime: s.NUMBER,
    audio: s.AUDIO
});
PandaBig.__menu = 'Dota/熊猫/big';

// 初始时不可用
PandaBig.prototype.awake = function() {
    this.enable = false;
}

// 帧调度，看是否命中了
PandaBig.prototype.update = function() {
    var self = this;
    if (self.hadHit || !self.sprite || self.sprite.paused) return;
    self._hitCountDown -= self.game.time.deltaTime;
    if (self._hitCountDown <= 0) {
        // 命中的处理
        self.onHit();
    }
}

// 开始对目标（可能多个）进行攻击
PandaBig.prototype.play = function(targets, damage) {
    var self = this;
    var fighter = self.sprite.getScript('qc.demo.Fighter');
    damage = damage || 1000;

    // 只攻击1个人
    var target = null;
    for (var i in targets) {
        if (!targets[i].getScript('qc.demo.Fighter').die) {
            target = targets[i];
            break;
        }
    }
    if (!target) {
        console.error(targets);
        return;
    }

    // 记录数据
    self.targets = [target];
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

    // 被击中后需要飞起来
    self.game.timer.add(self.flyTime * 1000, function() {
        self.fly();
    });
};

// 命中的处理
PandaBig.prototype.onHit = function() {
    var self = this, target = self.targets[0];
    self.hadHit = true;
    self.enable = false;

    // 多次连击
    var index = -1;
    var f = function() {
        var fighter = target.getScript('qc.demo.Fighter');
        if (fighter.die) return;
        fighter.receiveDamage(self.damage, self.hitEffect);

        index++;
        if (index < self.doubleHit.length) {
            self.game.timer.add(self.doubleHit[index] * 1000, f);
        }
    };
    f();
}

// 目标飞起来
PandaBig.prototype.fly = function() {
    var self = this, target = self.targets[0];
    var tp = target.getScript('qc.TweenPosition');
    if (!tp) {
        tp = target.addScript('qc.TweenPosition');
    }

    if (!target.die) {
        target.playAnimation('damage');
    }
    tp.from = new qc.Point(target.x, target.y);
    tp.to = new qc.Point(tp.from.x, tp.from.y - self.flyDistance);
    tp.duration = self.flyDuration;
    tp.resetToBeginning();
    tp.playForward();
    if (!target.die) {
        tp.onFinished.addOnce(function() {
            // 回到idle状态
            target.getScript('qc.demo.Fighter').resumeIdle();
        });
    }
}
