/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var AudioSprite = qc.defineBehaviour('qc.demo.AudioSprite', qc.Behaviour, function() {
    this.audio = null;
    this.markerStart = 0;
    this.markerDuration = 1;
}, {
    audio: qc.Serializer.AUDIO,
    markerStart: qc.Serializer.NUMBER,
    markerDuration: qc.Serializer.NUMBER
});

AudioSprite.prototype.onClick = function() {
    var sound = this.game.add.sound();
    sound.audio = this.audio;
    sound.addMarker(this.markerStart, this.markerDuration, 0.9);
    sound.destroyWhenStop = true;
    sound.play();
};