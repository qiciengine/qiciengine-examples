var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
	// create a Button
    var node = this.game.add.button(this.gameObject);
    
    // Set texture
    node.texture = this.game.assets.find('__builtin_resource__');
    node.frame = 'button.png';
    node.name = 'StretchX2';
    node.imageType = qc.UIImage.IMAGE_TYPE_SLICED;
    
    // stretch x
    node.setAnchor(new qc.Point(0.1, 0), new qc.Point(0.9, 0));
    node.left = 10;
    node.right = 10;
    node.anchoredY = 150;
    node.height = 120;
    
    // set text's content
    node.text.text = 'Stretch-X\n' + 'Left: width*0.1 + 10\n' + 'Right: width*0.1 + 10';
    node.text.fontSize = 20;
};