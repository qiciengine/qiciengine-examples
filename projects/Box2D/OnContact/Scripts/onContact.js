// define a user behaviour
var onContact = qc.defineBehaviour('qc.engine.onContact', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
    textNode : qc.Serializer.NODE
});

// Called when the script instance is being loaded.
onContact.prototype.awake = function() {
    var self = this;
	self.gameObject.body.onContact.add(function() {
        self.textNode.visible = true;
        if (self.timer) self.game.timer.remove(self.timer);

        // 定时 0.5 秒后不可见
        self.timer = self.game.timer.add(500, function() {
            self.textNode.visible = false;
            self.timer = null;
        });
    });
};
