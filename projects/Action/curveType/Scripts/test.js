// define a user behaviour
var test = qc.defineBehaviour('qc.engine.test', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
    this.actionName = '';
}, {
    // fields need to be serialized
    actionName : qc.Serializer.STRING
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
    var node = this.gameObject.game.world.find('Sprite');
    var animator = node.getScript('qc.Animator');
    var action = animator.getAction(this.actionName);
    
    if (this.actionName === 'tweenRelative')
    {
        // It support to modify dynamically from、to for tween type.
        action.setData('/', qc.PROP_POSITON, 'x', { to : this.gameObject.game.math.random(100, 1000)});
        action.setData('/', qc.PROP_POSITON, 'y', { to : this.gameObject.game.math.random(100, 500)});
    }
    else if (this.actionName === 'tweenAbsolute')
    {
        // It support to modify dynamically from、to for tween type.
        action.setData('/', qc.PROP_POSITON, 'x', { to : this.gameObject.game.math.random(100, 1000),
                                                      from : 500});
        action.setData('/', qc.PROP_POSITON, 'y', { to : this.gameObject.game.math.random(100, 500),
                                                      from : 300});
    }
    animator.play(this.actionName);
};
