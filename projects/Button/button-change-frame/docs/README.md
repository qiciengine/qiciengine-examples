# ChangeFrame

* 实例演示按钮的事件：点击、鼠标进入和移出。

## UI

* 在新建场景中创建一个Button，表现按钮点击、鼠标进入和移出的效果。
* 创建脚本ButtonCtr.js，负责按钮事件的响应。脚本挂在button节点上。代码如下：<br>

```javascript
var ButtonCtr = qc.defineBehaviour('qc.demo.ButtonCtr', qc.Behaviour, function() {
}, {
});

ButtonCtr.prototype.awake = function() {
    var self = this;
    this.addListener(self.gameObject.onEnter, function() {
        self._isEnter = true;
        self.gameObject.frame = 'hover.png';
    });
    this.addListener(self.gameObject.onExit, function() {
        self._isEnter = false;
        self.gameObject.frame = 'normal.png';
    });
};

ButtonCtr.prototype.onClick = function() {
    alert('Click!');
};

```