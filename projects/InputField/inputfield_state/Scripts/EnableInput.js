/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var EnableInput = qc.defineBehaviour('qc.demo.EnableInput', qc.Behaviour, function() {
    this.inputfield = null;
}, {
    inputfield: qc.Serializer.NODE
});

EnableInput.prototype.onClick = function() {
    this.inputfield.state = qc.UIState.NORMAL;
    this.inputfield.isFocused = true;
};