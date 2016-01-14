/**
 * 定期产出怪物
 */ 
var MonsterRefresh = qc.defineBehaviour('qc.startup.MonsterRefresh', qc.Behaviour, function() {
    // 怪物的预制
    this.monsterPrefab = null;
    
    // 开始按钮
    this.startBtn = null;
}, {
    monsterPrefab: qc.Serializer.PREFAB,
    startBtn: qc.Serializer.NODE
});

MonsterRefresh.prototype.awake = function() {
    // 开始按钮被点击后，开始定期刷出怪物
    var self = this;
    this.addListener(self.startBtn.onClick, function() {
        // 开始按钮隐藏掉
        self.startBtn.visible = false; 
        
        // 建立个定时器 每隔1秒随机产出一个怪物
        self.game.timer.loop(1000, function() {
            // 应用概率失败，不产出了
            if (self.game.math.random(0, 1) === 0) return;
        
            // 抽取一个怪物
            var monster = G.monsters.fetchRandom();

            // 显示出来
            self.add(monster);
        });
    });
};

/**
 * 添加一个怪物
 */ 
MonsterRefresh.prototype.add = function(monster) {
    // 根据预置复制出怪物对象，怪物对象挂载在本游戏对象(UIRoot)下
    var ob = this.game.add.clone(this.monsterPrefab, this.gameObject); 
    
    // 在屏幕上显示出来
    var c = ob.getScript('qc.startup.MonsterUI');
    c.show(monster);
};
