// define a user behaviour
var action = qc.defineBehaviour('qc.engine.action', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
});

// Called when the script instance is being loaded.
//action.prototype.awake = function() {
//
//};

action.prototype.testEvent = function(para) {
    console.log('action event trigger', para);
    // change color
    if (para === '1')
        this.gameObject.colorTint = qc.Color.blue;
    else if (para === '2')
        this.gameObject.colorTint = qc.Color.white;
};
