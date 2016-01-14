/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

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
