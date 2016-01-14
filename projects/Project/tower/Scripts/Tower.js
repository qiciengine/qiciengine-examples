/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 炮塔的逻辑
 */
var Tower = qc.defineBehaviour('qc.demo.Tower', qc.Behaviour, function() {
    var self = this;

    // 炮塔的等级、攻击力
    self.level = 1;
    self.attack = 100;

    // 炮塔的位置
    self.index = 0;

    // 攻击范围标识
    self.scopeFlag = null;

    // 背景和图标
    self.background = null;
    self.icon = null;
    self.appearEffect = null;

    // 子弹预制
    self.bulletPrefab = null;

    // 攻击频率
    self.rate = 0.8;
}, {
    // 需要序列化的字段
    level: qc.Serializer.NUMBER,
    attack: qc.Serializer.NUMBER,
    scopeFlag: qc.Serializer.NODE,
    background: qc.Serializer.NODE,
    icon: qc.Serializer.NODE,
    appearEffect: qc.Serializer.NODE,
    rate: qc.Serializer.NUMBER,
    bulletPrefab: qc.Serializer.PREFAB
});

Object.defineProperties(Tower.prototype, {
    /**
     * @property {number} scope - 攻击范围
     * @readonly
     */
    scope: {
        get: function() { return this.scopeFlag.width / 2; }
    }
});

// 炮塔出现了
Tower.prototype.appear = function(index) {
    var self = this;
    this.index = index;

    // 添加到主逻辑中
    window.towerUI.addTower(index, self);

    // 播放特效
    self.appearEffect.visible = true;
    self.appearEffect.playAnimation('monster_disappear');
    self.appearEffect.onFinished.addOnce(function() {
        self.appearEffect.visible = false;
    });

    // 背景和图标显示出来
    var c = self.background.getScript('qc.TweenScale');
    c.playForward();
    c = self.icon.getScript('qc.TweenScale');
    c.playForward();

    // 开始进行攻击
    self._timer = self.game.timer.loop(self.rate * 1000, function() {
        var monsters = window.towerUI.monsters;
        for (var i in monsters) {
            var monster = monsters[i].getScript('qc.demo.TowerMonster');
            if (monster.denyAttack) continue;
            if (monster.die || !self.isInRange(monster.gameObject.x, monster.gameObject.y)) continue;

            // 进行攻击
            self.startAttack(monster);
            return;
        }
    });
};

// 析构的处理
Tower.prototype.onDestroy = function() {
    if (this._timer) {
        this.game.timer.remove(this._timer);
        delete this._timer;
    }
};

// 炮塔被点击时显示或隐藏攻击范围
Tower.prototype.onClick = function() {
    var self = this,
        c = self.scopeFlag.getScript('qc.TweenScale');
    if (self.scopeFlag.visible) {
        // 隐藏掉
        c.from = new qc.Point(1, 1);
        c.to = new qc.Point(0, 0);
        c.stop();
        c.resetToBeginning();
        c.onFinished.addOnce(function() {
            self.scopeFlag.visible = false;
        });
        c.playForward();
    }
    else {
        // 显示出来
        c.from = new qc.Point(0, 0);
        c.to = new qc.Point(1, 1);
        c.stop();
        self.scopeFlag.visible = true;
        c.resetToBeginning();
        c.playForward();
    }
};

// 是否在炮塔攻击范围内
Tower.prototype.isInRange = function(x, y) {
    var distance = (new qc.Point(x, y)).distance(new qc.Point(this.gameObject.x, this.gameObject.y));
    return distance <= this.scope;
};

// 令炮塔面对攻击点
Tower.prototype.lookat = function(x, y) {
    var self = this,
        r = Math.atan2(y - self.gameObject.y, x - self.gameObject.x);

    // 面向目标
    self.icon.rotation = r;
};

// 开始攻击目标怪物
Tower.prototype.startAttack = function(monster) {
    var self = this;

    // 炮塔面对目标点
    self.lookat(monster.gameObject.x, monster.gameObject.y);

    // 播放攻击动画
    self.icon.playAnimation('tower_attack');
    self.icon.onFinished.addOnce(function() {
        self.icon.playAnimation('tower_idle');

        // 生成子弹并攻击目标
        var bullet = self.game.add.clone(self.bulletPrefab, self.gameObject.parent);
        bullet.getScript('qc.demo.TowerBullet').fly(self, monster)
    });
}
