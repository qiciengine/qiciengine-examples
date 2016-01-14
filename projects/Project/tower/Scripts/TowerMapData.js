/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 塔防的地图数据
 */
var TowerMapData = qc.defineBehaviour('qc.demo.TowerMapData', qc.Behaviour, function() {
    var self = this;

    // 怪物走动的格子
    self.monsterGrids = [];

    // 地图数据
    // 12 * 7
    // 0 : 可以建造
    // 1 : 怪物格子
    // 2 : 有建筑物了
    // 3 : 有障碍物
    self.data = [12 * 7];

    // 障碍物列表
    self.obstacles = [];

    // 在编辑器模式下可以运行
    self.runInEditor = true;
}, {
    // 需要序列化的字段
    monsterGrids: qc.Serializer.NUMBERS,
    obstacles: qc.Serializer.NODES
});

// 初始化处理
TowerMapData.prototype.awake = function() {
    // 初始化地图数据
    var self = this;
    for (var i = 0; i < self.data.length; i++) self.data[i] = 0;
    self.monsterGrids.forEach(function(i) {
        self.data[i] = 1;
    });
    self.obstacles.forEach(function(o) {
        var c = o.getScript('qc.demo.Obstacle');
        c.grids.forEach(function(i) {
            self.data[i] = 2;
        });
    });
};