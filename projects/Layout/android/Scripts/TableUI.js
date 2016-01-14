/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 模拟android的应用列表，用于演示Table布局
 */
var TableUI = qc.defineBehaviour('qc.demo.TableUI', qc.Behaviour, function() {
    var self = this;

    // 图标的预制
    self.iconPrefab = null;

    // 所有icon
    self.icons = [];

    // 所有的应用名称
    self.names = [];
}, {
    // 需要序列化的字段
    iconPrefab: qc.Serializer.PREFAB,
    icons: qc.Serializer.STRINGS,
    names: qc.Serializer.STRINGS
});

// 初始化处理
TableUI.prototype.awake = function() {
    // 根据配置生成图标列表
    for (var i = 0;i < this.icons.length; i++) {
        var node = this.game.add.clone(this.iconPrefab, this.gameObject);
        var c = node.getScript('qc.demo.IconItem');
        c.setData({
            icon: this.icons[i],
            name: this.names[i]
        });
    }

    // 重排列下
    this.gameObject.getScript('qc.TableLayout').rebuildTable();
}
