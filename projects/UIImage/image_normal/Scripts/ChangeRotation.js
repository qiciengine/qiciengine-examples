/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var ChangeRotation = qc.defineBehaviour('qc.demo.ChangeRotation', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

ChangeRotation.prototype.onClick = function() {
    this.image.rotation = this.game.math.random(0, 360 * Math.PI);
};
