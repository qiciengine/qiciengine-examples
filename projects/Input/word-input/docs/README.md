# worldInput

* 实例演示键盘keyDown事件中的keyCode参数值。效果图如下：<br>
![worldInput](images\UI.png)

## UI

* 在新建场景中创建一个UIText节点，负责显示当前键盘keyDown的keyCode参数值。
* 创建脚本UI.js，负责显示键盘keyDown事件中的keyCode参数值。脚本挂在UIText节点上。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
    var self = this,
        input = self.game.input;
    this.addListener(input.onKeyDown, self.onKeyDown, self);
};

UI.prototype.onKeyDown = function(keyCode) {
    this.gameObject.text += ' ' + keyCode;  
};
```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)