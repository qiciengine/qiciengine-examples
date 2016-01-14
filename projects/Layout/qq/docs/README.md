# QQ

* 本范例UI是模拟QQ联系人界面，用于演示单列多行列表（TableLayout）与预置的创建和删除。效果图如下：<br>![](images\qq.gif)<br>
每点击一次联系人，添加一个联系人信息加到联系人列表中。点击动态，则删除被创建出来的联系人。

## UI布局

* 将UI分为三个部分：标题栏、内容和菜单栏。标题栏和菜单栏的UI布局可以参考 [《史莱姆》](http://engine.zuoyouxi.com/demo/Layout/slime/index.html)。<br>
效果图如下：<br>
![](images\qq.png)<br>

## 内容

* 在内容这个部分，联系人是允许多个显示，所以需要一个单列多行的列表(即TableLayout)来负责显示单个或者多个联系人。
* 因为联系人列表是可以下拉滑动，所以需要创建一个ScrollView，设置其上下左右拉伸，上边距100，留下标题栏的显示区域，下边距100，留下菜单栏的显示区域。中间红色框区域是显示联系人列表，如下图：<br>
![](images\content.png)<br><br>
* 选中node节点（滚动的内容），设置以顶部对齐，左右拉伸铺满父亲内容。如下图：<br>
然后点击“Add Component”按钮添加TableLayout组件，以自动对内容进行排版。<br>
设置每条内容的大小CellSize(x,y)，因为是左右拉伸，所以x为0即可，y为125。<br>
勾选AutoUpdate，每帧都会自动根据最新的数据设置位置。如下图：<br>
![](images\TableLayout.png)<br>

## 联系人预置

* 由于联系人是多个，而且联系人的结构都是一样的，为了不重复创建多个联系人的节点结构，就需要创建一个通用的联系人结构称为预置。

### 1、绘制联系人预置

* 在TableLayout设置完成之后，开始绘制每条内容，效果图如下：<br>
![](images\qqPeople.png)<br>
绘制完成之后，在Project面板中，新建目录：Game/Assets/prefabs。<br>
选择qqPeople节点，将其直接拖拽放入prefabs目录，此时该目录下会自动生成qqPeople.bin。<br>
在设计面板中，可以观察到qqPeople节点颜色变为深蓝色，即预置qqPeople生成成功。<br>
现在我们可以删除qqPeople的节点信息，通过脚本动态生成qqPeople。<br>
* 创建一个脚本QQItem.js，挂载在预置qqPeople.bin上，用来设置联系人信息。<br>
将qqPeople节点下的子节点拖拽到对应的设置中。通过脚本控制，动态设置联系人头像、名称等信息。如下图：<br>
![](images\QQItem.png)<br>
QQItem.js代码如下：<br>

```javascript
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
```
### 2、预置的创建和删除

* 创建一个脚本QQ.js，挂载在根节点。负责创建预制体和删除预置逻辑，以及配置联系人的信息：头像icons、名称names、上线时间times和动态actions。策划可以在这里直接配置联系人的信息，通过脚本动态添加联系人时，随机赋予联系人头像、名称、上线时间和动态内容。如下图：<br>
![](images\qqScript.png)<br>
QQ.js代码如下：<br>

```javascript   
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
    self.addBtn.onClick.add(function() {
        self.add();
    });

    // 动态按钮被点击，随机干掉一条联系人信息
    self.actionBtn.onClick.add(function() {
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
```
