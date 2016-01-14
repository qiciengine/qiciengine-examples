# 暂停声音

* 本范例是演示暂停播放声音和继续播放声音。效果图如下：<br>
![](images\UI.png)
* 首先创建一个Sound，设置要播放的声音。
* 创建一个Button作为Pause，点击按钮触发暂停播放声音的事件。
* 创建一个Button作为Resume，点击按钮触发继续播放声音的事件。
* 创建脚本PauseAndResume.js，负责暂停播放和继续播放的逻辑。脚本挂在Sound的节点上。

代码如下：<br>
```
var PauseAndResume = qc.defineBehaviour('qc.demo.PauseAndResume', qc.Behaviour, function() {
    this.pauseBtn = null;
    this.resumeBtn = null;
}, {
    pauseBtn: qc.Serializer.NODE,
    resumeBtn: qc.Serializer.NODE
});

PauseAndResume.prototype.awake = function() {
    var self = this;
    self.pauseBtn.onClick.add(function() {
        self.gameObject.pause();
    });
    self.resumeBtn.onClick.add(function() {
        self.gameObject.resume();
    });
};
```