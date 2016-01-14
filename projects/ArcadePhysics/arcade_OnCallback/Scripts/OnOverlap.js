/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var OnOverlap = qc.defineBehaviour('qc.demo.OnOverlap', qc.Behaviour, function() {
    this.clue = null;
}, {
    clue: qc.Serializer.NODE
});

OnOverlap.prototype.onOverlap = function(o1, o2) {
    this.clue.visible = true;
};
