# 仿Android应用

* 本范例是模拟android的应用列表，用于演示Table布局(多行多列)。效果图如下：<br>
![](images\UI.gif)

## 应用列表

* 一般在手机上，应用列表是能够上下滑动，所以需要创建一个ScrollView组件。<br>
选中node节点，添加一个TableLayout组件，使应用图标能够规则地排序(多行多列)。<br>
添加步骤如下：<br>
点击Add Component -> UI -> Layout -> TableLayout。<br>
设置TableLayout每个子节点的大小为150\*150，左右间距10，上下间距30。如下图：<br>
![](images\TableLayout.png)<br>
* 绘制子节点信息。创建一个Empty Node，命名为iconPrefab,大小设置为150\*150。<br>
在该节点下，创建一个Image和一个Text，分别命名为icon和name，用来显示应用的图标和名称。
* 创建一个脚本IconItem.js，挂载在iconPrefab节点，用来设置iconPrefab显示信息。<br>
代码如下：<br>

```javascript
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
}
```

* 在Project面板中，新建目录：Game/Assets/prefabs。<br>选择iconPrefab节点，将其直接拖拽放入prefabs目录，此时该目录下会自动生成iconPrefab.bin。<br>在设计面板中，可以观察到iconPrefab节点颜色变为深蓝色，即预置iconPrefab生成成功。<br>如下图：<br>
![](images\prefab.png)<br>
* 现在我们可以删除在node节点下的iconPrefab节点信息，通过创建脚本TableUI.js，动态生成iconPrefab节点。脚本挂载在node节点,并将之前创建的预置iconPrefab.bin拖拽到iconPrefab属性框中，并设置其他属性信息。如下图：<br>
![](images\TableUI.png)<br>
TableUI.js代码如下：<br>

```javascript
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
```

* 运行游戏，可以看到面板中显示9个应用图标，排列间隔有序，而且会自动换行。同时在node节点下，也可以看到创建了9个iconPrefab。如下图：<br>
![](images\node1.png)<br>
