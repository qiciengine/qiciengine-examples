# 重播声音

* 本范例演示重新播放声音。
* 首先创建一个Sound，设置要播放的声音。
* 创建一个Button作为Restart，点击按钮触发重新播放声音的事件。
* 创建脚本Restart.js，负责重新播放声音的逻辑，脚本挂在Sound的节点上。<br>

代码如下：<br>

```
var Restart = qc.defineBehaviour('qc.demo.Restart', qc.Behaviour, function() {
    this.btn = null;
}, {
    btn: qc.Serializer.NODE
});

Restart.prototype.awake = function() {
    var self = this;
    self.btn.onClick.add(function() {
        self.gameObject.stop();
        self.gameObject.play();
    });
};
```
