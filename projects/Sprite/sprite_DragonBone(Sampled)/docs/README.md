# 骨骼动画

* 本范例介绍骨骼动画。如下图：<br>
![](images\UI.gif)

## UI

* 首先创建两个Button分别为Pause和Jump，用来触发暂停动画和动画跳跃事件。
* 创建一个Sprite组件，将导入的DragonBone骨骼动画texture.bin设置到Texture属性上。此时，在Sprite节点下会自动生成dragonBoy节点。如下图：<br>
![](images\UI.png) 
* 在Sprite的节点上添加TweenPosition组件，用来设置动画跳起的高度和落下的时间。如下图：<br>     
![](images\tween.png)      

* 创建脚本DragonBone.js脚本，挂在Sprite节点上。负责点击Pause和Jump事件的响应逻辑。<br>
代码如下：<br>

```javascript
var DragonBone = qc.defineBehaviour('qc.demo.DragonBone', qc.Behaviour, function() {
    this.pauseBtn = null;
    this.jumpBtn = null;
}, {
    pauseBtn: qc.Serializer.NODE,
    jumpBtn: qc.Serializer.NODE
});

DragonBone.prototype.awake = function() {
    var self = this,
        sprite = self.gameObject;

    console.log('Animations', sprite.animationNameList);
    console.log('Animation Type', sprite.animationType === qc.Sprite.DRAGON_BONES);
    console.log('Default Animation', sprite.defaultAnimation);

    // 绑定按钮的事件处理
    self.pauseBtn.onClick.add(function() {
        sprite.paused = !sprite.paused;
    });
    self.jumpBtn.onClick.add(self.onJump, self);
};

DragonBone.prototype.onClick = function() {
    if (this.gameObject.isPlaying) {
        console.log('Stop playing.');
        this.gameObject.stop();
    }
    else {
        console.log('Play');
        this.gameObject.playAnimation('stand', 1, true);
    }
};

DragonBone.prototype.onJump = function() {
    var tp = this.getScript('qc.TweenPosition');
    var sprite = this.gameObject;
    tp.resetToBeginning();
    tp.onFinished.addOnce(function() {
        sprite.playAnimation('fallEnd');
    });
    tp.playForward();
    sprite.playAnimation('jump');
};
```