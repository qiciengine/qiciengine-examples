/**
 * 绘制一个怪物
 */
var MonsterUI = qc.defineBehaviour('qc.startup.MonsterUI', qc.Behaviour, function() {
}, {
    // fields need to serialize
});

/**
 * 显示怪物monster的信息
 */
MonsterUI.prototype.show = function(monster) {    
    var math = this.game.math,
        self = this,
        o = self.gameObject;
    
    // 怪物随机显示在屏幕内某个点
    var x = math.random(0, o.parent.rect.width),
        y = math.random(0, o.parent.rect.height);
    o.anchoredX = x;
    o.anchoredY = y;
    
    // 设置怪物的图片
    o.frame = monster.icon;
    o.resetNativeSize();
    o.name = monster.name;
    
    // 记录对应的怪物信息
    self.monster = monster;
};

/**
 * 怪物被点击的处理：加分数并将怪物析构
 */ 
MonsterUI.prototype.onClick = function() {
    // 分数增加
    G.me.score++; 
    
    // 对象析构掉
    this.gameObject.destroy();
};
