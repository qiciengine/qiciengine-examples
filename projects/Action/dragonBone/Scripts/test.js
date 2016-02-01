// define a user behaviour
var test = qc.defineBehaviour('qc.engine.test', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
});

// Called when the script instance is being loaded.
test.prototype.awake = function() {
    var node = this.gameObject.game.world.find('node');
	var tweenPosition = node.getScript('qc.TweenPosition');
    this.addListener(tweenPosition.onFinished, this.onFinish, this);
};

// Called every frame, if the behaviour is enabled.
//test.prototype.update = function() {
//
//};
test.prototype.onClick = function() {
    var node = this.gameObject.game.world.find('node');
    var animator = node.getScript('qc.Animator');
    var tweenPosition = node.getScript('qc.TweenPosition');
    tweenPosition.playForward(true);
    animator.play();
};

test.prototype.onFinish = function() {
    var node = this.gameObject.game.world.find('node');
    var animator = node.getScript('qc.Animator');
    animator.stop();
    
};