# dragLockHorizontal

* 实例演示拖动图片水平方向移动。效果图如下：<br>
![](images\UI.gif)

## UI

* 在新建场景中创建一个UIImage作为parsec，用来显示汽车图片。
* 在根节点下创建一个UIText，用来提示操作内容。
* 创建脚本UI.js，负责拖动图片水平方向移动的逻辑。脚本挂在parsec节点上。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.onDrag = function(e) {
    // drag X only.
	var pt = this.gameObject.getWorldPosition();
    pt.x += e.source.deltaX;
    var localPt = this.gameObject.parent.toLocal(pt);
    this.gameObject.x = localPt.x;
};

```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)