var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    aniPrefab: qc.Serializer.PREFAB,
    root: qc.Serializer.NODE,
    btn: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    self.count = 100;
    for (var i = 0; i < 100; i++) {
        var o = self.game.add.clone(self.aniPrefab, self.root);
        o.x = Math.random() * self.game.width - 50;
        o.y = Math.random() * self.game.height - 70;
    }
    
    self.addListener(self.btn.onClick, function() {
        if (self.count >= 800) return;
        self.count = 800;
        for (var i = 0; i < 700; i++) {
            var o = self.game.add.clone(self.aniPrefab, self.root);
            o.x = Math.random() * self.game.width - 50;
            o.y = Math.random() * self.game.height - 70;
        }
        alert('add complete.');
    });
};
