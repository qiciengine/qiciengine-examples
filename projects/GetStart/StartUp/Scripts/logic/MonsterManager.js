/**
 * 维护所有的怪物
 */
var MonsterManager = qc.startup.MonsterManager = function() {
    /**
     * 所有配置的怪物数据
     */
    this.rawMonsters = {};
};
MonsterManager.prototype = {};
MonsterManager.prototype.constructor = MonsterManager;

/**
 * 初始化本模块
 */
MonsterManager.prototype.init = function() {
    var self = this;
    var data = G.game.assets.find('config').findSheet('monster');
    data.rows.forEach(function(row) {
        var monster = new qc.startup.Monster();
        monster.id = row.id;
        monster.name = row.name;
        monster.icon = row.icon;
        monster.life = row.life;

        self.rawMonsters[monster.id] = monster;
    });

    G.game.log.trace('Total Monster: {0}', data.rows.length);
};

/**
 * 随机抽取一个怪物
 */
MonsterManager.prototype.fetchRandom = function() {
	var list = Object.keys(this.rawMonsters);
    var id = list[G.game.math.random(0, list.length - 1)];
    return this.rawMonsters[id];
};

