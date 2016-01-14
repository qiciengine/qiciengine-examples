# pointerOver

* 实例演示鼠标和触摸移入、移出的事件响应。效果图如下：<br>
![pointerOver](images\UI.gif)

## UI

* 在新建场景中创建一个UIImage作为bunny，用来显示鼠标移入和移出的效果变化。
* 创建脚本UI.js，负责鼠标和触摸移入、移出时改变bunny节点的透明度。脚本挂在bunny节点上。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
    var self = this, o = self.gameObject;
    this.addListener(this.gameObject.onEnter, function() {
        o.alpha = 1;
    });
    this.addListener(this.gameObject.onExit, function() {
        o.alpha = 0.5;
    });
};
```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)