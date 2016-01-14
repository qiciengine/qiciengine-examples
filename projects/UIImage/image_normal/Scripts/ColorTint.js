/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var ColorTint = qc.defineBehaviour('qc.demo.ColorTint', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

ColorTint.prototype.onClick = function() {
    this.image.colorTint = new qc.Color(this.game.math.random(0xff000000, 0xffffffff));
};
