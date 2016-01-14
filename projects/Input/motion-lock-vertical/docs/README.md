# dragLockVertical

* 实例演示拖动图片垂直方向移动。效果图如下：<br>
![](images\UI.gif)

## UI

* 在新建场景中创建一个UIImage作为darkwing，用来显示拖动的图片。
* 在根节点下创建一个UIText，用来提示操作内容。
* 创建脚本UI.js，负责拖动图片水平方向移动的逻辑。脚本挂在darkwing节点上。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.onDrag = function(e) {
    // drag Y only.
	var pt = this.gameObject.getWorldPosition();
    pt.y += e.source.deltaY;
    var localPt = this.gameObject.parent.toLocal(pt);
    this.gameObject.y = localPt.y;
};
```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)