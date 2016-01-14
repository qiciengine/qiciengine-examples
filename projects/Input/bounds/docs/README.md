# dragBounds

* 实例演示在指定边框内任意拖动图片。效果图如下：<br>
![drawBounds](images\UI.gif)

## UI

* 在新建场景中创建一个UIImage作为background，设置节点大小为资源图片的原始大小。
* 在根节点下创建一个UIImage作为drag，设置节点大小为资源图片的原始大小。
* 创建脚本UI.js，负责拖动图片的事件。脚本挂在drag节点下，并将background节点设置到Bounds属性上。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
    // Can not go beyound this boundaries
    this.bounds = null;
}, {
    bounds: qc.Serializer.NODE
});

UI.prototype.onDragStart = function(e) {
    // calc the minX, minY, maxX, minY
    this.minX = this.bounds.x - this.bounds.width/2 + this.gameObject.width/2;
    this.minY = this.bounds.y - this.bounds.height/2 + this.gameObject.height/2;
    this.maxX = this.minX + this.bounds.width - this.gameObject.width;
    this.maxY = this.minY + this.bounds.height - this.gameObject.height;
    
    this.drag = true;
};

UI.prototype.onDrag =function(e) {
    var self = this, o = self.gameObject;
    if (!self.drag) return;
    
    var pt = o.getWorldPosition();
    pt.x += e.source.deltaX;
    pt.y += e.source.deltaY;
    
    var localPt = o.parent.toLocal(pt);
    if (localPt.x < self.minX) localPt.x = self.minX;
    if (localPt.y < self.minY) localPt.y = self.minY;
    if (localPt.x > self.maxX) localPt.x = self.maxX;
    if (localPt.y > self.maxY) localPt.y = self.maxY;
    o.x = localPt.x;
    o.y = localPt.y;
};

UI.prototype.onDragEnd = function(e) {
   this.drag = false;  
};

```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)