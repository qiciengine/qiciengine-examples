var LevelShow = qc.defineBehaviour('qc.engine.LevelShow', qc.Behaviour, function() {
	this.gameObject.levelShow = this;
}, {
	leftLevel : qc.Serializer.NODE,
	rightLevel : qc.Serializer.NODE,
	block : qc.Serializer.NODE
});

LevelShow.prototype.onDestory = function() {
	this.gameObject.levelShow = null;
};

LevelShow.prototype.update = function() {
	var self = this,
		width = JumpingBrick.gameConfig.getGameWidth();
	if (width !== self.recordWidth) {
		var diff = (width - self.recordWidth) / 2;
		self.recordWidth = width;

		if (diff + self.leftLevel.width > 0) {
			self.leftLevel.x -= diff;
			self.leftLevel.width += diff;	
		}
		
		if (diff + self.rightLevel.width > 0) {
			self.rightLevel.width += diff;	
		}
	}
};

LevelShow.prototype.setLevelInfo = function(levelInfo) {
	var self = this,
		width = JumpingBrick.gameConfig.getGameWidth();
	var blockChildren = self.block.children;
	var blockLen = blockChildren.length;

	self.recordWidth = width;
	if (!levelInfo) {
		self.leftLevel.visible = self.rightLevel.visible = false;
		while (blockLen--) {
			blockChildren[blockLen].visible = false;
		}
		return;
	}
	var passArea = levelInfo.passArea,
		color = new qc.Color(levelInfo.color);

	self.leftLevel.visible = self.rightLevel.visible = true;
	// 设置左边阻挡
	self.leftLevel.x = -0.5 * width;
	self.leftLevel.y = passArea.y;
	self.leftLevel.width = passArea.x - self.leftLevel.x;
	self.leftLevel.height = passArea.height;
	self.leftLevel.colorTint = color;

	// 设置右边阻挡
	self.rightLevel.x = passArea.x + passArea.width;
	self.rightLevel.y = passArea.y;
	self.rightLevel.width = 0.5 * width - self.rightLevel.x;
	self.rightLevel.height = passArea.height;
	self.rightLevel.colorTint = color;

	// 确保块够用
	while (blockLen++ < levelInfo.block.length) {
		self.game.add.clone(self.leftLevel, self.block);
	}

	blockChildren = self.block.children;
	blockLen = blockChildren.length;
	var idx = -1;
	while (++idx < blockLen) {
		var blockInfo = levelInfo.block[idx];
		if (!blockInfo) {
			blockChildren[idx].visible = false;
		}
		else {
			blockChildren[idx].colorTint = color;
			blockChildren[idx].visible = true;
			blockChildren[idx].x = blockInfo.x;
			blockChildren[idx].y = blockInfo.y;
			blockChildren[idx].width = blockInfo.width;
			blockChildren[idx].height = blockInfo.height;
		}
	}
};
