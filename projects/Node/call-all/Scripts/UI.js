var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    items: qc.Serializer.NODES
});

UI.prototype.awake = function() {
    var self = this;
    self.items.forEach(function(item) {
        self.addListener(item.onClick, self.onItemClick, self);
    });
};

UI.prototype.onItemClick = function(item) {
    // Hide the item
    item.visible = false;
};

UI.prototype.onClick = function() {
    this.items.forEach(function(item) {
        item.visible = true;
    });
};
