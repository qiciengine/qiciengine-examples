/**
 * 怪物类，负责维护怪物的信息
 */
var Monster = qc.startup.Monster = function() {
    var self = this;

    /**
     * @property {number} id - 怪物标识
     */
    self.id = 0;

    /**
     * @property {string} name - 怪物名字
     */
    self.name = '';

    /**
     * @property {string} icon - 怪物的图标
     */
    self.icon = '';

    /**
     * @property {number} life - 怪物的生命时长，单位MS
     */
    self.life = 0;
};
Monster.prototype = {};
Monster.prototype.constructor = Monster;

/***
 * 复制出一个怪物
 */
Monster.prototype.clone = function() {
    var m = new Monster();
    m.id = this.id;
    m.name = this.name;
    m.icon = this.icon;
    m.life = this.life;
};
