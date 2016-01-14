/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var ChangeSize = qc.defineBehaviour('qc.demo.ChangeSize', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

ChangeSize.prototype.onClick = function() {
    this.image.width = this.game.math.random(100, 300);
    this.image.height = this.game.math.random(100, 300);
};
