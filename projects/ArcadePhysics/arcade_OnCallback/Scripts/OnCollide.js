/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var OnCollide = qc.defineBehaviour('qc.demo.OnCollide', qc.Behaviour, function() {
    this.clue = null;
}, {
    clue: qc.Serializer.NODE
});

OnCollide.prototype.onCollide = function(o1, o2) {
    this.clue.visible = true;
};
