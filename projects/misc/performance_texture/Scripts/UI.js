var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    // fields need to be serialized
    texturePrefab: qc.Serializer.PREFAB,
    btn1000: qc.Serializer.NODE,
    root: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    self.obs = [];
    for (var i = 0; i < 200; i++) {
        var o = this.game.add.clone(self.texturePrefab, self.root);    
        o.x = self.game.math.random(0, self.game.width);
        o.y = self.game.math.random(0, self.game.height);
        self.obs.push(o);
    }
    self.root.static = true;
    
    self.count = 200;
    self.addListener(self.btn1000.onClick, function() {
        if (self.count >= 1000) return;
        // add 800 
        for (var i = 0; i < 800; i++) {
            var o = self.game.add.clone(self.texturePrefab, self.root);    
            o.x = self.game.math.random(0, self.game.width);
            o.y = self.game.math.random(0, self.game.height);
            self.obs.push(o);
        }
        self.count = 1000;
        alert('add complete!');
    });
};

UI.prototype.update = function() {
    for (var i = 0; i < this.count; i++) {
        this.obs[i].rotation += 0.15;
    }
};
