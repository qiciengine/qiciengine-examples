/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var ProgressBarTest = qc.defineBehaviour('qc.demo.ProgressBarTest', qc.Behaviour, function() {
    this.horizontalIndeterminable = null;
    this.progressBar = null;
    this.inputField = null;

    this.value1 = null;
}, {
    horizontalIndeterminable: qc.Serializer.NODE,
    value1: qc.Serializer.NODE,
    inputField: qc.Serializer.NODE,
    progressBar: qc.Serializer.NODE
});

ProgressBarTest.prototype.awake = function() {
    var self = this;
    this.addListener(self.horizontalIndeterminable.onValueChange, function(v) {
        self.value1.text = self.horizontalIndeterminable.value.toFixed(2);
    });

    this.addListener(self.inputField.onValueChange, function() {
        self.progressBar.value = self.inputField.text * 1;
    });
};
