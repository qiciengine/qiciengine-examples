/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var Mask = qc.defineBehaviour('qc.demo.Mask', qc.Behaviour, function() {
    this.background = null;
}, {
    background: qc.Serializer.NODE
});

Mask.prototype.awake = function() {
    this.addListener(this.game.input.onPointerMove, this.onMove, this);
};

Mask.prototype.onMove = function(id, x, y) {
    this.gameObject.x = x - 50;
    this.gameObject.y = y - 50;
    this.background.x = -this.gameObject.x;
    this.background.y = -this.gameObject.y;
};
