// define a user behaviour
var Test = qc.defineBehaviour('qc.engine.Test', qc.Behaviour, function() {
    var input = this.game.input,
        self = this;
    
    this.addListener(input.onPointerDown, self.doOnMove, self);
    this.addListener(input.onPointerMove, self.doOnMove, self);
    
    // need this behaviour be scheduled in editor
    this.runInEditor = true;
}, {
    bgImage: qc.Serializer.NODE,
    particleSystem: qc.Serializer.NODE
});

// Called when the script instance is being loaded.
Test.prototype.awake = function() {
    if (this.bgImage)
		this.bgImage.phaser.blendMode = Phaser.blendModes.MULTIPLY;
};

Test.prototype.doOnMove = function(id, x, y) {
    if (this.particleSystem) {
        this.particleSystem.x = x;
		this.particleSystem.y = y;
    }
};
