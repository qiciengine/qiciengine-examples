/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 显示一条联系人记录
 */
var QQItem = qc.defineBehaviour('qc.demo.QQItem', qc.Behaviour, function() {
    var self = this;

    self.time = null;
    self.nameLabel = null;
    self.action = null;
    self.icon = null;
}, {
    // 需要序列化的字段
    time: qc.Serializer.NODE,
    nameLabel: qc.Serializer.NODE,
    action: qc.Serializer.NODE,
    icon: qc.Serializer.NODE
});

/**
 * 设置联系人的数据
 */
QQItem.prototype.setData = function(data) {
    this.time.text = data.time;
    this.nameLabel.text = data.name;
    this.action.text = data.action;
    this.icon.frame = data.icon;
}
