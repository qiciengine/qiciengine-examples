var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    spritePrefab: qc.Serializer.PREFAB
});

UI.prototype.awake = function() {
    for (var i = 0; i < 30; i++) {
        var sprite = this.game.add.clone(this.spritePrefab);
        sprite.x = Math.random() * this.game.width + 50;
        sprite.y = Math.random() * this.game.height + 50;
    }
};