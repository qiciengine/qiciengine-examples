/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

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
    this.addListener(sound.onLoop, self.hasLooped, this);
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
