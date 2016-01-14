# mouseButtons

* 实例演示鼠标按键的点击事件响应。效果图如下：<br>
![mouse](images\UI.gif)

# UI

* 在新建场景中创建一个UIImage作为mouse，用来显示鼠标图片。
* 在根节点下创建三个UIText，分别为LeftButton、MiddleButton、RightButton。用来显示当前鼠标按键按下的类型。
* 创建脚本UI.js，负责鼠标按键的点击事件响应。脚本挂在mouse节点上，并将LeftButton、MiddleButton、RightButton节点设置到对应的属性上。如下图：<br>
![script](images\script.png)<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
    leftLabel: qc.Serializer.NODE,
    middleLabel: qc.Serializer.NODE,
    rightLabel: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this, input = self.game.input;
    
    this.addListener(input.onPointerDown, self.onPointerDown, self);
    this.addListener(input.onPointerUp, self.onPointerUp, self);
};

UI.prototype.onPointerDown = function(id, x, y) {
    var self = this,
        input = self.game.input;
    
    var pointer = input.getPointer(id);
    if (pointer.isMouse) {
        if (pointer.id === qc.Mouse.BUTTON_LEFT) {
            self.leftLabel.text = 'Left Button: true';
        }
        else if (pointer.id === qc.Mouse.BUTTON_MIDDLE) {
            self.middleLabel.text = 'Middle Button: true';
        }
        else if (pointer.id === qc.Mouse.BUTTON_RIGHT) {
            self.rightLabel.text = 'Right Button: true';
        }
    }
};

UI.prototype.onPointerUp = function(id, x, y) {
    var self = this,
        input = self.game.input;
    
    var pointer = input.getPointer(id);
    if (pointer.isMouse) {
        if (pointer.id === qc.Mouse.BUTTON_LEFT) {
            self.leftLabel.text = 'Left Button: false';
        }
        else if (pointer.id === qc.Mouse.BUTTON_MIDDLE) {
            self.middleLabel.text = 'Middle Button: false';
        }
        else if (pointer.id === qc.Mouse.BUTTON_RIGHT) {
            self.rightLabel.text = 'Right Button: false';
        }
    }
};
```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)