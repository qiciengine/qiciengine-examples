# 动作事件

* 本范例演示动作播放事件和动作播放结束事件。效果图如下：<br>
![](images\UI.gif)

## UI

* 创建一个Image作为背景图background。
* 创建三个Text：StartClue、LoopClue、StopClue，分别用来显示开始播放动作事件、循环播放动作三遍、结束动作播放事件。将这三个Text节点一开始设置为不可见的。如下图：<br>
![](images\visable.png)
* 创建一个Sprite，用来播放动作。设置精灵动画，从Assets/atlas/目录中选择animation.bin。
* 创建脚本AnimationEvents.js，挂在Sprite的节点上，负责动作播放和结束事件的逻辑和背景图x轴坐标移动的逻辑。通过控制backgroundX轴坐标的变化，实现动画移动的效果。将StartClue、LoopClue、StopClue节点设置到对应的属性上，如下图：<br>
![](images\script.png)<br>
代码如下：<br>

```javascript
var AnimationEvents = qc.defineBehaviour('qc.demo.AnimationEvents', qc.Behaviour, function() {
    this._count = 0;
    this.startClue = null;
    this.loopClue = null;
    this.stopClue = null;
    this.background = null;
}, {
    startClue: qc.Serializer.NODE,
    loopClue: qc.Serializer.NODE,
    stopClue: qc.Serializer.NODE,
    background: qc.Serializer.NODE
});

/**
 * 初始化处理
 */
AnimationEvents.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    // 动作开始播放的事件
    o.onStart.add(function() {
        self.startClue.visible = true;
    });

    // 动作播放一轮结束
    o.onLoopFinished.add(function() {
        self.loopClue.visible = true;
        self._count++;
        self.loopClue.text = 'Animation looped*' + self._count;

        if (self._count > 2) {
            // 结束动作播放
            console.log(o.isPlaying);
            o.stop();
        }
    });

    // 动作播放结束的事件
    o.onFinished.add(function() {
        self.stopClue.visible = true;
    });

    // 开始播放动作
    o.playAnimation('run', 1.0, true);
};

/**
 * 帧调度
 */
AnimationEvents.prototype.update = function() {
    if (this.gameObject.isPlaying) {
        this.background.x--;
    }
};
```

