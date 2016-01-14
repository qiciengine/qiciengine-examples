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
    this.addListener(self.game.input.onPointerDown, this.onPointerDown, this);
    this.addListener(self.game.input.onPointerMove, this.onPointerMove, this);
    this.addListener(self.game.input.onPointerUp, this.onPointerUp, this);
};

InputTest.prototype.onPointerDown = function(id, x, y) {
    console.log('id', id);
    this.oldPos = new qc.Point(this.image.anchoredX, this.image.anchoredY);

    this.image.anchoredX = x;
    this.image.anchoredY = y;
    this.label.text = 'X:' + x + ', Y:' + y;
};

InputTest.prototype.onPointerMove = function(id, x, y) {
    console.log('id', id);
    this.image.anchoredX = x;
    this.image.anchoredY = y;
    this.label.text = 'X:' + x + ', Y:' + y;
};

InputTest.prototype.onPointerUp = function(id, x, y) {
    console.log('id', id);
    this.image.anchoredX = this.oldPos.x;
    this.image.anchoredY = this.oldPos.y;

    this.label.text = 'X:' + x + ', Y:' + y + ', Mouse:' + this.game.input.isMouse(id);
};
