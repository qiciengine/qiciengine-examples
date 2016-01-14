# 输入框事件

* 本范例演示输入框事件。
* 在新建场景中创建一个InputField。
* 创建脚本InputEvent.js，负责输入框值变化时日志输出和定时改变输入框的State属性值。脚本挂在InputField的节点上。<br>
代码如下：<br>

```javascript   
var InputEvent = qc.defineBehaviour('qc.demo.InputEvent', qc.Behaviour, function() {
}, {
});

// 初始化
InputEvent.prototype.awake = function() {
    var self = this,
        input = self.gameObject;

	// 值改变时，输出日志“Value changed.”
    input.onValueChange.add(function() {
        console.log('Value changed.');
    });

	// State改变时，输出日志“State changed.”
    input.onStateChange.add(function() {
        console.log('State changed.');
    });

	// 定时器 每隔3秒切换State的值
    self.timer = self.game.timer.loop(3000, function() {
        if (input.state === qc.UIState.NORMAL) input.state = qc.UIState.DISABLED;
        else input.state = qc.UIState.NORMAL;
    });
};

InputEvent.prototype.onDestroy = function() {
    this.game.timer.remove(this.timer);
};
```