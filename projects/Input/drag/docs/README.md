# drag

* 实例演示Input#onDown和onDrag的使用。效果图如下：<br>
![drag](images\UI.gif)

## UI

* 在新建场景中创建一个UIImage，作为grid，设置节点大小为资源图片的原始大小。设置该节点不可交互，即Interactive不打钩。
* 在根节点下创建一个UIImage，作为atari，设置节点大小为资源图片的原始大小，并为可交互，如下图：<br>
![atari](images\atari.png)
* 创建脚本UI.js，负责拖动图片事件。脚本挂在atari和grid节点上。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.onDown = function(e) {
    // set position to the pointer
    var pt = new qc.Point(e.source.x, e.source.y);
    var localPt = this.gameObject.parent.toLocal(pt);
    this.gameObject.x = localPt.x;
    this.gameObject.y = localPt.y;
};

UI.prototype.onDrag = function(e) {
	var pt = this.gameObject.getWorldPosition();
    pt.x += e.source.deltaX;
    pt.y += e.source.deltaY;
    var localPt = this.gameObject.parent.toLocal(pt);
    this.gameObject.x = localPt.x;
    this.gameObject.y = localPt.y;
};

```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)