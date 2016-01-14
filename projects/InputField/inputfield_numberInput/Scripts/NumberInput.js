/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var NumberInput = qc.defineBehaviour('qc.demo.NumberInput', qc.Behaviour, function() {
    this.title = null;
}, {
    title: qc.Serializer.NODE
});

NumberInput.prototype.update = function() {
    var v = parseFloat(this.gameObject.text);
    this.title.text = '' + v;
};
