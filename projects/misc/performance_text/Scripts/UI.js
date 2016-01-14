var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
    this.obs = [];
}, {
    textPrefab: qc.Serializer.PREFAB,
    root: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    for (var i = 0; i < 100; i++) {
        var t = self.game.add.clone(self.textPrefab, self.root);
        t.x = Math.random() * self.game.width;
        t.y = Math.random() * self.game.height;
        
        self.obs.push(t);
    }
    self.root.static = true;
};

UI.prototype.update = function() {
    for (var i = 0; i < 100; i++) {
        this.obs[i].rotation += 0.1;
    }  
};
