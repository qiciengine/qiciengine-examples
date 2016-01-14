var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    clue: qc.Serializer.NODE
});

UI.prototype.update = function() {
    var math = this.game.math;
    this.gameObject.x += math.random(-5, 5);
    this.gameObject.y += math.random(-5, 5);
    
    this.clue.text = 'X=' + this.gameObject.x + ';  anchoredX=' + this.gameObject.anchoredX +
        '\nY=' + this.gameObject.y + ';  anchoredY=' + this.gameObject.anchoredY;
};