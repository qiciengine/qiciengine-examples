var ChangeScale = qc.defineBehaviour('qc.engine.ChangeScale', qc.Behaviour, function() {
    
}, {
    scalesBtn: qc.Serializer.NODES
});

ChangeScale.prototype.awake = function() {
    var self = this;
    self.scalesBtn.forEach(function(btn) {
        self.addListener(btn.onClick, self.onChange, self);
    });
};

ChangeScale.prototype.onChange = function(btn) {
    var scale = btn.name * 1;
    this.game.time.timeScale = scale;
    
    this.scalesBtn.forEach(function(b) {
        b.colorTint = new qc.Color(btn !== b ? 0xffffff : 0x5784F7);
    });
};
