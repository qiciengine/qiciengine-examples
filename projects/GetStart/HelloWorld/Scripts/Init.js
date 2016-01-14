var Init = qc.defineBehaviour('qc.helloworld.Init', qc.Behaviour, function() {

}, {
});

Init.prototype.awake = function() {
	// create a text
    var node = this.game.add.text(this.gameObject);
    node.text = 'Hello World!';
    node.color = new qc.Color(0xffffff);
    
    // center the text
    node.pivotX = 0.5;
    node.pivotY = 0.5;
    node.x = this.gameObject.width/2;
    node.y = this.gameObject.height/2;
    node.alignH = qc.UIText.CENTER;
};
