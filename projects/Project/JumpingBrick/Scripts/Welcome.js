
var Welcome = qc.defineBehaviour('qc.JumpingBrick.Welcome', qc.Behaviour, function() {

}, {
	quickLogin: qc.Serializer.NODE,
	wechatLogin: qc.Serializer.NODE
});

Welcome.prototype.awake = function() {
	var self = this;

	self.quickLogin && self.addListener(self.quickLogin.onClick, self.doQuickLogin, self);
	self.wechatLogin && self.addListener(self.wechatLogin.onClick, self.doWechatLogin, self);

	
};

Welcome.prototype.update = function() {
    var self = this;
	if (self.quickLogin.visible && JumpingBrick.data.isWeChat()) {
		self.quickLogin.visible = false;
		self.quickLogin.parent.getScript('qc.TableLayout').relayout();
	}
};

// 快速登陆
Welcome.prototype.doQuickLogin = function() {
	JumpingBrick.data.quickLogin();
};

// 微信登陆
Welcome.prototype.doWechatLogin = function() {
	JumpingBrick.data.wechatLogin();
};