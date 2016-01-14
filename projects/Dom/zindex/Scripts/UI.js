var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    dom1: qc.Serializer.NODE,
    dom2: qc.Serializer.NODE
});

UI.prototype.onClick = function() {
	// Swap zIndex
    var zIndex = this.dom1.zIndex;
    this.dom1.zIndex = this.dom2.zIndex;
    this.dom2.zIndex = zIndex;
};
