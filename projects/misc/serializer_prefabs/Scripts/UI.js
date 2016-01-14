var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
    this.prefabs = [];
}, {
    // fields need to be serialized
    prefabs: qc.Serializer.PREFABS
});

UI.prototype.awake = function() {
    var self = this;
	var index = 0;
    self.game.timer.loop(1000, function() {
        if (self.current) {
            // destroy old one
            self.current.destroy();
            self.current = null;
        }
        
        // clone a new GameObject
        self.current = self.game.add.clone(self.prefabs[index++], self.gameObject);
        if (index >= self.prefabs.length) index = 0;
    });
};
