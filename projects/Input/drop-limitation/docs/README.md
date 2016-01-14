# dropLimitation

* 实例演示拖动方块到指定的分组中。效果图如下：<br>
![dropLimitation](images\UI.gif)

# UI

* 在新建场景中创建6个UIImage，分别命名为1~6。依次排列，并设置各个UIImage节点的图片。
* 创建一个两个Text分别为left和right,用来显示两组的标题。
* 创建脚本UI.js，负责拖动方块到指定分组的逻辑。在1~6的节点中分别挂上UI.js。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
    this.angle = 0;
}, {
});

UI.prototype.onDrag = function(e) {
	var pt = this.gameObject.getWorldPosition();
    pt.x += e.source.deltaX;
    pt.y += e.source.deltaY;
    var localPt = this.gameObject.parent.toLocal(pt);
    this.gameObject.x = localPt.x;
    this.gameObject.y = localPt.y;
};

UI.prototype.onDragEnd = function(e) {
    var x = this.gameObject.x,
        y = this.gameObject.y;
    
    // Move the items when it is already dropped.
    this.gameObject.x = Math.round(x / 90) * 90;
    this.gameObject.y = Math.round(y / 90) * 90;

    // 限制 x 在 90、180、270、360 这四档当中运动
    this.gameObject.x = Math.max(90, Math.min(360, this.gameObject.x));
};

```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)