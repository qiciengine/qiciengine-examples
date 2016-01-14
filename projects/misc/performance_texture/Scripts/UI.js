var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    // fields need to be serialized
    texturePrefab: qc.Serializer.PREFAB,
    btn: qc.Serializer.NODE,
    root: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    this.obs = [];
    for (var i = 0; i < 200; i++) {
        var o = this.game.add.clone(this.texturePrefab, this.root);    
        o.x = this.game.math.random(0, 480);
        o.y = this.game.math.random(0, 800);
        this.obs.push(o);
    }
    this.root.static = true;
    
    self.addListener(self.btn.onClick, function() {
        self.game.phaser.forceSingleUpdate = false;  
    });
};

UI.prototype.update = function() {
    for (var i = 0; i < 200; i++) {
        this.obs[i].rotation += 0.15;
    }
};
