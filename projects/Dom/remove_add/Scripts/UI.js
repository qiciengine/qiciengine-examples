var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    // fields need to be serialized
    removeBtn: qc.Serializer.NODE,
    addBtn: qc.Serializer.NODE,
    removeAllBtn: qc.Serializer.NODE,
    
    child1: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    
    self.addListener(self.removeBtn.onClick, self.onRemove, self);
    self.addListener(self.addBtn.onClick, self.onAdd, self);
    self.addListener(self.removeAllBtn.onClick, self.onRemoveAll, self);
};

UI.prototype.onRemove = function() {
    if (this.child1.parent)
        this.gameObject.removeChild(this.child1);
};

UI.prototype.onAdd = function() {
    if (this.child1.parent) return;
    this.gameObject.addChild(this.child1);
};

UI.prototype.onRemoveAll = function() {
    this.gameObject.removeChildren();
};

