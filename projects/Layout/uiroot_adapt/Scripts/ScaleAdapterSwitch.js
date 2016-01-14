/**
 * @author chenqx
 * copyright 2015 Qcplay All Rights Reserved.
 */
/**
 * 适应屏幕的模式切换
 */
var ScaleAdapterSwith = qc.defineBehaviour('qici.demo.ScaleAdapterSwith', qc.Behaviour, function() {
	// TODO: constructor
	var self = this;
	// 初始化
	self.root = self.none = self.manualHeight = self.manualWidth = self.expand = self.shrink = self.fill = null;

}, {
	// TODO: serializer
	root : qc.Serializer.NODE,
	none : qc.Serializer.NODE,
	manualHeight : qc.Serializer.NODE,
	manualWidth : qc.Serializer.NODE,
	expand : qc.Serializer.NODE,
	shrink : qc.Serializer.NODE,
	fill : qc.Serializer.NODE
});

Object.defineProperties(ScaleAdapterSwith.prototype,{
	// TODO: define properties
});

ScaleAdapterSwith.prototype.awake = function() {
	var self = this;
	if (!self.root) {
		return;
	}

	var scaleAdapter = self.root.getScript('qc.ScaleAdapter');

	this.addListener(self.none.onDown, function() {
		scaleAdapter.manualType = qc.ScaleAdapter.NONE;
		self._enableAllButton();
		self.none.state = qc.UIState.DISABLE;
	});
	this.addListener(self.manualHeight.onDown, function() {
		scaleAdapter.manualType = qc.ScaleAdapter.MANUAL_HEIGHT;
		self._enableAllButton();
		self.manualHeight.state = qc.UIState.DISABLE;
	});
	this.addListener(self.manualWidth.onDown, function() {
		scaleAdapter.manualType = qc.ScaleAdapter.MANUAL_WIDTH;
		self._enableAllButton();
		self.manualWidth.state = qc.UIState.DISABLE;
	});
	this.addListener(self.expand.onDown, function() {
		scaleAdapter.manualType = qc.ScaleAdapter.EXPAND;
		self._enableAllButton();
		self.expand.state = qc.UIState.DISABLE;
	});
	this.addListener(self.shrink.onDown, function() {
		scaleAdapter.manualType = qc.ScaleAdapter.SHRINK;
		self._enableAllButton();
		self.shrink.state = qc.UIState.DISABLE;
	});
	this.addListener(self.fill.onDown, function() {
		scaleAdapter.manualType = qc.ScaleAdapter.FILL;
		self._enableAllButton();
		self.fill.state = qc.UIState.DISABLE;
	});
};

// 将所有按钮设置为可用
ScaleAdapterSwith.prototype._enableAllButton = function() {
	var self = this;
	self.none.state = qc.UIState.NORMAL;
	self.manualHeight.state = qc.UIState.NORMAL;
	self.manualWidth.state = qc.UIState.NORMAL;
	self.expand.state = qc.UIState.NORMAL;
	self.shrink.state = qc.UIState.NORMAL;
	self.fill.state = qc.UIState.NORMAL;
};