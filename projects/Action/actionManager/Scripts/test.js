// define a user behaviour
var test = qc.defineBehaviour('qc.engine.test', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
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
    this.gameObject.Animator.play();
};

test.prototype.test1 = function() {
    this.gameObject.Animator.play();
};

test.prototype._test1 = function() {
    this.gameObject.Animator.play();
};