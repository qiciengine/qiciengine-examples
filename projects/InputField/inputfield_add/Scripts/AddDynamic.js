/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var AddDynamic = qc.defineBehaviour('qc.demo.AddDynamic', qc.Behaviour, function() {
    this.texture = null;
}, {
    texture: qc.Serializer.TEXTURE
});

AddDynamic.prototype.awake = function() {
    var input = this.game.add.inputField(this.gameObject);
    input.anchoredX = 40;
    input.anchoredY = 40;
    input.width = 200;
    input.height = 60;
    input.lineType = qc.InputField.SINGLE_LINE;
    input.contentType = qc.InputField.STANDARD;
    input.placeholderText = 'Please input your name.';
    input.characterLimit = 20;

    // background
    input.texture = this.texture;
    input.imageType = qc.UIImage.IMAGE_TYPE_SLICED;
};
