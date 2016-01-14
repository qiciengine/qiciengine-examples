/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var s = qc.Serializer;

/**
 * 负责战斗的控制
 */
var CombatUI = qc.defineBehaviour('qc.demo.CombatUI', qc.Behaviour, function() {
    var self = this;

    // 开始战斗
    self.startBtn = null;

    // 战斗的时间
    self.duration = 0;

    // 5个宠物
    self.pets = [];

    // 5个怪物
    self.monsters = [];

    // 是不是正在播大招？
    self.ult = false;

    // 当前是否战斗中
    self._combating = false;

    // 遮罩的混合色
    self.maskColor = new qc.Color(0xcccccc);

    // 大招预备的特效
    self.prepareEffect = null;

    // 我方和敌人当前的位置，每次前进1格就加1
    self.myPos = 0;
    self.oppPos = 0;

    // 登记本界面
    window.combatUI = self;
}, {
    // 需要序列化的字段
    startBtn: s.NODE,
    duration: s.NUMBER,
    pets: s.NODES,
    monsters: s.NODES,
    ult: s.BOOLEAN,
    maskColor: s.COLOR,
    prepareEffect: s.PREFAB,
    mask: s.NODE
});

Object.defineProperties(CombatUI.prototype, {
    /**
     * property {boolean} win - 战斗是不是胜利了
     */
    win: {
        get: function() {
            for (var i in this.monsters) {
                var fighter = this.monsters[i].getScript('qc.demo.Fighter');
                if (!fighter.die) return false;
            }
            return true;
        }
    },

    /**
     * property {boolean} lose - 战斗是不是失败了
     */
    lose: {
        get: function() {
            for (var i in this.pets) {
                var fighter = this.pets[i].getScript('qc.demo.Fighter');
                if (!fighter.die) return false;
            }
            return true;
        }
    }
});

// 初始化处理
CombatUI.prototype.awake = function() {
    var self = this;

    // 开始战斗按钮被点击了，战斗开始
    this.addListener(self.startBtn.onClick, function() {
        if (!self._combating) {
            // 开启战斗
            self.startCombat();
            self.startBtn.getScript('qc.TweenScale').stop(); 
            self.startBtn.getScript('qc.TweenScale').reset();
        }
    });
};

// 开始战斗的处理
CombatUI.prototype.startCombat = function() {
    var self = this;
    self._combating = true;
    self.duration = 0;
    self.myPos = 0;
    self.oppPos = 0;

    // 所有怪物回到出生点，然后向中间集结
    // 血量等回满、状态清除等
    for (var i in self.pets) {
        var fighter = self.pets[i].getScript('qc.demo.Fighter');
        if (fighter) fighter.reset();
    }
    for (var i in self.monsters) {
        var fighter = self.monsters[i].getScript('qc.demo.Fighter');
        if (fighter) fighter.reset();
    }
}

// 开始/停止播放大招
CombatUI.prototype.enableUlt = function(fighter, enable) {
    var self = this;
    enable = enable === undefined ? true : enable;
    var color = !enable ? qc.Color.white : self.maskColor;

    // 背景变色
    self.mask.visible = enable;

    // 模型变大或还原
    fighter.scaleX = enable ? 1.3 : 1;
    fighter.scaleY = enable ? 1.3 : 1;

    // 其他怪物或宠物变色
    for (var i in self.pets) {
        var o = self.pets[i];
        if (o === fighter) continue;
        o.colorTint = color;
        o.paused = enable;
    }
    for (var i in self.monsters) {
        var o = self.monsters[i];
        if (o === fighter) continue;
        o.colorTint = color;
        o.paused = enable;
    }

    // 准备动作的光效
    if (enable && self.prepareEffect) {
        var e = self.game.add.clone(self.prepareEffect, fighter.parent);
        e.onFinished.addOnce(function() {
            e.destroy();
        });
    }
}

// 目标死亡了，是否需要往前移动
CombatUI.prototype.onDie = function(target) {
    // 看战斗是不是结束了
    var self = this;
    if (self.win || self.lose) {
        self._combating = false;
        return;
    }

    // 重新计算下我方和地方的最新位置
    var mPos = 0, oPos = 0;
    for (var i = 0; i < self.pets.length; i += 2) {
        if (!self.pets[i].getScript('qc.demo.Fighter').die) break;
        if (i + 1 >= self.pets.length) break;
        if (!self.pets[i + 1].getScript('qc.demo.Fighter').die) break;
        oPos++;
    }
    for (var i = 0; i < self.monsters.length; i += 2) {
        if (!self.monsters[i].getScript('qc.demo.Fighter').die) break;
        if (i + 1 >= self.monsters.length) break;
        if (!self.monsters[i + 1].getScript('qc.demo.Fighter').die) break;
        mPos++;
    }
    console.log('有人死亡了，位置：', mPos, oPos);

    if (mPos > self.myPos) {
        // 我方向前推进
        for (i in self.pets) {
            var fighter = self.pets[i].getScript('qc.demo.Fighter');
            if (!fighter.die) fighter.moveTo(mPos);
        }
        self.myPos = mPos;
    }
    if (oPos > self.oppPos) {
        // 敌人向前推进
        for (i in self.monsters) {
            var fighter = self.monsters[i].getScript('qc.demo.Fighter');
            if (!fighter.die) fighter.moveTo(oPos);
        }
        self.oppPos = oPos;
    }
}
