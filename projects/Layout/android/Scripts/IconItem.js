/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 显示一个图标
 */
var IconItem = qc.defineBehaviour('qc.demo.IconItem', qc.Behaviour, function() {
    var self = this;

    self.nameLabel = null;
    self.icon = null;
}, {
    // 需要序列化的字段
    nameLabel: qc.Serializer.NODE,
    icon: qc.Serializer.NODE
});

/**
 * 设置数据
 */
IconItem.prototype.setData = function(data) {
    this.nameLabel.text = data.name;
    this.icon.frame = data.icon;
    this.icon.resetNativeSize();
};

IconItem.prototype.onClick = function() {
    alert('OnClick!');
};
