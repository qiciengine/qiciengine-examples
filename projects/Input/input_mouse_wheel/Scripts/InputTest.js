/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var InputTest = qc.defineBehaviour('qc.demo.InputTest', qc.Behaviour, function() {
    this.image = null;
    this.label = null;
}, {
    image: qc.Serializer.NODE,
    label: qc.Serializer.NODE
});

InputTest.prototype.awake = function() {
    var self = this;
    this.addListener(self.game.input.onWheel, function(deltaX, deltaY) {
        self.image.anchoredX += deltaX;
        self.image.anchoredY += deltaY;
    });
};

InputTest.prototype.update = function() {
    this.label.text = 'WheelDeltaX=' + this.game.input.wheelDeltaX +
        ', WheelDeltaY=' + this.game.input.wheelDeltaY;
};
