/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var TelInput = qc.defineBehaviour('qc.demo.TelInput', qc.Behaviour, function() {
    this.title = null;
}, {
    title: qc.Serializer.NODE
});

TelInput.prototype.update = function() {
    this.title.text = this.gameObject.text;
};
