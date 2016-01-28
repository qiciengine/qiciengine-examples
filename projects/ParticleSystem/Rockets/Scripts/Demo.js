// define a user behaviour
var Demo = qc.defineBehaviour('qc.engine.Demo', qc.Behaviour, function() {
    this.prefab = null;
}, {
    playButton:qc.Serializer.NODE,
    emitterViewer:qc.Serializer.NODE
});

// Called when the script instance is being loaded.
Demo.prototype.awake = function() {
    var self = this;
	this.addListener(this.playButton.onClick, this.play, this);
    
    self.game.assets.load('rocket', 'Assets/prefab/Rocket.bin', function() {
         self.prefab = self.game.assets.find('rocket');
    });
};

Demo.prototype.play = function() {
    var self = this;
    
    if (this.prefab === null)
        return;
    
    var rocket = self.game.add.clone(this.prefab);
    var tween = rocket.getScript('qc.TweenPosition');
    tween.from.x = tween.to.x = self.game.math.random(0, self.game.width);
    tween.from.y = self.game.width + 100;
    tween.to.y = -100;
    tween.play();
	tween.onFinished.add(function() {rocket.destroyImmediately();}, self);
        
    if (self.emitterViewer)
        self.emitterViewer.getScript('qc.EmitterViewer').particleSystem = rocket.find('Particle System');
};
