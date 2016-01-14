var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    buttonTexture: qc.Serializer.TEXTURE
});

UI.prototype.awake = function() {
    // Create button6 by script.
    var button = this.game.add.button(this.gameObject);
    button.name = 'button6';
    button.texture = this.buttonTexture;
    button.frame = 'button_sprite_sheet_02.png';
    button.resetNativeSize();
    button.text.visible = false;
    button.pivotX = 0.5;
    button.pivotY = 0.5;
    button.anchoredX = 570;
    button.anchoredY = 200;
    button.rotation = 32 * Math.PI / 180;
    button.scaleX = 2;
    button.scaleY = 2;
    
    // add script
    var c = button.addScript('qc.demo.ButtonCtr');
    c.background = this.gameObject.find('background');
    this.game.assets.load('sky6', 'Assets/texture/toxic.bin', function(texture) {
        c.backgroundTexture = texture;    
    });
};
