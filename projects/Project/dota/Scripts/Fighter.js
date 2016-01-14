/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var s = qc.Serializer;

/**
 * 战斗者的逻辑控制
 */
var Fighter = qc.defineBehaviour('qc.demo.Fighter', qc.Behaviour, function() {
    var self = this;

    // 是不是宠物
    self.isPet = true;

    // 血量、伤害值、攻击频率、大招冷却时间
    self.maxHp = 1000;
    self.hp = self.maxHp;
    self.minDamage = 0;
    self.maxDamage = 0;
    self.frequency = 3;
    self.freeze = 0;

    // 普通攻击的技能
    self.skills = [];

    // 使用的大招
    self.bigSkill = null;

    // 攻击顺序
    self.defensers = [];

    // 是否处于晕眩中
    self.stun = false;

    // 晕眩的特效
    self.stunEffect = null;

    // 下次出招的时间
    self.nextRound = Fighter.MAX_VALUE;

    // 下次出大招的时间点倒计时
    self.bigTime = Fighter.MAX_VALUE;

    // 飘血的预制
    self.flyDamage = null;

    // 移动的目标位置
    self.twoPos = [null, null];

    // 关联的头像节点
    self.icon = null;

    // 死亡的声音
    self.dieAudio = null;
}, {
    // 需要序列化的字段
    isPet: s.BOOLEAN,
    icon: s.NODE,
    maxHp: s.NUMBER,
    minDamage: s.NUMBER,
    maxDamage: s.NUMBER,
    frequency: s.NUMBER,
    freeze: s.NUMBER,
    bigSkill: s.NODE,
    defensers: s.NODES,
    stunEffect: s.PREFAB,
    skills: s.NODES,
    flyDamage: s.PREFAB,
    twoPos: s.NODES,
    dieAudio: s.AUDIO
});
Fighter.MAX_VALUE = 999999999999;

Object.defineProperties(Fighter.prototype, {
    /**
     * @property {number} damage - 普通伤害值
     * @readonly
     */
    damage: {
        get: function() {
            return this.game.math.random(this.minDamage, this.maxDamage);
        }
    },

    /**
     * @property {boolean} die - 是不是死亡了
     * @readonly
     */
    die: {
        get: function() { return this.hp <= 0; }
    }
});

// 初始化处理
Fighter.prototype.awake = function() {
    var self = this;
    var parent = self.gameObject.parent;

    // 记录我当前的位置
    self.oldX = parent.x;
    self.oldY = parent.y;

    // 记录目标的两个位置
    self._twoPos = [new qc.Point(self.twoPos[0].x, self.twoPos[0].y),
        new qc.Point(self.twoPos[1].x, self.twoPos[1].y)]

    // 初始隐藏掉
    parent.visible = false;
}

// 帧调度，自动出招
Fighter.prototype.update = function() {
    var self = this,
        o = self.gameObject;

    // 大招播放时不允许出招
    if (window.combatUI.ult || !window.combatUI._combating) return;

    // 对象不处于idle状态，不能出招
    if (self.die || o.paused || !o.isPlaying) return;

    // 处于晕眩状态
    if (self.stun) return;

    if (self.nextRound === Fighter.MAX_VALUE && self.isIdle()) {
        // 当前对象处于idle状态，需要重置下回合
        self.resetRound();
        return;
    }

    if (self.bigSkill) {
        self.bigTime -= self.game.time.deltaTime;
        if (!self.isPet && self.bigTime <= 0) {
            // 怪物出大招
            self.bigAttack();
            return;
        }
    }

    // 扣除倒计时，当对象处于idle状态时出招
    self.nextRound -= self.game.time.deltaTime;
    if (self.isIdle() && self.nextRound <= 0) {
        // 可以出招了
        self.nextRound = Fighter.MAX_VALUE;
        self.commonAttack();
    }
}

// 自动进行普通物理攻击
Fighter.prototype.commonAttack = function() {
    var self = this;

    // 使用的技能
    var index = self.game.math.random(0, self.skills.length - 1);
    var skill = self.skills[index];

    // 抽取攻击目标
    var target = null;
    for (var i in self.defensers) {
        var fighter = self.defensers[i].getScript('qc.demo.Fighter');
        if (fighter.die) continue;
        target = self.defensers[i];
        break;
    }
    if (!target) return;

    var damage = self.game.math.random(self.minDamage, self.maxDamage);
    skill.scripts[0].play([target], damage);
}

// 播放大招
Fighter.prototype.bigAttack = function() {
    var self = this;
    if (self.bigTime > 0) return;

    self.bigTime = (self.freeze + 2) * 1000;
    self.nextRound = Fighter.MAX_VALUE;

    // 如果对手都死亡了，别出招了
    var win = true;
    for (var i in self.defensers) {
        if (self.defensers[i].die) continue;
        win = false;
        break;
    }
    if (!win)
        self.bigSkill.scripts[0].play(self.defensers, 0);
}

// 出招结束，进入下一回合
Fighter.prototype.resetRound = function() {
    var self = this;

    // 记录下一次出招的时间
    self.nextRound = self.frequency * 1000;
}

// 重置处理
Fighter.prototype.reset = function() {
    var self = this;
    var parent = self.gameObject.parent;

    // 重置下血量
    self.hp = self.maxHp;

    // 消除状态
    self.stun = false;

    // 下次出招的时间点倒计时
    self.bigTime = Fighter.MAX_VALUE;
    self.nextRound = Fighter.MAX_VALUE;

    // 设置其位置
    parent.x = self.oldX;
    parent.y = self.oldY;
    parent.alpha = 1;

    // 令其出现
    var appear = self.gameObject.getScript('qc.demo.FighterAppear');
    if (appear) {
        appear.play();
    }
}

// 受创
Fighter.prototype.receiveDamage = function(damage, effect) {
    var self = this;
    var o = self.gameObject;
    if (self.die) return;
    self.hp -= damage;

    // 播放受创动作
    if (self.hp > 0) {
        if (self.isIdle()) {
            // 攻击过程中不播放受创动作
            o.playAnimation('damage');
            o.onFinished.addOnce(function() {
                self.resumeIdle();
            });
        }
    }
    else {
        // 死亡了
        o.playAnimation('death');
        o.onFinished.addOnce(function() {
            // 淡出消失
            var ta = o.parent.getScript('qc.TweenAlpha');
            ta.resetToBeginning();
            ta.playForward();
            ta.onFinished.addOnce(function() {
                o.parent.visible = false;

                // 通知有人死亡了
                window.combatUI.onDie(o);
            });
        });

        // 死亡声音
        if (self.dieAudio) {
            var sound = self.game.add.sound();
            sound.audio = self.dieAudio;
            sound.play();
        }
    }

    // 播放命中特效
    var e = null;
    if (effect) {
        e = self.game.add.clone(effect, o.parent);
        e.onFinished.addOnce(function() {
            e.destroy();
        });
    }

    // 播放飘血动画
    var fly = self.game.add.clone(self.flyDamage, o.parent);
    var damageFly = fly.getScript('qc.demo.DamageFly');
    damageFly.play(damage);

    // 返回特效，可能不同的技能需要进行移动等
    return e;
}

// 移动到目标位置
Fighter.prototype.moveTo = function(pos) {
    // 最多就前进2个位置
    var self = this;
    if (pos !== 1 && pos !== 2) return;

    // 移动过去
    var parent = self.gameObject.parent;
    var targetPos = self._twoPos[pos - 1];
    self.gameObject.playAnimation('move', 1, true);
    var tp = parent.getScript('qc.TweenPosition');
    tp.from = new qc.Point(parent.x, parent.y);
    tp.to = targetPos;
    tp.duration = 1.5;
    tp.onFinished.addOnce(function() {
        // 回到idle状态
        self.resumeIdle();
    });
    tp.resetToBeginning();
    tp.playForward();
}

// 回到idle状态
Fighter.prototype.resumeIdle = function() {
    this.gameObject.colorTint = new qc.Color(0xffffff);
    if (this.die) return;
    this.gameObject.playAnimation(this.gameObject.defaultAnimation, 1, true);
}

// 当前是否表示处于idle状态
Fighter.prototype.isIdle = function() {
    if (this.die) return false;
    return this.gameObject.lastAnimationName === this.gameObject.defaultAnimation;
}

// 赋予晕眩状态
Fighter.prototype.applyStun = function(duration) {
    var self = this;
    self.stun = true;

    // 播放特效
    var e = self.game.add.clone(self.stunEffect, self.gameObject.parent);
    self.game.timer.add((duration + 1) * 1000, function() {
        self.stun = false;
        e.destroy();
    });
}
