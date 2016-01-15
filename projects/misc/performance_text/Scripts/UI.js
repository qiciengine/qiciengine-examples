var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
    this.obs = [];
}, {
    textPrefab: qc.Serializer.PREFAB,
    root: qc.Serializer.NODE,
    btn: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    self.count = 100;
    for (var i = 0; i < 100; i++) {
        var t = self.game.add.clone(self.textPrefab, self.root);
        t.x = Math.random() * self.game.width;
        t.y = Math.random() * self.game.height;
        
        self.obs.push(t);
    }
    self.root.static = true;
    
    self.addListener(self.btn.onClick, function() {
        if (self.count >= 400) return;
        for (var i = 0; i < 400; i++) {
            var t = self.game.add.clone(self.textPrefab, self.root);
            t.x = Math.random() * self.game.width;
            t.y = Math.random() * self.game.height;

            self.obs.push(t);
        }
        self.count = 500;
        alert('add complete.');
    });
};

UI.prototype.update = function() {
    for (var i = 0; i < this.count; i++) {
        this.obs[i].rotation += 0.1;
    }  
};
