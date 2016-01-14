/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var ClickOnAnImage = qc.defineBehaviour('qc.demo.ClickOnAnImage', qc.Behaviour, function() {
    this._count = 0;
    this.clueLabel = null;
}, {
    clueLabel: qc.Serializer.NODE
});

/**
 * 初始化处理
 */
ClickOnAnImage.prototype.awake = function() {
    // 监听节点被点击的另外一种方式：注册事件
    this.addListener(this.gameObject.onClick, function() {
        console.log('Click!');
    });
};

/**
 * 当节点被点击时，本函数自动被调用
 */
ClickOnAnImage.prototype.onClick = function() {
    var self = this;
    self._count++;
    self.clueLabel.text = 'Click ' + self._count + ' times.';
    self.clueLabel.visible = true;
};
