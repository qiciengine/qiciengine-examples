var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    clue: qc.Serializer.NODE
});

UI.prototype.onClick = function() {
    var math = this.game.math;
    this.gameObject.width = math.random(30, 200);
    this.gameObject.height = math.random(30, 200);
    
    this.clue.text = 'Size=(' + this.gameObject.width + ', ' + this.gameObject.height + ')';
};