// define a user behaviour
var Timer = qc.defineBehaviour('qc.engine.Timer', qc.Behaviour, function() {
    // need this behaviour schedule in editor
    //this.runInEditor = true;
}, {
    // fields need to serialize
});

// Awake is called when the script instance is being loaded.
Timer.prototype.awake = function() {
    var self = this;
    var count = 0;
    self.game.timer.loop(1000, function() {
        count++;
        self.gameObject.text = 'timer count: ' + count;
    });
};

