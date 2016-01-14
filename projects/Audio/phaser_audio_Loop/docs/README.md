# 循环播放声音

* 本范例演示循环播放一组声音。效果图如下：<br>
![](images\UI.png)
* 首先创建一个Text作为title，用来显示当前播放的是哪个声音。
* 创建一个Image作为Speaker，用来显示音响的贴图。在Speaker的节点上添加一个TweenScale组件，用来设置音响放大缩小，使音响具有动感的效果。如下图：<br>
![](images\scale.png)
* 创建脚本SoundLoop.js，负责循环播放一组声音的逻辑，脚本挂在Speaker节点上。如下图：<br>
![](images\soundloop.png)


SoundLoop.js代码如下：<br>

```
var SoundLoop = qc.defineBehaviour('qc.demo.SoundLoop', qc.Behaviour, function() {
    this.titleLabel = null;
    this.sounds = [];
    this.loopCount = 0;
}, {
    titleLabel: qc.Serializer.NODE,
    sounds: qc.Serializer.AUDIOS
});

/**
 * 脚本初始化处理：动态加载图片并显示
 */
SoundLoop.prototype.awake = function() {
    var self = this;
    var sound = self.game.add.sound();
    sound.destroyWhenStop = false;
    sound.audio = self.sounds[0];
    sound.loop = true;
    sound.volume = 0.6;
    sound.play();
    sound.onLoop.add(self.hasLooped, this);
    self.titleLabel.text = sound.audio.url;
};

SoundLoop.prototype.hasLooped = function() {
    var self = this;
    self.loopCount++;
    console.log('looped', self.loopCount);

    if (self.loopCount === 1) {
        // Play Drums
        var sound = self.game.add.sound();
        sound.audio = self.sounds[1];
        sound.loop = true;
        sound.volume = 0.6;
        self.titleLabel.text = sound.audio.url;
        sound.play();

        var ts = self.getScript('qc.TweenScale');
        ts.playForward();
        console.log('Play', sound.audio);
    }
    else if (self.loopCount >= 2) {
        var current = self.current;
        if (current) {
            current.stop();
        }
        else {
            self.current = current = self.game.add.sound();
            current.loop = true;
        }
        current.audio = self.sounds[self.game.math.random(2, self.sounds.length - 1)];
        current.play();
        self.titleLabel.text = current.audio.url;
        console.log('Play', current.audio);
    }
};

```