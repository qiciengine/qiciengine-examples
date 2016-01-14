/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var InputTest = qc.defineBehaviour('qc.demo.InputTest', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

InputTest.prototype.update = function() {
    if (this.game.input.isKeyDown(qc.Keyboard.LEFT)) {
        this.image.anchoredX -= 5;
    }
    if (this.game.input.isKeyDown(qc.Keyboard.RIGHT)) {
        this.image.anchoredX += 5;
    }
    if (this.game.input.isKeyDown(qc.Keyboard.UP)) {
        this.image.anchoredY -= 5;
    }
    if (this.game.input.isKeyDown(qc.Keyboard.DOWN)) {
        this.image.anchoredY += 5;
    }
};
