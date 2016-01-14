/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 子弹的逻辑
 */
var TowerBullet = qc.defineBehaviour('qc.demo.TowerBullet', qc.Behaviour, function() {
    this.explodePrefab = null;
}, {
    explodePrefab: qc.Serializer.PREFAB
});

// 子弹由炮塔攻击怪物
TowerBullet.prototype.fly = function(tower, monster) {
    var self = this,
        o = self.gameObject,
        c = o.getScript('qc.TweenPosition');

    // 计算出生点
    var x1 = monster.gameObject.x,
        y1 = monster.gameObject.y,
        x2 = tower.gameObject.x,
        y2 = tower.gameObject.y;
    var r = Math.atan2((y1 - y2),  (x1 - x2));
    var x = tower.gameObject.x + 40 * Math.cos(r),
        y = tower.gameObject.y + 40 * Math.sin(r);

    self.target = monster.gameObject;
    c.from = new qc.Point(x, y);
    c.to = new qc.Point(x1, y1);
    c.duration = c.from.distance(c.to) / 1400;
    c.resetToBeginning();
    c.onFinished.addOnce(function() {
        // 播放爆炸的效果(挂载到怪物身上)
        var explode = self.game.add.clone(self.explodePrefab, self.target);
        explode.x = 0;
        explode.y = 0;
        explode.playAnimation('bullet_explode');
        explode.onFinished.addOnce(function() {
            // 怪物受创
            monster.hp -= tower.attack;
            explode.destroy();
        });

        // 子弹可以干掉了
        o.destroy();
    });
    c.playForward();
    o.playAnimation('bullet_fly');
};

// 帧调度，让子弹总是以怪物的中心点为目标
TowerBullet.prototype.update = function() {
    var self = this,
        c = self.getScript('qc.TweenPosition');
    c.to = new qc.Point(self.target.x, self.target.y);
};
