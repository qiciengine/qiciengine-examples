/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 模拟QQ联系人界面，用于演示单列多行列表
 */
var QQ = qc.defineBehaviour('qc.demo.QQ', qc.Behaviour, function() {
    var self = this;

    // 显示联系人的预制
    self.peoplePrefab = null;

    // 列表项挂载的根节点
    self.root = null;

    // 联系人按钮
    self.addBtn = null;

    // 动态按钮
    self.actionBtn = null;

    // 滚动界面
    self.scrollView = null;

    // 所有的icon列表，测试用而已
    self.icons = [];

    // 名字信息，测试时随机抽取
    self.names = [];

    // 动态信息，测试时随机抽取
    self.actions = [];

    // 时间信息，测试时随机抽取
    self.times = [];
}, {
    // 需要序列化的字段
    peoplePrefab: qc.Serializer.PREFAB,
    root: qc.Serializer.NODE,
    addBtn: qc.Serializer.NODE,
    actionBtn: qc.Serializer.NODE,
    scrollView: qc.Serializer.NODE,
    icons: qc.Serializer.STRINGS,
    names: qc.Serializer.STRINGS,
    times: qc.Serializer.STRINGS,
    actions: qc.Serializer.STRINGS
});

// 初始化处理
QQ.prototype.awake = function() {
    // 联系人按钮被点击，就随机添加一条联系人记录
    var self = this;
    this.addListener(self.addBtn.onClick, function() {
        self.add();
    });

    // 动态按钮被点击，随机干掉一条联系人信息
    this.addListener(self.actionBtn.onClick, function() {
        self.deleteRandom();
    });
}

// 添加一条记录
QQ.prototype.add = function() {
    // 生成记录
    var index = this.game.math.random(0, this.icons.length - 1);
    var icon = this.icons[index];
    index = this.game.math.random(0, this.names.length - 1);
    var name = this.names[index];
    index = this.game.math.random(0, this.actions.length - 1);
    var action = this.actions[index];
    index = this.game.math.random(0, this.times.length - 1);
    var time = this.times[index];

    // 表现到界面上
    var node = this.game.add.clone(this.peoplePrefab, this.root);
    var c = node.getScript('qc.demo.QQItem');
    c.setData({
        icon: icon,
        name: name,
        action: action,
        time: time
    });

    // 重排并滚动到最下方
    this.root.getScript('qc.TableLayout').rebuildTable();
    this.scrollView.verticalNormalizedPosition = 1;
}

// 随机删掉一条记录
QQ.prototype.deleteRandom = function() {
    var children = this.root.children;
    if (children.length < 1) return;
    var index = this.game.math.random(0, children.length - 1);
    children[index].destroy();

    // 自动重排列下位置
    this.root.getScript('qc.TableLayout').rebuildTable();
};
