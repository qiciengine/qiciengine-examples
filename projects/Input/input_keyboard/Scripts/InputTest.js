/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var InputTest = qc.defineBehaviour('qc.demo.InputTest', qc.Behaviour, function() {
    this.image = null;
    this.label = null;
    this.label2 = null;
}, {
    image: qc.Serializer.NODE,
    label: qc.Serializer.NODE,
    label2: qc.Serializer.NODE
});

InputTest.prototype.awake = function() {
    var self = this;

    self.addListener(self.game.input.onKeyDown, this.onKeyDown, this);
    self.addListener(self.game.input.onKeyUp, this.onKeyUp, this);
    self.addListener(self.game.input.onKeyRepeat, this.onKeyRepeat, this);
};

InputTest.prototype.onKeyDown = function(key) {
    var input = this.game.input;

    console.log('KeyDown', key);
    this.image.scaleY = 0.5;

    if (input.isAltDown() || input.isControlDown() || input.isShiftDown() ||
        input.isMetaDown())
        this.image.rotation = Math.PI;
};

InputTest.prototype.onKeyUp = function(key) {
    console.log('KeyUp', key);

    this.image.scaleY = 1;
    this.image.rotation = 0;
};

InputTest.prototype.onKeyRepeat = function(key) {
    console.log('KeyRepeat', key);

    this.label.text = 'KeyRepeat:' + key;
};

InputTest.prototype.update = function() {
    var content = '';
    var input = this.game.input;

    if (input.isKeyDown(qc.Keyboard.SPACEBAR)) {
        content += 'SpaceBar Down.\n';
    }
    content += 'isAnyKeyDown:' + input.isAnyKeyDown() + '\n';
    content += 'isAnyKey:' + input.isAnyKey() + '\n';

    this.label2.text = content;
};
