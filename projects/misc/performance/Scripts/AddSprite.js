/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 添加一个精灵
 */
var AddSprite = qc.defineBehaviour('qc.demo.AddSprite', qc.Behaviour, function() {
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

// 初始化处理，一开始就扔100个动画进来
AddSprite.prototype.onEnable = function() {
    var total = 2;
    if (this.game.device.webGL) total = 100;
    for (var i = 0; i < total; i++) this.onClick();
};

// 界面被点击的处理
AddSprite.prototype.onClick = function() {
    var sprite = this.game.add.clone(this.prefab, this.root);

    // 随机扔个位置
    sprite.x = this.game.math.random(30, this.game.world.width - 30);
    sprite.y = this.game.math.random(30, this.game.world.height - 30);

    // 随机播放动作
    var animations = sprite.animationNameList;
    var index = this.game.math.random(0, animations.length - 1);
    sprite.playAnimation(animations[index], 1, true);

    // 显示数量
    this.gameObject.text.text = 'panda:' + (++this.count);
};
