/**
 * 数据管理
 */
var DataManager = qc.defineBehaviour('qc.JumpingBrick.DataManager', qc.Behaviour, function() {
    var self = this;
	JumpingBrick.data = self;
	self.loginType = DataManager.NOLOGIN;
	self.onRankUpdate = new qc.Signal();
	self.shareIcon = 'http://mama.game.qcplay.com/JumpingBrick/icon.png?v=1.1';
    self.sharePath = 'http://mama.game.qcplay.com/gamelink/jumpjumpingbrick.php';
    self.shareTitle = [
	    '你能超越我吗？',
	    '真是反应灵巧，求超越！',
	    '反应力爆表，真心求超越！',
	    '简直神乎其技，无人能挡！'
	];
	self.followPage = 'http://mp.weixin.qq.com/s?__biz=MzAxMDc1MDI5OQ==&mid=400438976&idx=1&sn=abbefc3e6f53bfdf7a5bef0eed53cce2&scene=0#wechat_redirect';
}, {
    shareIcon: qc.Serializer.STRING,
    sharePath: qc.Serializer.STRING,
    shareTitle: qc.Serializer.STRINGS,
    followPage: qc.Serializer.STRING
});

DataManager.NOLOGIN = 0;
DataManager.QUICKLOGIN = 1;
DataManager.WECHATLOGIN = 2;

DataManager.prototype.awake = function() {
	var self = this;
	// 添加微信的回调接口
	self.wechat = self.gameObject.getScript('qc.WeChat');
	if (self.wechat) {
		self.addListener(self.wechat.onLogin, self.doWechatLoginResult, self);
		self.addListener(self.wechat.onStartLogin, self.doStartLoginService, self);
	}
};


/**
 * 是否正在微信登陆中
 * @return {Boolean} [description]
 */
DataManager.prototype.isInWechatLogin = function() {
	return this.wechat && this.wechat.status === 'loggingIn';
};

/**
 * 是否在微信中打开
 */
DataManager.prototype.isWeChat = function() {
	return this.wechat && this.wechat.isWeChat();
};

/**
 * 快速登录，直接进入游戏
 */
DataManager.prototype.quickLogin = function() {
	var self = this;
	self.loginType = DataManager.QUICKLOGIN;
	self.loadScore();
	JumpingBrick.uiManager.switchStateTo(qc.JumpingBrick.UIManager.Game);
};

/**
 * 微信登录，等待微信处理
 */
DataManager.prototype.wechatLogin = function() {
	var self = this;
	self.wechat.login();
};

/**
 * 注销
 */
DataManager.prototype.logout = function() {
	var self = this;
	self.loginType = DataManager.NOLOGIN;
};

/**
 * 开始登陆游戏服务器
 */
DataManager.prototype.doStartLoginService = function() {
	JumpingBrick.uiManager.switchStateTo(qc.JumpingBrick.UIManager.Logining);
};

/**
 * 登录结果
 */
DataManager.prototype.doWechatLoginResult = function(result) {
	var self = this;
	if (result && result === 'fail') {
		JumpingBrick.uiManager.switchStateTo(qc.JumpingBrick.UIManager.Welcome);
		return;
	}

	var data = self.wechat.user;
	self.loginType = DataManager.WECHATLOGIN;
	self.rid = data.rid;
	self.token = data.token;
	self.loadScore();
	JumpingBrick.uiManager.switchStateTo(qc.JumpingBrick.UIManager.Game);
};
/**
 * 得到当前的保存键值，为不同的用户存储不同的数据
 */
DataManager.prototype._getStorageKey = function() {
	var self = this;
	if (self.loginType === DataManager.QUICKLOGIN) {
		return 'quickLogin';
	}
	else if (self.loginType === DataManager.WECHATLOGIN && self.rid) {
		return self.rid;
	}
	else {
		return 'temp';
	}
};

/**
 * 获取数据
 */
DataManager.prototype.loadScore = function() {
	var self = this;
	self.highScore = parseInt(self.game.storage.get('JumpingBrickHighScore_' + self._getStorageKey()));
};

/**
 * 保存数据
 */
DataManager.prototype.saveScore = function (score) {
	var self = this;
	self.lastScore = score;
	self.newHigh = false;
	if (!self.highScore || score > self.highScore) {
		self.newHigh = true;
		self.highScore = score;
		try {
			self.game.storage.set('JumpingBrickHighScore_' + self._getStorageKey(), score);
			self.game.storage.save();
		}
		catch(e) {
			console.log('当前开启了隐私模式，无法保存');
		}
		self.updateScore(self.highScore);
	}
};

/**
 * 保存数据到服务器
 */
DataManager.prototype.updateScore = function(score) {
	var self = this;
	if (self.loginType !== DataManager.WECHATLOGIN) {
		return;
	}
	JumpingBrick.service.updateScorers(self.rid, self.token, score);
};

/**
 * 保存游戏数据
 */
DataManager.prototype.saveGameState = function(data) {
	var self = this;
	try {
		self.game.storage.set('JumpingBrickGameState_' + self._getStorageKey(), JSON.stringify(data));	
		self.game.storage.save();
	}
	catch(e) {
		console.log('当前开启了隐私模式，无法保存');
	}
};

/**
 * 获取并删除保存的游戏数据
 */
DataManager.prototype.restoreGameState = function() {
	var self = this;
	var data = self.game.storage.get('JumpingBrickGameState_' + self._getStorageKey());
	if (data) {
		data = JSON.parse(data);
	}
	return data;
};

/**
 * 删除游戏数据
 */
DataManager.prototype.clearGameState = function() {
	var self = this;
	try {
		self.game.storage.del('JumpingBrickGameState_' + self._getStorageKey());
		self.game.storage.save();
	}
	catch(e) {
		console.log('当前开启了隐私模式，无法保存');
	}
};

/**
 * 请求排行榜
 */
DataManager.prototype.queryRank = function() {
	var self = this;
	JumpingBrick.service.getRank(self.rid, self.token, self.onGetRankSuccess.bind(self));
};

/**
 * 获取排行榜成功
 */
DataManager.prototype.onGetRankSuccess = function(data) {
	var self = this;
	try {
		data = JSON.parse(data);
	}
	catch (e) {
		data = {
			rankTop: [],
			userData: {}
		};
	}
	
	var self = this;
	// 获取排行榜成功
    var rank = 0;
    var rankTop = data.rankTop;
    for (var i = 0; i < rankTop.length; i++) {
        var u = rankTop[i];
        if (u.rid === self.rid) {
            rank = i + 1;
            break;
        }
    }
    data.selfRank = data.userData && data.userData[0];
    if (data.selfRank)
        data.selfRank.ranking = rank;
	self.onRankUpdate.dispatch(data);
};

DataManager.prototype.buildShareContent = function(score) {
	var self = this,
		wechat = self.wechat;
	if (!self.game.device.desktop && wechat && wechat.wx.share) {
		var title;
		if (score <= 0)
			title = '《跳跃的方块》真是一款魔性的游戏，根本停不下来！';
		else {
            var index = 0;
            if (score > 100) index = 3;
            else if (score > 50) index = 2;
            else if (score > 20) index = 1;
            else index = 0;
            title = '我在《跳跃的方块》中达到' + score + '层，' + self.shareTitle[index];
		}
		wechat.wx.share(title, self.shareIcon, '', self.sharePath);
	}
};