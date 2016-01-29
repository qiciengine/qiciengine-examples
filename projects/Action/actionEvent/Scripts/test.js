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

test.prototype.onClick = function() {
    var node = qc_game.world.find('Sprite');
    var animator = node.getScript('qc.Animator');
    animator.play();
};
