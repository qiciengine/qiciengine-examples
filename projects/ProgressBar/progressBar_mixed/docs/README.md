# 进度条

* 本范例详细介绍进度条的使用。进度条分为两种：确定进度和不确定进度。从外观上，我们提供了水平进度条。垂直进度条和圆形进度条。效果图如下：<br>
![](images\UI.png)

## UI

* 首先创建一个ProgressBar作为horizontal_indeterminable。<br>
设置horizontal_indeterminable的类型为水平进度条Style:Horizontal；<br>
不确定进度类型Indeterminable打钩；<br>
每隔3秒完成一次进度播放，进度大小固定为进度条长的0.2；<br>
如下图：<br>
![](images\h.png)
* 在根节点下创建一个ProgressBar作为vertical_indeterminable。<br>
设置horizontal_indeterminable的类型为垂直进度条Style:Vertical；<br>
不确定进度类型Indeterminable打钩；<br>
每隔3秒完成一次进度播放，进度大小为当前进度的实际大小，即FixedSize为-1；<br>
如下图：<br>
![](images\v.png)
* 在根节点下创建一个ProgressBar作为circle。<br>
设置horizontal_indeterminable的类型为圆形进度条Style:Circle；<br>
不确定进度类型Indeterminable打钩；<br>
每隔3秒完成一次进度播放；<br>
起始角度0，结束角度为360。<br>
如下图：<br>
![](images\circle.png)
* 在根节点下创建一个Text作为value，用来显示当前进度条的情况。
* 在根节点下创建一个ProgressBar，设置为确定进度类型的水平进度条。如下图：<br>
![](images\progressbar.png)<br>
在根节点下创建一个InputField，用来输入进度值，控制进度条的显示。设置输入框的内容类型ContentType为Number。如下图：<br>
![](images\inputfield.png)
* 最后创建脚本ProgressBarTest.js，负责显示当前不确定进度条的水平进度条的进度值和通过输入框控制确定进度条的显示。将节点信息设置到对应的属性上，如下图：<br>
![](images\test.png)<br>
代码如下：<br>

```javascript
var ProgressBarTest = qc.defineBehaviour('qc.demo.ProgressBarTest', qc.Behaviour, function() {
    this.horizontalIndeterminable = null;
    this.progressBar = null;
    this.inputField = null;

    this.value1 = null;
}, {
    horizontalIndeterminable: qc.Serializer.NODE,
    value1: qc.Serializer.NODE,
    inputField: qc.Serializer.NODE,
    progressBar: qc.Serializer.NODE
});

ProgressBarTest.prototype.awake = function() {
    var self = this;
	
	// 进度值变化时处理 
    self.horizontalIndeterminable.onValueChange.add(function(v) {
        self.value1.text = self.horizontalIndeterminable.value.toFixed(2);
    });
	
	// 输入框值变化时处理
    self.inputField.onValueChange.add(function() {
        self.progressBar.value = self.inputField.text * 1;
    });
};
```


