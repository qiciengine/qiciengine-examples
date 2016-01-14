/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var SliderTest = qc.defineBehaviour('qc.demo.SliderTest', qc.Behaviour, function() {
    this.btn = null;
    this.disableBtn = null;
    this.slider1 = null;
    this.slider2 = null;
    this.slider3 = null;

    this.value1 = null;
    this.value2 = null;
    this.value3 = null;
}, {
    btn: qc.Serializer.NODE,
    disableBtn: qc.Serializer.NODE,
    slider1: qc.Serializer.NODE,
    slider2: qc.Serializer.NODE,
    slider3: qc.Serializer.NODE,
    value1: qc.Serializer.NODE,
    value2: qc.Serializer.NODE,
    value3: qc.Serializer.NODE
});

SliderTest.prototype.awake = function() {
    var self = this;
    this.addListener(self.btn.onClick, function() {
        var v = self.game.math.random(0, 100);
        self.slider1.value = v;
        self.slider2.value = v;
        self.slider3.value = v;
    });

    this.addListener(self.disableBtn.onClick, function() {
        self.slider1.state = qc.UIState.DISABLED;
        self.slider2.state = qc.UIState.DISABLED;
        self.slider3.state = qc.UIState.DISABLED;
    });

    this.addListener(self.slider1.onValueChange, function(v) {
        self.value1.text = v.toFixed(2);
    });
    this.addListener(self.slider2.onValueChange, function(v) {
        self.value2.text = v.toFixed(2);
    });
    this.addListener(self.slider3.onValueChange, function(v) {
        self.value3.text = v.toFixed(2);
    });
};
