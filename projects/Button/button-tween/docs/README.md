# Tween

* 实例演示按钮的交互动画。效果图如下：<br>
![Tween](images\UI.gif)

## UI

* 在新建场景中创建一个Button，点击按钮触发交互动画。
* 在Button的节点上添加一个TweenScale组件，用来显示点击按钮时，缩放按钮。设置缩放大小及时长。如下图：<br>
![Tween](images\tweenScale.png)
* 创建脚本ButtonCtr.js，负责表现按钮的交互动画。脚本挂在button节点上。代码如下：<br>

```javascript
var ButtonCtr = qc.defineBehaviour('qc.demo.ButtonCtr', qc.Behaviour, function() {
}, {
});

ButtonCtr.prototype.onDown = function() {
    var ts = this.getScript(qc.TweenScale);
    ts.stop();
    ts.resetToBeginning();
    ts.playForward();
};

ButtonCtr.prototype.onUp = function() {
    var ts = this.getScript(qc.TweenScale);
    ts.stop();
    ts.resetToBeginning(true);
    ts.playReverse();
};

```
