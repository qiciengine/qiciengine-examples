// define a user behaviour
var LevelAdapter = qc.defineBehaviour('qc.engine.LevelAdapter', com.qici.extraUI.TableViewAdapter, function() {
	var self = this;
	
	// 载入配置和游戏世界
    self.config = JumpingBrick.gameConfig;
    self.world = JumpingBrick.gameWorld;
}, {
});

LevelAdapter.prototype.awake = function() {
	var self = this;
};

/**
 * 获取表格大小，x、y同时只能有一个为Infinity
 * @return {{x: number|Infinity, y: number| Infinity}}
 */
LevelAdapter.prototype.getTableSize = function() {
	return { x: 1, y: Infinity};
};

/**
 * 根据在Table中的点返回对应的单元格
 * @param  {number} x - x轴坐标
 * @param  {number} y - y轴坐标
 * @return {{x: number, y: number}}} 返回点所在的单元格信息
 */
LevelAdapter.prototype.findCellWithPos = function(x, y) {
	return { 
		x: 0,
		y: y < 960 ? 0 : (1 + Math.floor((y - 960) / this.config.levelInterval))
	};
};

/**
 * 获取节点的显示位置
 */
LevelAdapter.prototype.getCellRect = function(col, row) {
    if (row === 0) 
        return new qc.Rectangle(0, 0, 100, 960);
    else
        return new qc.Rectangle(0, 960 + (row - 1) * this.config.levelInterval, 100, this.config.levelInterval);
};

/**
 * 节点处于不可见时，回收节点，
 * @param  {qc.Node} cell - 节点
 * @param  {number} col - 所在列
 * @param  {number} row - 所在行
 */
LevelAdapter.prototype.revokeCell = function(cell, col, row) {
	this.world.deleteLevelInfo(row - 1);
};

/**
 * 节点处于可见时，创建节点，
 * @param  {qc.Node} cell - 节点
 * @param  {number} col - 所在列
 * @param  {number} row - 所在行
 */
LevelAdapter.prototype.createCell = function(cell, col, row) {
	var self = this,
		levelInfo = self.world.getLevelInfo(row - 1);
	cell.levelShow.setLevelInfo(levelInfo);
};