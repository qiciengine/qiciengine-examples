var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    clue: qc.Serializer.NODE
});

UI.prototype.onClick = function() {
    var math = this.game.math,
        o = this.gameObject;
    var minX = math.random(0, 5)/10,
        minY = math.random(0, 5)/10,
        maxX = math.random(6, 10)/10,
        maxY = math.random(6, 10)/10;
    o.setAnchor(new qc.Point(minX, minY), new qc.Point(maxX, maxY), false);
    o.left = o.right = o.top = o.bottom = 0;
    
    this.clue.text = 'anchors=(' + minX + ', ' + minY + ') -> (' + maxX + ', ' + maxY + ')'; 
};