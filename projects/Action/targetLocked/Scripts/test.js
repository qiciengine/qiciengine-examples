// define a user behaviour
var test = qc.defineBehaviour('qc.engine.test', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
    this.playLocked = true;
}, {
    // fields need to be serialized
});

// Called when the script instance is being loaded.
//test.prototype.awake = function() {
//
//};

// Called every frame, if the behaviour is enabled.
//test.prototype.update = function() {
//
//};
test.prototype.onClick = function() {
    var animator = this.getScript('qc.Animator');
    if (this.playLocked)
    {
        animator.play('locked');
        this.playLocked = false;
    }
    else
    {
        animator.play('unlocked');
        this.playLocked = true;    
    }
};
