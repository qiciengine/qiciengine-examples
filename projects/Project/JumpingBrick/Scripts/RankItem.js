// define a user behaviour
var RankItem = qc.defineBehaviour('qc.JumpingBrick.RankItem', qc.Behaviour, function() {
    // need this behaviour schedule in editor
    //this.runInEditor = true;
}, {
	positionImg : qc.Serializer.NODE,
    positionText : qc.Serializer.NODE,
    nameText : qc.Serializer.NODE,
    score : qc.Serializer.NODE,
    head : qc.Serializer.NODE,
    headBack : qc.Serializer.NODE,
    scoreBack : qc.Serializer.NODE
});

RankItem._position = [
	'first.png',
	'second.png',
	'third.png'
];

RankItem._textTint = [
	0xffb16742,
    0xff2899a7,
    0xffa5b471,
	0xff876712
];

RankItem._headBack = [
	'list_head_org.png',
    'list_head_blu.png',
	'list_head_green.png',
	'list_head_yel.png'
];

RankItem._infoBack = [
	'list_bak_org.png',
    'list_bak_blu.png',
	'list_bak_green.png',
	'list_bak_yel.png'
];

// Awake is called when the script instance is being loaded.
RankItem.prototype.awake = function() {

};

RankItem.prototype.revoke = function() {
	var self = this;
	if (self.headKey) {
		// 清理资源
		self.game.assets.unload(self.headKey);
		self.headKey = null;
	}
};

// Update is called every frame, if the behaviour is enabled.
RankItem.prototype.refreshData = function(index, data, cache) {
	// 更新信息
	var self = this;
	self.headBack.frame = RankItem._headBack[index < 4 ? (index - 1) : 3];
	self.scoreBack.frame = RankItem._infoBack[index < 4 ? (index - 1) : 3];
	if (index < 4) {
		self.positionImg.visible = true;
		self.positionImg.frame = RankItem._position[index - 1];
		self.positionText.visible = false;
		self.nameText.stroke = new qc.Color(RankItem._textTint[index - 1]);
		self.score.stroke = new qc.Color(RankItem._textTint[index - 1]);
	}
	else {
		self.positionImg.visible = false;
		self.positionText.visible = true;
		self.positionText.text = index.toString();
		self.nameText.stroke = new qc.Color(RankItem._textTint[3]);
		self.score.stroke = new qc.Color(RankItem._textTint[3]);
	}

	// 载入头像
	// 获取64 * 64的头像尺寸
	if (data.headurl) {
		if (self.headKey) {
			// 清理资源
			self.game.assets.unload(self.headKey);
		}
		self.headKey = data.headurl;
		self.game.assets.loadTexture(self.headKey, data.headurl + '64', function(assets) {
			self.head.texture = assets;
			if (cache) {
				cache.dirty = true;
			}
		});		
	}
	self.nameText.text = data.name;
	self.score.text = data.score.toString();
};
