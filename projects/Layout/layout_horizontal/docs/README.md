# layoutHorizontal

* 实例演示HorizontalLayout组件的使用。效果图如下：<br>
![](images\UI.png)

## UI

* 在新建场景中创建一个UIImage作为水平列表Horizontal，设置节点高为600，X轴居中stretch，如下图：<br>
![horizontal](images\horizontal.png)
* 选中Horizontal节点，在该节点上添加一个HorizontalLayout组件，<br>
添加步骤：'AddCompontent' **->** 'UI' **->** 'Layout' **->** 'HorizontalLayout'。设置如下图：<br>
![](images\set.png)
* 在根节点下创建两个Button，分别为addBtn和resizeBtn。点击按钮触发添加预置和重置预置图片大小的事件。
* 创建脚本Layout.js，负责点击addBtn添加预置到水平列表中。脚本挂在Horizontal节点上，如下图：<br>
![](images\script.png)<br>
代码如下：<br>

```javascript
/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var Layout = qc.defineBehaviour('qc.demo.Layout', qc.Behaviour, function() {
    this.addBtn = null;
    this.resizeBtn = null;
    this.itemPrefab = null;
}, {
    addBtn: qc.Serializer.NODE,
    resizeBtn: qc.Serializer.NODE,
    itemPrefab: qc.Serializer.PREFAB
});

Layout.prototype.awake = function() {
    this.addListener(this.addBtn.onClick, this.addItem, this);
    this.addListener(this.resizeBtn.onClick, this.resizeItem, this);
};

Layout.prototype.addItem = function() {
    var item = this.game.add.clone(this.itemPrefab, this.gameObject);
};

Layout.prototype.resizeItem = function() {
    var index = this.game.math.random(0, this.gameObject.children.length - 1);
    var item = this.gameObject.getChildAt(index);
    item.height = item.width = this.game.math.random(50, 200);

    // relayout
    this.getScript('qc.HorizontalLayout').rebuildTable();
    console.log('Nothing happened!');
};
```

### 预置

* 在Horizontal节点下创建一个UIImage作为icon，节点大小设置为资源图片的原始大小，并设置icon为可交互，如下图：<br>
![](images\interactive.png)
* 选中icon节点，在该节点上添加一个LayoutElement组件，设置如下图：<br>
![](images\element.png)
* 在icon节点下创建一个UIText作为title，显示文本内容'www.qiciengine.com'。设置title大小为(200,30)，以底部居中对齐。
* 创建脚本RotateItem.js，负责点击图片，改变icon的Rotation的值。脚本挂在icon节点上。<br>
代码如下：<br>

```javascript
/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var RotateItem = qc.defineBehaviour('qc.demo.RotateItem', qc.Behaviour, function() {
}, {
});

RotateItem.prototype.onClick = function() {
    if (this.gameObject.rotation !== 0) this.gameObject.rotation = 0;
    else this.gameObject.rotation = Math.PI / 3;

    // relayout
    this.gameObject.parent.getScript('qc.HorizontalLayout').rebuildTable();
};
```
* 选中icon节点，将该节点拖拽到Project/Assets/prefabs/目录下，预置icon.bin创建成功。
