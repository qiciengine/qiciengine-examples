/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 障碍物对象
 */
var Obstacle = qc.defineBehaviour('qc.demo.Obstacle', qc.Behaviour, function() {
    var self = this;

    // 障碍物占据的格子
    self.grids = [];

    // 障碍物的血量
    self.maxHp = 100;
    self.hp = self.maxHp;
}, {
    // 需要序列化的字段
    grids: qc.Serializer.NUMBERS,
    maxHp: qc.Serializer.NUMBER
});

Object.defineProperties(Obstacle.prototype, {
    /**
     * @property {boolean} die - 是否死亡了
     * @readonly
     */
    die: {
        get: function() { return this.hp <= 0; }
    }
});

// 障碍物初始化
Obstacle.prototype.awake = function() {
    this.hp = this.maxHp;
};

// 摧毁障碍物
Obstacle.prototype.disappear = function() {
    // TODO
};