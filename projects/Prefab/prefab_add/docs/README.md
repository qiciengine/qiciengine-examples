# 添加预置

* 本范例演示添加预置。效果图如下：<br>
![](images\UI.gif)

## UI

* 首先在新建场景中创建一个TableLayout作为table节点，用来显示预置信息列表。设置每条信息的大小为(300,60)；列表只显示一列。如下图：<br>
![](images\table.png)
* 在根节点下创建一个Button，点击按钮添加预置信息到列表中。

## 创建预置

* 在table节点下创建一个EmptyNode作为table_cell；
* 在table_cell节点下创建一个Image，用来显示背景图；
* 在table_cell节点下创建一个Text，用来显示文本内容；
* 在table_cell节点下创建一个Slider。
* 完成以上设置后，创建目录Project/Assets/prefabs，拖拽table_cell节点到目录下。此时，table_cell节点变为蓝色，预置table_cell.bin创建完成。如下图：<br>
![](images\prefab.png) 

## 添加脚本

* 创建脚本AddPrefab.js，负责添加预置到指定节点下，脚本挂在Button节点下。设置Prefab为table_cell.bin，父亲节点Parent为table节点。如下图：<br>
![](images\addPrefab.png)<br>
代码如下：<br>

```javascript
var AddPrefab = qc.defineBehaviour('qici.demo.AddPrefab', qc.Behaviour, function() {
	var self = this;
	self.prefab = null;
	self.parent = null;
}, {
	prefab : qc.Serializer.PREFAB,
	parent : qc.Serializer.NODE
});

Object.defineProperties(AddPrefab.prototype,{
	
});

AddPrefab.prototype.awake = function() {
	var self = this;
	self.gameObject.onDown.add(function() {
		if (!self.parent || !self.prefab) {
			return;
		}
		// 复制一个预制到指定节点下
		self.game.add.clone(self.prefab, self.parent);
	});
};
```