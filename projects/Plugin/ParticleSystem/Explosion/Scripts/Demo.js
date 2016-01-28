// define a user behaviour
var Demo = qc.defineBehaviour('qc.engine.Demo', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    playButton:qc.Serializer.NODE,
    sparkleViewer:qc.Serializer.NODE,
    smokeViewer:qc.Serializer.NODE
});

// Called when the script instance is being loaded.
Demo.prototype.awake = function() {
	this.addListener(this.playButton.onClick, this.play, this);
};

Demo.prototype.play = function() {
    var self = this;
    self.game.assets.load('explosion', 'Assets/prefab/explosion.bin', function() {
        var prefab = self.game.assets.find('explosion');
        var particleSystem = self.game.add.clone(prefab);
        
        if (self.sparkleViewer) {
            self.sparkleViewer.getScript('qc.EmitterViewer').particleSystem = particleSystem.find('sparkle');
        }
        
        if (self.smokeViewer) {
            self.smokeViewer.getScript('qc.EmitterViewer').particleSystem = particleSystem.find('smoke');
        }
    });
};
