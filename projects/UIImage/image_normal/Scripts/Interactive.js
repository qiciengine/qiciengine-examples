/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var Interactive = qc.defineBehaviour('qc.demo.Interactive', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

Interactive.prototype.onClick = function() {
    this.image.interactive = !this.image.interactive;
};
