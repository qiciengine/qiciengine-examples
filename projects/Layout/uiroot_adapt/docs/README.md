# 分辨率自适应

* 本范例主要演示通过设置ScaleAdapter组件的Manual Type(缩放方式)，将界面元素按照缩放的方式进行缩放。
缩放方式有以下6种：<br>
说明：黄色框的区域是UIRoot，大小为960\*640，参考分辨率为480\*720。<br>
None：不进行任何缩放，此时组件不起效。效果图如下：<br>
![](images\none.png)<br><br>
Height：以高度进行衡量等比缩放。将根据参考分辨率480\*720的Height对UIRoot进行等比缩放，UIRoot变成1080\*720。效果图如下：<br>
![](images\height.png)
Width：以宽度进行衡量等比缩放。将根据参考分辨率480\*720的Width对UIRoot进行等比缩放，UIRoot变成480\*320。效果图如下：<br>
![](images\width.png)<br><br>
Expand：等比缩放，保证内容能完全放入目标屏幕分辨率内。系统自动根据当前分辨率来判定采用Width还是Height模式，以确保内容能完整显示。效果图如下：<br>
![](images\expand.png)<br><br>
Shrink： 等比缩放，是内容能够填满目标分辨率。与Expand不同的是，Expand保证内容全部显示，Shrink保证屏幕被填满（部分内容会被截断）。效果图如下：<br>
![](images\shrink.png)<br><br>
Fill：非等比缩放，保证目标的Width和Height和参考分辨率一样，使得内容刚好填满窗口。这会导致UI元素变形，因此也很少用。效果图如下：<br>
![](images\fill.png)<br><br>


## UIRoot

* 在新建场景中，创建一个Image组件，随即会自动生成根节点UIRoot。
* 设置当前分辨率为iPhone4(960\*640)，UIRoot的Width和Height会根据当前分辨率自动设置大小。
* 设置ScaleAdapter组件缩放类型(ManualType)为None，参考分辨率(Reference Resolution) W:480，H:720。

## UIImage

* 选中UIImage节点，将图片资源Assets/texture/mario.bin设置到Atlas属性上，并设置为原始图大小即Reset Native Size。设置之后可以看到图片的大小自动变为(480,720)，如下图：<br>
![](images\image.png)<br><br>

## op

* 在UIRoot节点下创建一个Empty Node命名为op，设置op的大小为(150,200)。如下图：<br>
![](images\transform.png)<br><br>
* 在op的节点上添加一个VerticalLayout组件，目的是将按钮垂直排列。如下图：<br>
![](images\layout.png)<br><br>
* 在op的节点下创建6个Button组件，分别以ManualType的类型None、MANUAL_HEIGHT、MANUAL_WIDTH、EXPAND、SHRINK和FILL设置按钮名称。
* 创建脚本ScaleAdapterSwith.js，负责适应屏幕的模式切换的逻辑。通过点击对应的ManualType类型的按钮，切换适应屏幕的模式。
代码如下：<br>

```javascript   
/**
 * 适应屏幕的模式切换
 */
var ScaleAdapterSwith = qc.defineBehaviour('qici.demo.ScaleAdapterSwith', qc.Behaviour, function() {
	// TODO: constructor
	var self = this;
	// 初始化
	self.root = self.none = self.manualHeight = self.manualWidth = self.expand = self.shrink = self.fill = null;

}, {
	// TODO: serializer
	root : qc.Serializer.NODE,
	none : qc.Serializer.NODE,
	manualHeight : qc.Serializer.NODE,
	manualWidth : qc.Serializer.NODE,
	expand : qc.Serializer.NODE,
	shrink : qc.Serializer.NODE,
	fill : qc.Serializer.NODE
});

Object.defineProperties(ScaleAdapterSwith.prototype,{
	// TODO: define properties
});

ScaleAdapterSwith.prototype.awake = function() {
	var self = this;
	if (!self.root) {
		return;
	}

	var scaleAdapter = self.root.getScript('qc.ScaleAdapter');

	self.none.onDown.add(function() {
		scaleAdapter.manualType = qc.ScaleAdapter.NONE;
		self._enableAllButton();
		self.none.state = qc.UIState.DISABLE;
	});
	self.manualHeight.onDown.add(function() {
		scaleAdapter.manualType = qc.ScaleAdapter.MANUAL_HEIGHT;
		self._enableAllButton();
		self.manualHeight.state = qc.UIState.DISABLE;
	});
	self.manualWidth.onDown.add(function() {
		scaleAdapter.manualType = qc.ScaleAdapter.MANUAL_WIDTH;
		self._enableAllButton();
		self.manualWidth.state = qc.UIState.DISABLE;
	});
	self.expand.onDown.add(function() {
		scaleAdapter.manualType = qc.ScaleAdapter.EXPAND;
		self._enableAllButton();
		self.expand.state = qc.UIState.DISABLE;
	});
	self.shrink.onDown.add(function() {
		scaleAdapter.manualType = qc.ScaleAdapter.SHRINK;
		self._enableAllButton();
		self.shrink.state = qc.UIState.DISABLE;
	});
	self.fill.onDown.add(function() {
		scaleAdapter.manualType = qc.ScaleAdapter.FILL;
		self._enableAllButton();
		self.fill.state = qc.UIState.DISABLE;
	});
};

// 将所有按钮设置为可用
ScaleAdapterSwith.prototype._enableAllButton = function() {
	var self = this;
	self.none.state = qc.UIState.NORMAL;
	self.manualHeight.state = qc.UIState.NORMAL;
	self.manualWidth.state = qc.UIState.NORMAL;
	self.expand.state = qc.UIState.NORMAL;
	self.shrink.state = qc.UIState.NORMAL;
	self.fill.state = qc.UIState.NORMAL;
};
```

## UIText

* 创建一个Text组件，用来显示当前分辨率Screen Size、UIRoot的宽高UIRoot Coordinate和参考分辨率Reference Resolution。
* 创建脚本ResolveInfo.js，挂在UIText节点上。负责显示当前分辨率Screen Size、UIRoot的宽高UIRoot Coordinate和参考分辨率Reference Resolution。
代码如下：<br>

```javascript   
var ResolveInfo = qc.defineBehaviour('qici.demo.ResolveInfo', qc.Behaviour, function() {
	
}, {
	
});

Object.defineProperties(ResolveInfo.prototype,{
	
});

ResolveInfo.prototype.awake = function() {
	var self = this;

	self.lastUpdateTime = self.game.time.fixedTime;
};

ResolveInfo.prototype.update = function() {
	var self = this,
		currTime = self.game.time.fixedTime,
		uiroot = self.game.world.find('UIRoot'),
		scaleAdapter = uiroot.getScript('qc.ScaleAdapter');
	if (currTime - self.lastUpdateTime < 500) {
		return;
	}

	self.lastUpdateTime = currTime;
	// 收集信息
	var screenWidth = Math.round(uiroot.width * uiroot.scaleX);
	var screenHeight = Math.round(uiroot.height * uiroot.scaleY);

	// 更新信息
	self.gameObject.text = 'Screen Size: (' + screenWidth + ', ' + screenHeight + ')\n'
		+ 'UIRoot Coordinate: (' + Math.round(uiroot.width * 100) / 100 + ', ' + Math.round(uiroot.height * 100 ) / 100 + ')\n'
		+ 'Reference Resolution: (' + scaleAdapter.referenceResolution.x + ', ' + scaleAdapter.referenceResolution.y + ')';
};
```