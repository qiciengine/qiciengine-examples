var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    spritePrefab: qc.Serializer.PREFAB,
    btn: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    self.count = 30;
    for (var i = 0; i < 30; i++) {
        var sprite = this.game.add.clone(this.spritePrefab);
        sprite.x = Math.random() * this.game.width + 50;
        sprite.y = Math.random() * this.game.height + 50;
    }
    
    self.addListener(self.btn.onClick, function() {
        if (self.count >= 200) return;
        self.count = 200;
        for (var i = 0; i < 170; i++) {
            var sprite = self.game.add.clone(self.spritePrefab);
            sprite.x = Math.random() * self.game.width + 50;
            sprite.y = Math.random() * self.game.height + 50;
        }
        alert('add complete.');
    });
};