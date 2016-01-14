/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var ChangeTexture = qc.defineBehaviour('qc.demo.ChangeTexture', qc.Behaviour, function() {
    this.texture = null;
}, {
    texture: qc.Serializer.TEXTURE
});

/**
 * 当节点被点击时，本函数自动被调用
 */
ChangeTexture.prototype.onClick = function() {
    this.gameObject.texture = this.texture;
    this.gameObject.playAnimation('run');
    this.gameObject.resetNativeSize();
};
