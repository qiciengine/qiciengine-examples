# DisableChangeColor

* 实例演示按钮不可用时自动改变混合色。效果图如下：<br>
![DisableChangeColor](images\UI.gif)

## UI

* 在新建场景中创建一个Button，设置按钮正常、点击、不可用时的颜色，如下图：<br>
![color](images\color.png)
* 创建脚本ButtonCtr.js，负责点击按钮后使按钮不可用的逻辑。脚本挂在button节点上。<br>
代码如下：<br>

```javascript
var ButtonCtr = qc.defineBehaviour('qc.demo.ButtonCtr', qc.Behaviour, function() {
}, {
});

ButtonCtr.prototype.onClick = function() {
    // Disable the button.
    this.gameObject.state = qc.UIState.DISABLED;
};
```