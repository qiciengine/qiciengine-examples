# 状态切换

* 本范例演示控制输入框的输入状态，以确定是否可以输入。<br>
初始时输入框不可输入，输入框为灰色状态。效果图如下：<br>
![](images\UI1.png)<br>
点击Enable按钮，切换输入框的状态，输入框变为可用。效果图如下：<br>
![](images\UI2.png)<br>

## UI

* 在新建场景中创建一个InputField，设置InputField为不可输入即State为Disabled。如下图：<br>
![](images\disabled.png)<br>
* 在根节点下创建一个Button，点击按钮触发将InputField设置为可用的事件。
* 创建脚本EnableInput.js，负责切换InputField的输入状态。脚本挂在Button的节点上。<br>
代码如下：<br>

```javascript   
var EnableInput = qc.defineBehaviour('qc.demo.EnableInput', qc.Behaviour, function() {
    this.inputfield = null;
}, {
    inputfield: qc.Serializer.NODE
});

EnableInput.prototype.onClick = function() {
    this.inputfield.state = qc.UIState.NORMAL;
    this.inputfield.isFocused = true;
};
```
* 运行游戏，点击Enable按钮后，InputField节点的State属性变为Normal，如下图：<br>
![](images\normal.png)<br>