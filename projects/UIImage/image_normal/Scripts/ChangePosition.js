/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var ChangePosition = qc.defineBehaviour('qc.demo.ChangePosition', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

ChangePosition.prototype.onClick = function() {
    this.image.anchoredX = this.game.math.random(0, 300);
    this.image.anchoredY= this.game.math.random(0, 300);
};
