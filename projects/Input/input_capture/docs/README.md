# 事件捕捉

* 本范例演示事件捕捉，控制icon的交互，显示当前点击的对象。如下图：<br>
![](images\UI.png)
* 在新建场景中创建一个Image作为background。
* 在根节点下创建一个Image作为icon。
* 在根节点下创建一个Button，用来控制icon的交互性。
* 创建脚本ClickProcess.js，负责控制icon节点的Interactive的属性。<br>
脚本挂在icon节点上，并将Button节点设置到Btn属性上。如下图：<br>
![](images\icon.png)<br>
在background的节点上也挂上脚本ClickProcess.js，不用设置Btn属性。如下图：<br>
![](images\background.png)

代码如下：<br>

```javascript
var ClickProcess = qc.defineBehaviour('qc.demo.ClickProcess', qc.Behaviour, function() {
    this.btn = null;
}, {
    btn: qc.Serializer.NODE
});

ClickProcess.prototype.awake = function() {
    var self = this;
    if (!this.btn) return;
    this.btn.onClick.add(function() {
        self.gameObject.interactive = !self.gameObject.interactive;
    });
};

ClickProcess.prototype.onClick = function() {
    alert(this.name + ' Click!');
};
```
