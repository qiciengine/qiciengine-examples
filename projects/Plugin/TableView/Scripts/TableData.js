// define a user behaviour
var TableData = qc.defineBehaviour('qc.engine.TableData', com.qici.extraUI.TableViewAdapter, function() {
    
}, {
    
});

// Awake is called when the script instance is being loaded.
TableData.prototype.awake = function() {

};

// Update is called every frame, if the behaviour is enabled.
TableData.prototype.update = function() {

};

/**
 * 节点处于不可见时，回收节点，
 * @param  {qc.Node} cell - 节点
 * @param  {number} col - 所在列
 * @param  {number} row - 所在行
 */
TableData.prototype.revokeCell = function(cell, col, row) {

};

/**
 * 节点处于可见时，创建节点，
 * @param  {qc.Node} cell - 节点
 * @param  {number} col - 所在列
 * @param  {number} row - 所在行
 */
TableData.prototype.createCell = function(cell, col, row) {
	cell.find('bg/UIText').text = '(' +col + ',' + row + ')';
};

TableData.prototype.getTableSize = function() {
	return { x: 10, y: 10000};
};