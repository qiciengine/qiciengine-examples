# DisableChangeTexture

* 实例演示按钮不可用时自动改变背景贴图。效果图如下：<br>
![DisableChangeTexture](images\UI.gif)

## UI

* 在新建场景中创建一个Button，设置按钮正常、点击、不可用时的背景贴图，如下图：<br>
![bg](images\bg.png)
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