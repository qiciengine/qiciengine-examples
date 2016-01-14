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
    // 方法1：使用事件回调
    var self = this;
    this.addListener(self.game.input.onCursorMove, function(x, y) {
        console.log('Move', x, y);
        self.image.anchoredX = x;
        self.image.anchoredY = y;
    });
};

InputTest.prototype.update = function() {
    // 方法2：每帧获取
    this.label.text = 'X:' + this.game.input.cursorPosition.x +
        ', Y:' + this.game.input.cursorPosition.y;
};
