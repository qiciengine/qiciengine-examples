# DomZindex

* 实例演示DomZindex的使用。效果图如下：<br>
![DomZindex](images\UI.gif)

## UI

* 在新建场景中创建两个Dom节点，分别为dom1和dom2，用来显示两张不同的贴图。设置dom1的Zindex为1，ClassName为img1；dom2的Zindex为2，ClassName为img2。
* 创建一个Button，点击按钮互换dom1和dom2的Zindex值。
* 在Assets/css/目录下创建脚本style.css，配置dom1和dom2的背景贴图。代码如下：<br>

```javascript
/* css for dom */
.img1 {
    background: url("../raw/d6.png") no-repeat;
}
.img2 {
    background: url("../raw/icon.png") no-repeat;
}
```
* 创建脚本UI.js，负责响应点击事件。脚本挂在Button的节点上。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    dom1: qc.Serializer.NODE,
    dom2: qc.Serializer.NODE
});

UI.prototype.onClick = function() {
	// Swap zIndex
    var zIndex = this.dom1.zIndex;
    this.dom1.zIndex = this.dom2.zIndex;
    this.dom2.zIndex = zIndex;
};

```