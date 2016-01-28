// define a user behaviour
var action = qc.defineBehaviour('qc.engine.action', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
    this.id = 0;

    
}, {
    // fields need to be serialized
});

// Called when the script instance is being loaded.
//action.prototype.awake = function() {
//
//};

Object.defineProperties(action.prototype, {
    x : {
        get : function() { return 1; },
    }
})
// Called every frame, if the behaviour is enabled.
action.prototype.update = function() {
    //console.log('action script update');
};

action.prototype.testEvent = function(para) {
    console.log('action testEvent', para, this.gameObject);
}
