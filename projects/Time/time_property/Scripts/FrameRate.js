/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var FrameRate = qc.defineBehaviour('qc.demo.FrameRate', qc.Behaviour, function() {
	this.slider = null;
	this.valueLabel = null;
}, {
	slider: qc.Serializer.NODE,
	valueLabel: qc.Serializer.NODE
});

FrameRate.prototype.awake = function() {
	var self = this;
	this.addListener(self.slider.onValueChange, function() {
		self.game.time.frameRate = self.slider.value;
	});
};

FrameRate.prototype.update = function() {
    this.valueLabel.text = '' + this.game.time.frameRate;
};
