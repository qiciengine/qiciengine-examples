var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
    this.index = 0;
    this.values = ['hidden', 'auto', 'visible', 'scroll'];
}, {
    clue: qc.Serializer.NODE
});

UI.prototype.onClick = function() {
    this.index++;
    if (this.index >= this.values.length) this.index = 0;
    this.gameObject.overflow = this.values[this.index];
    this.clue.text = 'Click the Image to change!\noverflow=' + this.values[this.index];
};

