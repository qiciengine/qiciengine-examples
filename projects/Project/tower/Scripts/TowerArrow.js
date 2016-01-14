/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 怪物来临前的箭头表现
 */
var TowerArrow = qc.defineBehaviour('qc.demo.TowerArrow', qc.Behaviour, function() {
    var self = this;

    // 3个箭头
    self.arrows = [3];

    // 播放的次数
    self.times = 3;

    // 在编辑器模式下可以运行
    self.runInEditor = true;
}, {
    // 需要序列化的字段
    arrows: qc.Serializer.NODES,
    times: qc.Serializer.NUMBER
});

// 开始播放动画
TowerArrow.prototype.play = function() {
    var self = this;
    self.gameObject.visible = true;

    var count = self.times;
    var func = function() {
        count--;
        self.arrows.forEach(function(ob) {
            var c = ob.getScript('qc.TweenAlpha');
            c.stop();
            c.resetToBeginning();
            c.playForward();
        });

        self.arrows[self.arrows.length - 1].getScript('qc.TweenAlpha').onFinished.addOnce(function() {
            if (count <= 0) {
                // 播放结束了
                self.gameObject.visible = false;
            }
            else {
                // 继续播放
                self.game.timer.add(1, func);
            }
        });
    };
    func();
};