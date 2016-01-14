# childPriority

* 实例演示父子节点对输入交互事件的响应次序。效果图如下：<br>
![childPriority](images\UI.gif)

## UI

* 在新建场景中创建一个EmptyNode作为根节点。
* 在根节点下创建一个UIImage作为popup，设置节点大小为资源图片的原始大小，并设置Scale为(0,0)。
* 选中popup节点，在该节点上添加一个TweenScale组件，用来播放缩放的动画。设置缩放从0~1，周期Duration为0.5。如下图：<br>
![tween](images\tweenScale.png)
* 在popup节点下创建一个UIImage作为close，设置节点大小为资源图片的原始大小，并放大1.5倍即设置Scale(1.5,1.5)。
* 创建脚本UI.js，负责点击事件的响应。脚本挂在node节点上。将popup和close节点设置到对应的属性上。如下图：<br>
![script](images\script.png)<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
    popup: qc.Serializer.NODE,
    closeBtn: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    
    // close the popup
    this.addListener(self.closeBtn.onClick, self.closePopup, self);
    
    // drag the popup
    this.addListener(self.popup.onDrag, function(o, e) {
        var pt = o.getWorldPosition();
        pt.x += e.source.deltaX;
        pt.y += e.source.deltaY;
        var localPt = o.parent.toLocal(pt);
        o.x = localPt.x;
        o.y = localPt.y;
    });
};

UI.prototype.onClick = function() {
    var ts = this.popup.getScript('qc.TweenScale');
    if (ts.enable || this.popup.scaleX === 1) return;
    
    ts.resetToBeginning();
    ts.playForward();
};

UI.prototype.closePopup = function() {
    var ts = this.popup.getScript('qc.TweenScale');
    if (ts.enable) return;
    
    ts.resetToBeginning(true);
    ts.playReverse();
};
```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)