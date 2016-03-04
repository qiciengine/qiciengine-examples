var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
    this.count = 1;
}, {
    // fields need to be serialized
    content: qc.Serializer.NODE,
    itemPrefab: qc.Serializer.PREFAB
});

UI.prototype.onClick = function() {
    var self = this;
    var o = self.game.add.clone(self.itemPrefab, self.content);
    o.anchoredY = self.count * o.height;
    self.count++;
};