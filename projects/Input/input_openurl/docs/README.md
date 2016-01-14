# 弹出链接

* 本范例演示通过点击按钮，弹出链接。如下图：<br>
![](images\UI.gif)
* 在新建场景中创建一个Button，用来触发弹出链接事件。
* 创建脚本InputTest.js，负责打开新的链接。脚本挂在Button节点上。
代码如下：<br>

```javascript
var InputTest = qc.defineBehaviour('qc.demo.InputTest', qc.Behaviour, function() {
    // 直接使用浏览器事件，防止弹出窗口被浏览器拦截
    this.game.input.nativeMode = true;
}, {
});

InputTest.prototype.onClick = function() {
    window.open('http://www.qiciengine.com')
};
```
