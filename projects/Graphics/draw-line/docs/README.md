# 绘图

* 实例演示如何使用Graphics节点画线。效果图如下：<br>
![drawLine](images\UI.png)

## UI

* 在新建场景中创建一个Graphics节点。
* 创建脚本UI.js，负责绘制节点的内容。代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
    this.runInEditor = true;
}, {
});

UI.prototype.awake = function() {
    var graphics = this.gameObject;
    graphics.beginFill(0xFF3300);
    graphics.lineStyle(10, 0xffd900, 1);
    graphics.lineTo(250, 50);
    graphics.lineTo(100, 100);
    graphics.lineTo(250, 220);
    graphics.lineTo(50, 220);
    graphics.lineTo(50, 50);
    graphics.endFill();
};
```