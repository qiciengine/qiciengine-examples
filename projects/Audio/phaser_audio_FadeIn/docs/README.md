# 淡入播放

* 本范例演示淡入播放声音。
* 在新建场景中创建一个Sprite，用来显示场景中的精灵动画。
* 创建脚本AudioFadeIn.js，负责启动示例淡入播放声音。脚本挂在Sprite节点上。<br>
代码如下：<br>

```
var AudioFadeIn = qc.defineBehaviour('qc.demo.AudioFadeIn', qc.Behaviour, function() {
}, {
});

AudioFadeIn.prototype.onEnable = function() {
    var self = this;
    self.game.assets.load('sound-test', 'Assets/audio/goaman_intro.mp3.bin', function(asset) {
        var sound = self.game.add.sound();
        sound.audio = asset;
        sound.fadeIn(4000);
    });
};

```