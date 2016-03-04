var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    // Specify type: Texture
    texture: qc.Serializer.TEXTURE
});

UI.prototype.awake = function() {
    // The texture is automatically loaded
    alert(this.texture.atlas === this.game.assets.find('Assets/texture/block.bin'));
    
    // Display it
    var o = this.game.add.image(this.gameObject);
    o.texture = this.texture;
    o.resetNativeSize();
};