# 监听鼠标位置

* 本范例是监听鼠标的位置，通过移动鼠标控制贴图坐标的变化显示。效果图如下：<br>
![](images\UI.gif)
* 创建一个Image用来显示贴图。
* 创建一个Text用来显示当前鼠标的坐标。
* 创建脚本InputTest.js，负责监听鼠标的坐标，控制贴图的移动。<br>
代码如下：<br>

```javascript
var InputTest = qc.defineBehaviour('qc.demo.InputTest', qc.Behaviour, function() {
    this.image = null;
    this.label = null;
}, {
    image: qc.Serializer.NODE,
    label: qc.Serializer.NODE
});

InputTest.prototype.awake = function() {
    // 方法1：使用事件回调
    var self = this;
	// 鼠标移动
    self.game.input.onCursorMove.add(function(x, y) {
        console.log('Move', x, y);
        self.image.anchoredX = x;
        self.image.anchoredY = y;
    });
};

InputTest.prototype.update = function() {
    // 方法2：每帧获取
    this.label.text = 'X:' + this.game.input.cursorPosistion.x +
        ', Y:' + this.game.input.cursorPosistion.y;
};
```

