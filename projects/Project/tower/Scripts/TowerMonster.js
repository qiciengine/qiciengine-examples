/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 怪物
 */
var TowerMonster = qc.defineBehaviour('qc.demo.TowerMonster', qc.Behaviour, function() {
    var self = this;

    // 怪物对象
    self.sprite = null;

    // 消失的动画
    self.disappearSprite = null;

    // 出现的动画
    self.appearSprite = null;

    // 血量
    self.maxHp = 50;
    self._hp = self.maxHp;

    // 金钱奖励
    self.money = 10;

    // 在编辑器模式下可以运行
    self.runInEditor = true;
}, {
    // 需要序列化的字段
    sprite: qc.Serializer.NODE,
    disappearSprite: qc.Serializer.NODE,
    appearSprite: qc.Serializer.NODE,
    maxHp: qc.Serializer.NUMBER,
    money: qc.Serializer.NUMBER
});

Object.defineProperties(TowerMonster.prototype, {
    /**
     * @properyt {boolean} die - 是否死亡了
     * @readonly
     */
    die: {
        get: function() { return this.hp <= 0; }
    },

    /**
     * @property {number} hp - 怪物的血量
     */
    hp: {
        get: function() { return this._hp; },
        set: function(v) {
            if (this.die) return;

            this._hp = v;
            if (this.die) {
                // 给奖励并消失掉
                window.towerUI.money += this.money;
                window.towerUI.bonus++;
                this.disappear();
            }
        }
    }
});

// 初始化处理
TowerMonster.prototype.awake = function() {
    var self = this;
    self.hp = self.maxHp;
    if (self.disappearSprite)
        self.disappearSprite.visible = false;
    if (self.appearSprite)
        self.appearSprite.visible = false;

    // 当前处于第0格
    self._curr = 0;
};

// 怪物出现了
TowerMonster.prototype.appear = function(round) {
    var self = this;

    // 设置血量
    self.maxHp = self.game.math.random(140, 220) + 50 * round;
    self.hp = self.maxHp;

    // 旋转
    self.appearSprite.visible = true;
    var c = self.appearSprite.getScript('qc.TweenRotation');
    c.resetToBeginning();
    c.playForward();

    // 放大出来
    c = self.getScript('qc.TweenScale');
    c.resetToBeginning();
    c.playForward();

    // 一段时间后特效消失
    self.game.timer.add(300, function() {
        self.denyAttack = false;
        self.appearSprite.visible = false;
    });

    // 延迟驱动怪物前进，出现过程中不能被攻击
    self.denyAttack = true;
    self.game.timer.add(100, function() {
        self.run();
    })
};

// 驱动怪物向前跑
TowerMonster.prototype.run = function() {
    var self = this;

    // 取得目标的位置点
    var data = window.towerUI.map.getScript('qc.demo.TowerMapData').monsterGrids;
    var targetPos = window.towerUI.getPos(data[++self._curr]);
    var c = self.getScript('qc.TweenPosition');
    c.from = new qc.Point(self.gameObject.x, self.gameObject.y);
    c.to = targetPos;
    c.resetToBeginning();
    c.onFinished.addOnce(function() {
        if (self.die) return;
        if (self._curr >= data.length - 1) {
            // 怪物跑到终点了
            window.towerUI.fail++;
            self.disappear();
        }
        else {
            // 继续跑
            self.game.timer.add(1, function() { self.run(); });
        }
    });
    c.playForward();

    // 播放跑的动作
    self.sprite.playAnimation('monster_run');
};

// 怪物消失的动画
TowerMonster.prototype.disappear = function() {
    var self = this;

    // 不要再跑动了
    var c = self.getScript('qc.TweenPosition');
    c.stop();

    // 播放消失动画
    self.disappearSprite.visible = true;
    self.disappearSprite.playAnimation('monster_disappear');
    self.disappearSprite.onFinished.addOnce(function() {
        // 干掉怪物对象
        self.gameObject.destroy();
    });

    // 清理掉
    window.towerUI.removeMonster(self.gameObject);
};
