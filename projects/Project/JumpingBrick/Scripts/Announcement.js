/**
 * 排行榜界面
 */
var Announcement = qc.defineBehaviour('qc.JumpingBrick.Announcement', com.qici.extraUI.TableViewAdapter, function() {
    
}, {
    closeButton: qc.Serializer.NODE,
    showPanel : qc.Serializer.NODE,
    myDesc : qc.Serializer.NODE,
    myPosition : qc.Serializer.NODE,
    myHeadPanel : qc.Serializer.NODE,
    myHead : qc.Serializer.NODE,
    myName : qc.Serializer.NODE,
    myScore : qc.Serializer.NODE
});

Announcement.prototype.awake = function() {
    var self = this,
    	data = JumpingBrick.data;
    self.addListener(self.closeButton.onClick, self.returnToGameOver, self);
    self.addListener(self.gameObject.onClick, self.returnToGameOver, self);
    self.addListener(self.showPanel.onClick, function() {}, self);
    self.addListener(data.onRankUpdate, self.receiveRankData, self);
};

/**
 * 返回游戏结算界面
 */
Announcement.prototype.returnToGameOver = function() {
	var self = this;
	if (self.headKey) {
		self.game.assets.unload(self.headKey);
	}
	JumpingBrick.uiManager.switchStateTo(qc.JumpingBrick.UIManager.GameOver);
};

// 请求排行榜数据
Announcement.prototype.updateRank = function() {
	var data = JumpingBrick.data;
	data.queryRank();
};

/**
 * 收到排行榜数据
 */
Announcement.prototype.receiveRankData = function(data) {
	var self = this;
	// 更新自己的信息
	var selfData = data.selfRank;
	if (!selfData) {
		self.myPosition.text = '请登录游戏后查看';
		self.myHeadPanel.visible = false;
		self.myName.visible = false;
		self.myScore.visible = false;
		self.myDesc.visible = false;
	}
	else {
		self.myPosition.text = selfData.ranking ? selfData.ranking.toString() : '未上榜';
		self.myHeadPanel.visible = true;
		self.myDesc.visible = true;
		
		// 获取64 * 64的头像尺寸
		if (selfData.headurl) {
			if (self.headKey) {
				self.game.assets.unload(self.headKey);
			}
			self.headKey = selfData.headurl;
			self.game.assets.loadTexture(self.headKey, selfData.headurl + '64', function(assets) {
				self.myHead.texture = assets;
			});		
		}
		self.myName.text = selfData.name;
		self.myScore.text = selfData.scorers.toString();
	}

	var rankTop = data.rankTop;
	self.rankTop = rankTop;

	self.dispatchDataChange();
};


/**
 * 获取表格大小，x、y同时只能有一个为Infinity
 * @return {{x: number|Infinity, y: number| Infinity}}
 */
Announcement.prototype.getTableSize = function() {
	return { x: 1, y: this.rankTop ? this.rankTop.length : 0 };
};

/**
 * 根据在Table中的点返回对应的单元格
 * @param  {number} x - x轴坐标
 * @param  {number} y - y轴坐标
 * @return {{x: number, y: number}}} 返回点所在的单元格信息
 */
Announcement.prototype.findCellWithPos = function(x, y) {
	return {
		x: Math.floor(x / 540),
		y: Math.floor(y / 90)
	};
};

/**
 * 获取节点的显示位置
 */
Announcement.prototype.getCellRect = function(col, row) {
	return new qc.Rectangle(col * 540, row * 90, 540, 90);
};

/**
 * 节点处于不可见时，回收节点，
 * @param  {qc.Node} cell - 节点
 * @param  {number} col - 所在列
 * @param  {number} row - 所在行
 */
Announcement.prototype.revokeCell = function(cell, col, row) {
	cell.getScript('qc.JumpingBrick.RankItem').revoke();
};

/**
 * 节点处于可见时，创建节点，
 * @param  {qc.Node} cell - 节点
 * @param  {number} col - 所在列
 * @param  {number} row - 所在行
 */
Announcement.prototype.createCell = function(cell, col, row) {
	if (this.rankTop) {
		cell.getScript('qc.JumpingBrick.RankItem').refreshData(row + 1, this.rankTop[row]);
	}
};