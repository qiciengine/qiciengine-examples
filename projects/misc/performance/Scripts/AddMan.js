/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 添加一个帧动画
 */
var AddMan = qc.defineBehaviour('qc.demo.AddMan', qc.Behaviour, function() {
    // 添加的精灵预制
    this.prefab = null;

    // 挂载的父亲节点
    this.root = null;
    this.count = 0;
}, {
    // 需要序列化的字段
    prefab: qc.Serializer.PREFAB,
    root: qc.Serializer.NODE
});

AddMan.prototype.awake = function() {
    var total = 50;
    if (this.game.phaser.renderType === Phaser.WEBGL) total = 200;
    for (var i = 0; i < total; i++) this.onClick();
};

// 界面被点击的处理
AddMan.prototype.onClick = function() {
    // 每次扔2个进来
    for (var i = 0; i < 2; i++) {
        var sprite = this.game.add.clone(this.prefab, this.root);

        // 随机扔个位置
        sprite.x = this.game.math.random(0, this.game.world.width - 60);
        sprite.y = this.game.math.random(0, this.game.world.height - 60);

        // 随机播放动作
        var animations = sprite.animationNameList;
        var index = this.game.math.random(0, animations.length - 1);
        sprite.playAnimation(animations[index], 1, true);

        // 显示数量
        this.gameObject.text.text = 'man:' + (++this.count);
    }
};
