var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
	// create a Button
    var node = this.game.add.button(this.gameObject);
    
    // Set texture
    node.texture = this.game.assets.find('__builtin_resource__');
    node.frame = 'button.png';
    node.name = 'StretchY2';
    node.imageType = qc.UIImage.IMAGE_TYPE_SLICED;
    
    // stretch x
    node.setAnchor(new qc.Point(0, 0.1), new qc.Point(0, 0.9));
    node.top = 10;
    node.bottom = 10;
    node.anchoredX = 150;
    node.width = 250;
    
    // set text's content
    node.text.text = 'Stretch-Y\n' + 'Top: height*0.1 + 10\n' + 'Bottom: height*0.1 + 10';
    node.text.fontSize = 20;
};