var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
    textures: qc.Serializer.TEXTURES,
    dropdown: qc.Serializer.NODE
});

UI.prototype.onClick = function() {
    var self = this;
    var i = self.game.math.random(0, self.textures.length - 1);
    var texture = self.textures[i];
    self.dropdown.addOptions([texture]);
};
