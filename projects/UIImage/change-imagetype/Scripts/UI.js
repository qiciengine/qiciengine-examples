var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    clue: qc.Serializer.NODE
});

UI.prototype.onClick = function() {
    var types = {
       Simple: qc.UIImage.IMAGE_TYPE_SIMPLE,
       Sliced: qc.UIImage.IMAGE_TYPE_SLICED,
       Tiled: qc.UIImage.IMAGE_TYPE_TILED
    };
    var r = this.game.math.random(0, 2);
    var type = 'Simple';
    if (r === 0) type = 'Sliced';
    else if (r === 1) type = 'Tiled';
    
    this.gameObject.imageType = types[type];
    this.clue.text = 'ImageType: ' + type;
};