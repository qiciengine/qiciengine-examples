/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 修建塔的按钮
 */
var TowerBuild = qc.defineBehaviour('qc.demo.TowerBuild', qc.Behaviour, function() {
    var self = this;

    // 建造瓶子
    self.bottle = null;

    // 炮塔的预制
    self.towerPrefab = null;

    // 需要耗费的金钱
    self.cost = 100;

    // 位置
    self.index = 0;
}, {
    // 需要序列化的字段
    bottle: qc.Serializer.NODE,
    towerPrefab: qc.Serializer.PREFAB,
    cost: qc.Serializer.NUMBER
});

// 初始化处理
TowerBuild.prototype.awake = function() {
    var self = this;
    this.addListener(self.bottle.onClick, function() {
        // 判断下金钱是不是足够
        if (window.towerUI.money < self.cost) return;
        window.towerUI.money -= self.cost;

        // 在index位置建造一个建筑
        self.build();
    });
};

// 点击时显示或隐藏建筑信息
TowerBuild.prototype.onClick = function() {
    // 消失掉
    window.towerUI._buildBtn = undefined;
    this.gameObject.destroy();
};

// 建造炮塔
TowerBuild.prototype.build = function() {
    var self = this;
    var tower = self.game.add.clone(self.towerPrefab, self.gameObject.parent);
    tower.x = self.gameObject.x;
    tower.y = self.gameObject.y;
    tower.getScript('qc.demo.Tower').appear(self.index);

    // 消失掉
    window.towerUI._buildBtn = undefined;
    this.gameObject.destroy();
};

// 炮塔按钮出现了
TowerBuild.prototype.appear = function(index) {
    var self = this,
        c = self.getScript('qc.TweenScale');
    self.index = index;
    c.resetToBeginning();
    c.playForward();

    if (window.towerUI.money < self.cost) {
        // 金钱不足时显示灰色图片
        self.bottle.frame = '瓶子去色.png';
    }
};
