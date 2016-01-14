/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var TimeScale = qc.defineBehaviour('qc.demo.TimeScale', qc.Behaviour, function() {
	this.slider = null;
	this.valueLabel = null;
}, {
	slider: qc.Serializer.NODE,
	valueLabel: qc.Serializer.NODE
});

TimeScale.prototype.awake = function() {
	var self = this;
	this.addListener(self.slider.onValueChange, function() {
		self.game.time.timeScale = self.slider.value;
	});
};

TimeScale.prototype.update = function() {
    this.valueLabel.text = '' + this.game.time.timeScale;
};
