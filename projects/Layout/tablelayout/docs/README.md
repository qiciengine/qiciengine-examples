# tableLayout

* 实例全面介绍TableLayout中各个属性的使用及对应的效果。效果图如下：<br>
![tableLayout](images\UI.png)

## UI

### UIRoot

* 在新建场景中创建一个EmptyNode作为UIRoot，在此节点上添加一个ScaleAdapter，设置ManualType为Expand，参考分辨率为1280*1920。
* 在UIRoot节点上添加一个TableLayout组件。设置<br>
Style:WrapElement(包围模式) <br>
SizeProvider:RealBounds(显示实际尺寸)<br>
StartCorner:TopLeft(起始角为左上角)<br>
StartAxis:Horizontal(放置方向为垂直)<br>
ContentAlignment:TopLeft(内容对齐方式顶部左侧对齐)<br>
CellAlignment:MiddleCenter(单元格对齐为居中对齐)<br>
Constraint:FixColumnCount(固定列数)为2列。<br>
如下图：<br>
![](images\table1.png)

### Bounds

* 在根节点下创建一个UIImage作为Bounds，设置大小为(640,640)。
* 在Bounds节点下创建一个EmptyNode，在此节点上添加一个TableLayout，设置表格为起始角为左上角，3列居中对齐，水平排列，并自动刷新。如下图：<br>
![](images\table2.png)
* 在node节点下创建9个UIImage，分别用来显示1~9的数字图片。
* 选中5节点，在此节点上添加一个TweenRotation组件，从0~360°旋转图片，周期为2秒。如下图:<br>
![](images\tweenRotation.png)
* 可以看出在旋转5的图片后，其他数字图片会自动刷新位置。

### RectTransform

* 复制Bounds，作为RectTransform。修改TableLayout属性为右下角为起始角，3列居中对齐，垂直排列，忽略旋转，并自动刷新。如下图：<br>
![](images\table3.png)

### Bounds

* 复制Bounds，作为Bounds，删除7、8、9节点，只留下1~6节点。修改TableLayout属性为右下角为起始角，1列顶部居中对齐，垂直排列，忽略X轴坐标变化，并自动刷新。如下图：<br>
![](images\table4.png)

### RectTransform

* 复制Bounds，作为Bounds，删除7、8、9节点，只留下1~6节点。修改TableLayout属性为左上角为起始角，1列居中对齐，水平排列，忽略X、Y轴坐标变化及旋转，并自动刷新。如下图：<br>
![](images\table5.png)

* 详细可参考[操作手册 表格布局](http://docs.zuoyouxi.com/manual/Sample/TableLayout.html)