var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    clue: qc.Serializer.NODE
});

UI.prototype.onClick = function() {
    this.gameObject.pivotX = Math.random(0, 1).toFixed(2);
    this.gameObject.pivotY = Math.random(0, 1).toFixed(2);
    
    this.clue.text = 'pivot=(' + this.gameObject.pivotX + ', ' + this.gameObject.pivotY + ')';
};