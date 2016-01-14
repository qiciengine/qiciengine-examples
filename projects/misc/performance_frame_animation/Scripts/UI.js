var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    aniPrefab: qc.Serializer.PREFAB,
    root: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    for (var i = 0; i < 100; i++) {
        var o = self.game.add.clone(self.aniPrefab, self.root);
        o.x = Math.random() * self.game.width - 50;
        o.y = Math.random() * self.game.height - 70;
    }
};
