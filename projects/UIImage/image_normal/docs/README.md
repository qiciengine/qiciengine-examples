# 普通贴图

* 本范例主要是演示动态设置贴图的属性。通过点击按钮事件，实现改变Image属性的展示。效果图如下：<br>
![](images\UI.gif)

## UI

* 首先在新建场景中创建一个Image组件UIImage，设置贴图为可交互，从图集demo.bin选择icon.png设置到Frame属性上，并设置为原始图大小。如下图：<br>
![](images\icon.png)
* 创建脚本ImageClick.js，挂在UIImage节点上。负责点击贴图触发事件的逻辑。<br>
代码如下：<br>

```javascript   
var ImageClick = qc.defineBehaviour('qc.demo.ImageClick', qc.Behaviour, function() {
}, {
});

ImageClick.prototype.onClick = function() {
    alert('Image Click.');
};
```
* 创建一个Empty Node作为menus节点，作为7个Button的父亲节点。设置menus节点以右上角定位。如下图：<br>
![](images\menus.png)
* 在menus的节点下创建7个Button组件，分别为ChangeFrame、ChangeSize、ChangePosition、Rotation、Pivot、ColorTint和Interactive，依次排列。设置Button节点都是以顶部对齐，左右拉伸，高为40。如下图：<br>
![](images\button.png)

### ChangeFrame

* 创建脚本ChangeFrame.js，挂在ChangeFrame节点上，负责切换UIImage节点上的贴图内容。通过改变UIImage节点上的Frame属性，实现切换贴图。效果图如下：<br>
![](images\frame.png)<br>
代码如下：<br>

```javascript   
var ChangeFrame = qc.defineBehaviour('qc.demo.ChangeFrame', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

ChangeFrame.prototype.onClick = function() {
    if (this.image.frame === 'icon.png')
        this.image.frame = 'icon_slime.png';
    else
        this.image.frame = 'icon.png';
    this.image.resetNativeSize();
};

```

### ChangeSize

* 创建脚本ChangeSize.js，挂在ChangeSize节点上，负责改变贴图的大小。通过改变UIImage节点上的width和Height属性，实现改变贴图的大小。效果图如下：<br>
![](images\size.png)<br>
代码如下：<br>

```javascript   
var ChangeSize = qc.defineBehaviour('qc.demo.ChangeSize', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

ChangeSize.prototype.onClick = function() {
    this.image.width = this.game.math.random(100, 300);
    this.image.height = this.game.math.random(100, 300);
};
```

### ChangePosition

* 创建脚本ChangePosition.js，挂在ChangePosition节点上，负责改变UIImage节点的显示位置。通过改变UIImage节点上的anchoredX和anchoredY属性，实现改变贴图的坐标。效果图如下：<br>
![](images\pos.png)<br>
代码如下：<br>

```javascript   
var ChangePosition = qc.defineBehaviour('qc.demo.ChangePosition', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

ChangePosition.prototype.onClick = function() {
    this.image.anchoredX = this.game.math.random(0, 300);
    this.image.anchoredY= this.game.math.random(0, 300);
};
```

### ChangeRotation

* 创建脚本ChangeRotation.js，挂在ChangeRotation节点上，负责改变UIImage节点的旋转角度。通过改变Image节点上的Rotation属性，实现改变贴图的旋转角度。效果图如下：<br>
![](images\rotation.png)<br>
代码如下：<br>

```javascript   
var ChangeRotation = qc.defineBehaviour('qc.demo.ChangeRotation', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

ChangeRotation.prototype.onClick = function() {
    this.image.rotation = this.game.math.random(0, 360 * Math.PI);
};
```

### ChangePivot

* 创建脚本ChangePivot.js，挂在ChangePivot节点上，负责改变UIImage节点的中心点。通过改变Image节点上的pivotX和pivotY属性，实现改变贴图的中心点位置。效果图如下：<br>
![](images\pivot.png)<br>
代码如下：<br>

```javascript   
var ChangePivot = qc.defineBehaviour('qc.demo.ChangePivot', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

ChangePivot.prototype.onClick = function() {
    this.image.pivotX = this.image.pivotX === 0 ? 0.5 : 0;
    this.image.pivotY = this.image.pivotY === 0 ? 0.5 : 0;
};
```

### ColorTint

* 创建脚本ColorTint.js，挂在ColorTint节点上，负责改变UIImage节点的颜色。通过改变Image节点上的Color属性，实现改变贴图的颜色。效果图如下：<br>
![](images\color.png)<br>
代码如下：<br>

```javascript   
var ColorTint = qc.defineBehaviour('qc.demo.ColorTint', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

ColorTint.prototype.onClick = function() {
    this.image.colorTint = new qc.Color(this.game.math.random(0xff000000, 0xffffffff));
};
```

### Interactive

* 创建脚本Interactive.js，挂在Interactive节点上，负责设置UIImage是否可以交互。通过改变Image节点上的Interactive属性，实现改变贴图的可交互性。效果图如下：<br>
![](images\hit.png)<br>
代码如下：<br>

```javascript   
var Interactive = qc.defineBehaviour('qc.demo.Interactive', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

Interactive.prototype.onClick = function() {
    this.image.interactive = !this.image.interactive;
};
```
