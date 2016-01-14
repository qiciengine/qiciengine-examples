var SoundCtr = qc.defineBehaviour('qc.engine.SoundCtr', qc.Behaviour, function() {
}, {
    // fields need to be serialized
    backgroundMusic: qc.Serializer.STRING
});

SoundCtr.prototype.awake = function() {
    var self = this;
    
    // Downloads the background music file and play it
    self.game.assets.load(self.backgroundMusic, function(music) {
        if (!music) return;
        var sound = self.game.add.sound(self.gameObject);
        sound.name = 'background music';
        sound.audio = music;
        sound.loop = true;
        sound.play();
    });
};
