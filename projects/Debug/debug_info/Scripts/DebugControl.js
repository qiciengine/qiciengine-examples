/**
 * Debug控制
 */
var DebugControl = qc.defineBehaviour('qc.demo.DebugControl', qc.Behaviour, function() {
	
}, {});

Object.defineProperties(DebugControl.prototype, {
	/**
	 * @property 
	 * @type {Object}
	 */
	debugOn: {
		get: function() {
			return this.game.debug.on;
		},

		set: function(v) {
			var self = this;
			self.game.debug.on = v;
			self.gameObject.text.text = self.debugOn ? 'Debug On' : 'Debug Off';
		}
	}
});

DebugControl.prototype.onStart = function() {
	var self = this;

	// 监听事件
	this.addListener(self.gameObject.onDown, self.onDown, self);

	// 修改按钮的显示文字
	self.gameObject.text.text = self.debugOn ? 'Debug On' : 'Debug Off';
};

DebugControl.prototype.onDown = function() {
	var self = this;
	self.debugOn = !self.debugOn;
};