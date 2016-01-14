# 鼠标或触摸事件

* 本范例演示通过点击鼠标或者触摸屏幕触发事件。效果图如下：<br>
![](images\UI.gif)
* 在新建场景中创建一个Text，用来显示鼠标点击位置的坐标。
* 在根节点下创建一个Image，用来显示贴图。当鼠标点击屏幕中任意位置，贴图移动到点击的位置。
* 创建脚本InputTest.js，负责鼠标点击事件的逻辑。脚本挂在UIImage的节点上。<br>
代码如下：<br>

```javascript
var InputTest = qc.defineBehaviour('qc.demo.InputTest', qc.Behaviour, function() {
    this.image = null;
    this.label = null;
}, {
    image: qc.Serializer.NODE,
    label: qc.Serializer.NODE
});

// 初始化
InputTest.prototype.awake = function() {
    var self = this;
    self.game.input.onPointerDown.add(this.onPointerDown, this);
    self.game.input.onPointerMove.add(this.onPointerMove, this);
    self.game.input.onPointerUp.add(this.onPointerUp, this);
};

// 鼠标被按下
InputTest.prototype.onPointerDown = function(id, x, y) {
    console.log('id', id);
    this.oldPos = new qc.Point(this.image.anchoredX, this.image.anchoredY);

    this.image.anchoredX = x;
    this.image.anchoredY = y;
    this.label.text = 'X:' + x + ', Y:' + y;
};

// 鼠标按下移动
InputTest.prototype.onPointerMove = function(id, x, y) {
    console.log('id', id);
    this.image.anchoredX = x;
    this.image.anchoredY = y;
    this.label.text = 'X:' + x + ', Y:' + y;
};

// 鼠标松开
InputTest.prototype.onPointerUp = function(id, x, y) {
    console.log('id', id);
    this.image.anchoredX = this.oldPos.x;
    this.image.anchoredY = this.oldPos.y;

    this.label.text = 'X:' + x + ', Y:' + y + ', Mouse:' + this.game.input.isMouse(id);
};
```



