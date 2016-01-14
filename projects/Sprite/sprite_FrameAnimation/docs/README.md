# 帧动画

* 本范例演示播放帧动画和暂停播放帧动画。效果图如下：<br>
![](images\UI.gif)
* 创建一个Sprite，用来播放帧动画。将动画拖拽到屏幕中显眼的位置，方便与观察，并设置为可交互。如下图：<br>
![](images\sprite.png)
* 创建脚本FrameAnimation.js，挂在Sprite的节点上，负责点击动画时暂停播放的逻辑。<br>
代码如下：<br>

```javascript
var FrameAnimaton = qc.defineBehaviour('qc.demo.FrameAnimaton', qc.Behaviour, function() {
}, {
});

FrameAnimaton.prototype.awake = function() {
    var self = this,
        sprite = self.gameObject;

    console.log('Animations', sprite.animationNameList);
    console.log('Animation Type', sprite.animationType === qc.Sprite.FRAME_ANIMATION);
    console.log('Default Animation', sprite.defaultAnimation);
};

FrameAnimaton.prototype.onClick = function() {
    if (this.gameObject.isPlaying) {
        console.log('Stop playing.');
        this.gameObject.stop();
    }
    else {
        console.log('Play');
        this.gameObject.playAnimation('run', 1, true);
    }
};

FrameAnimaton.prototype.update = function() {
    console.log('Frame', this.gameObject.frame);
};
```
---
* 创建一个Button，按钮名称设置为Pause，点击按钮触发暂停帧动画的事件。
* 创建脚本PauseBtn.js，挂在Button的节点上，负责暂停播放帧动画的逻辑。<br>
代码如下：<br>

```javascript
var PauseBtn = qc.defineBehaviour('qc.demo.PauseBtn', qc.Behaviour, function() {
    this.sprite = null;
}, {
    sprite: qc.Serializer.NODE
});

PauseBtn.prototype.onClick = function() {
    this.sprite.paused = !this.sprite.paused;
};
```

