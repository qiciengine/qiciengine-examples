# 滚动视图（带滚动条）

* 本范例演示滚动视图的使用。效果图如下：<br>
![](images\UI.png)

## UI

* 首先创建一个ScrollView，用来显示演示的贴图。如下图：<br>
![](images\scrollview.png)<br><br>
* 创建一个ScrollBar，配合ScrollView滚动显示贴图。设置ScrollBar以右侧中心点对齐，可交互，垂直方向滚动。如下图：<br>
![](images\scrollbar.png)<br><br>
* 设置视图滚动为垂直滚动，即在Vertical属性打钩，将ScrollBar设置到ScrollBarV的属性上，由ScrollBar控制显示视图。如下图：<br>
![](images\scrollbarv.png)<br><br>
* 创建一个Text作为scrollPos，用来显示当前滚动条的比例。如下图：<br>
![](images\text.png)<br><br>
* 创建一个Button作为SetPosBtn，点击按钮触发随机设置滚动条的比例值事件。
* 创建一个Button作为Horizontal，点击按钮激活ScrollView的水平方向滚动。如下图：<br>
![](images\scrollviewh.png)<br><br>
* 创建脚本ScrollBarTest.js，负责滚动条的比例和激活视图水平方向滚动的逻辑。脚本挂在ScrollView的节点上。如下图：<br>
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
	
	// 随机设置当前滚动条的比例
    self.posbtn.onClick.add(function() {
        self.gameObject.verticalNormalizedPosition = Math.random();
    });
	
	// 激活水平方向滚动
    self.horizontalBtn.onClick.add(function() {
        self.gameObject.canHorizontal = true;
    });
};
```
