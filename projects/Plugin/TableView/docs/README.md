# 拓展UI组件

* 本范例演示如何使用拓展UI的TableView功能。

## 使用TableView来显示表格
* 当表格的数据大部分都是在不可见区域时，使用传统的ScrollView来处理显示时，会有大部分的性能消耗在不可见对象的维护上。而对于有一定规律的表格显示的布局来说，这部分的消耗是没有必要的。TableView和传统ScrollView + TableLayout最大的不同就在于减少了不可见对象的维护上，但需要提供一个数据来源。

* 在Project/Scripts目录下创建脚本TableData.js，来为TableView提供数据来源。
代码如下：  
````javascript
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

````

* 将脚本挂在节点上，并设置为TableView的Adapter Node即可。

