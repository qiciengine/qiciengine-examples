/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 播放声音
 */
var PlaySound = qc.defineBehaviour('qc.demo.PlaySound', qc.Behaviour, function() {
    // 初始化代码
}, {
    // 需要序列化的字段
});

// 节点被点击了，播放声音
PlaySound.prototype.onClick = function() {
    var sound = this.gameObject.parent;
    sound.play();
}
