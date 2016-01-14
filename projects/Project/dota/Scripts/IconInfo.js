/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var s = qc.Serializer;

/**
 * 头像信息
 */
var IconInfo = qc.defineBehaviour('qc.demo.IconInfo', qc.Behaviour, function() {
    var self = this;

    // 对应的宠物等信息
    self.pet = null;
    self.hp = null;
    self.mp = null;
    self.effect = null;
    self.mask = null;
    self.clickEffect = null;
}, {
    // 需要序列化的字段
    pet: s.NODE,
    hp: s.NODE,
    mp: s.NODE,
    effect: s.NODE,
    mask: s.NODE,
    clickEffect: s.PREFAB
});

// 初始化处理
IconInfo.prototype.awake = function() {
    var self = this;

    // 未播放过激活动画
    self.activePlay = false;
    self.redraw();
};

// 头像被点击的处理：释放大招
IconInfo.prototype.onClick = function() {
    var self = this;
    var pet = self.pet.getScript('qc.demo.Fighter');
    if (pet.die || pet.bigTime > 0 || pet.stun) return;
    if (window.combatUI.ult) return;
    if (window.combatUI.win || window.combatUI.lose) return;

    // 播放大招
    pet.bigAttack();

    // 未播放过激活动画
    self.activePlay = false;

    // 播放点击特效
    var e = self.game.add.clone(self.clickEffect, self.gameObject);
    e.onFinished.addOnce(function() {
        e.destroy();
    });
};

// 帧调度
IconInfo.prototype.update = function() {
    // 重绘值界面
    this.redraw();
};

// 绘制界面
IconInfo.prototype.redraw = function() {
    var self = this;
    var pet = self.pet.getScript('qc.demo.Fighter');
    if (!window.combatUI._combating) {
        self.effect.visible = false;
        return;
    }

    // HP的值
    self.hp.value = pet.hp / pet.maxHp;

    // MP的值
    self.mp.value = 1 - Math.min(pet.bigTime / (pet.freeze * 1000), 1);
    //self.mask.value = 1 - Math.min(pet.bigTime / (pet.freeze * 1000), 1);

    // 是不是死亡了
    if (pet.die) {
        self.effect.visible = false;
        return;
    }

    // 如果大招刚激活，需要播放激活动画
    if (pet.bigTime <= 0 && !pet.die) {
        self.effect.visible = true;
        if (!self.activePlay) {
            self.activePlay = true;
            self.effect.playAnimation('start');
            self.effect.onFinished.addOnce(function() {
                self.effect.playAnimation('start1', 1, true);
            });
        }
    }
    else {
        self.effect.visible = false;
    }
};
