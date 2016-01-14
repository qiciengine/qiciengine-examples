# 鼠标滚轮

* 本范例演示鼠标滚轮滚动事件。通过滑动鼠标滚轮，控制节点移动。效果图如下：<br>
![](images\UI.gif)
* 在新建场景中创建一个Text，用来显示当前鼠标滚轮滚动的坐标。
* 在根节点下创建一个UIImage，用来显示被鼠标滚轮控制的贴图节点。
* 创建脚本InputTest.js，负责鼠标滚轮控制贴图移动的逻辑。脚本挂在根节点下。<br>
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
    var self = this;
	
	// 鼠标滚轮滑动
    self.game.input.onWheel.add(function(deltaX, deltaY) {
        self.image.anchoredX += deltaX;
        self.image.anchoredY += deltaY;
    });
};

InputTest.prototype.update = function() {
    this.label.text = 'WheelDeltaX=' + this.game.input.wheelDeltaX +
        ', WheelDeltaY=' + this.game.input.wheelDeltaY;
};
```
