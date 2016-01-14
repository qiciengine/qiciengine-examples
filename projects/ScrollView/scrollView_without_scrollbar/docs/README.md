# 滚动视图（无滚动条）

* 本范例介绍无滚动条的滚动视图。<br>
![](images\UI.png)

## UI

* 首先创建一个ScrollView，用来显示演示的视图。设置视图的滚动方式为垂直滚动。如下图：<br>
![](images\scrollview.png)
* 创建一个Text作为scrollPos，用来显示当前滚动的比例值。如下图：<br>
![](images\scrollPos.png)
* 创建一个Button作为SetPosBtn，点击按钮触发随机设置当前滚动的比例值。通过设置ScrollView垂直方向的Value值，从而改变滚动视图的显示。如下图：<br>
![](images\scrollviewv.png)
* 创建一个Button作为horizontal，点击按钮激活滚动视图水平方向滚动的事件。通过设置ScrollView的Horizontal属性，激活水平方向滚动。如下图：<br>
![](images\scrollviewh.png)
* 创建脚本ScrollBarTest.js，负责当前滚动视图的比例值和激活视图水平方向滚动的逻辑。脚本挂在ScrollView的节点上。如下图：<br>
![](images\test.png)<br>

代码如下：<br>

```javascript
var ScrollBarTest = qc.defineBehaviour('qc.demo.ScrollBarTest', qc.Behaviour, function() {
    this.label = null;
    this.posbtn = null;
    this.horizontalBtn = null;
}, {
    label: qc.Serializer.NODE,
    posbtn: qc.Serializer.NODE,
    horizontalBtn: qc.Serializer.NODE
});

ScrollBarTest.prototype.awake = function() {
    var self = this;
    self.gameObject.onValueChange.add(function(v) {
        console.log('Value Change.', v);
        self.label.text = 'ScrollPos:' + self.gameObject.verticalNormalizedPosition.toFixed(2);
    });

    self.posbtn.onClick.add(function() {
        self.gameObject.verticalNormalizedPosition = Math.random();
    });

    self.horizontalBtn.onClick.add(function() {
        self.gameObject.canHorizontal = true;
    });
};
```


