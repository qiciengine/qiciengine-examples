# 拉条

* 本范例详细介绍拉条的使用。拉条继承自ProgressBar，其显示等和进度条是一样的。<br>
拉条的类型跟进度条一样，分为三种：水平拉条、垂直拉条和圆形拉条。<br>
拉条在进度条的基础上增加了交互的功能。<br>
效果图如下：<br>
![](images\UI.png)

## UI

* 在新建场景中创建一个Slider作为Slider_Horizontal，用来显示水平拉条；如下图：<br>
![](images\h.png)<br>
在根节点下创建一个Text作为value，用来显示拉条的比例值。

* 在新建场景中创建一个Slider作为Slider_Vertical，用来显示垂直拉条；如下图：<br>
![](images\v.png)<br>
在根节点下创建一个Text作为value，用来显示拉条的比例值。

* 在新建场景中创建一个Slider作为Slider_circle，用来显示圆形拉条；如下图：<br>
![](images\circle.png)<br>
在根节点下创建一个Text作为value，用来显示拉条的比例值。

* 创建一个Button作为SetValue，点击按钮随机设置上面三种类型的拉条的比例值。
* 创建一个Button作为Disable，点击按钮将取消上面三种类型的拉条交互。
* 最后创建脚本SliderTest.js，负责设置拉条的比例值和取消拉条的交互，脚本挂在根节点下。将节点信息设置到对应的属性上，如下图：<br>
![](images\test.png)<br>
代码如下：<br>

```javascript   
var SliderTest = qc.defineBehaviour('qc.demo.SliderTest', qc.Behaviour, function() {
    this.btn = null;
    this.disableBtn = null;
    this.slider1 = null;
    this.slider2 = null;
    this.slider3 = null;

    this.value1 = null;
    this.value2 = null;
    this.value3 = null;
}, {
    btn: qc.Serializer.NODE,
    disableBtn: qc.Serializer.NODE,
    slider1: qc.Serializer.NODE,
    slider2: qc.Serializer.NODE,
    slider3: qc.Serializer.NODE,
    value1: qc.Serializer.NODE,
    value2: qc.Serializer.NODE,
    value3: qc.Serializer.NODE
});

SliderTest.prototype.awake = function() {
    var self = this;
    self.btn.onClick.add(function() {
        var v = self.game.math.random(0, 100);
        self.slider1.value = v;
        self.slider2.value = v;
        self.slider3.value = v;
    });

    self.disableBtn.onClick.add(function() {
        self.slider1.state = qc.UIState.DISABLED;
        self.slider2.state = qc.UIState.DISABLED;
        self.slider3.state = qc.UIState.DISABLED;
    });

    self.slider1.onValueChange.add(function(v) {
        self.value1.text = v.toFixed(2);
    });
    self.slider2.onValueChange.add(function(v) {
        self.value2.text = v.toFixed(2);
    });
    self.slider3.onValueChange.add(function(v) {
        self.value3.text = v.toFixed(2);
    });
};
```
