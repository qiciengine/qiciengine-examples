/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var ChangePivot = qc.defineBehaviour('qc.demo.ChangePivot', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

ChangePivot.prototype.onClick = function() {
    this.image.pivotX = this.image.pivotX === 0 ? 0.5 : 0;
    this.image.pivotY = this.image.pivotY === 0 ? 0.5 : 0;
};
