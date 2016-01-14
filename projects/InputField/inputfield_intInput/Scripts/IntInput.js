/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var IntInput = qc.defineBehaviour('qc.demo.IntInput', qc.Behaviour, function() {
    this.title = null;
}, {
    title: qc.Serializer.NODE
});

IntInput.prototype.update = function() {
    var v = parseInt(this.gameObject.text);
    this.title.text = '' + v;
};
