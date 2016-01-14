# 固定长宽比(AspectRatioFitter组件)

* 本范例主要介绍AspectRatioFitter组件的使用，AspectRatioFitter组件用来保证节点的高度和宽度保持固定的比例。可以分为以下五种类型：<br>
None：无效果<br>
Width Controls Height：宽决定高。保证宽度不变，根据宽度跟比例，调节高度。<br>
Height Controls Width：高决定宽。保证高度不变，根据高度跟比例，调节宽度。<br>
Fit In Parent：适合父亲大小。保证比例、居父容器中心，缩放到刚好一边跟父容器重叠，不超出父容器。<br>
Envelope Parent：填满父亲大小。保证比例、居父容器中心，缩放到刚好将父容器彻底覆盖。<br>
效果图如下：<br>
![](images\UI.png)

## UI

* 根据效果图，按照类型分为5个部分，每个部分都是由3个节点组成。分别是白色底图(父亲节点Group)、黄色图(UIImage)和类型名称(UIText)

### Group无效果

* 首先创建一个Image命名为Group无效果。
* 在Group无效果的节点下创建一个Image，设置大小为(100,150)，Image Type设置为Sliced，9宫格图片，4角不变中间拉伸。如下图：<br>
![](images\sliced.png)
* 在UIImage节点上添加AspectRatioFitter组件，步骤如下：<br>
Add Component -> UI -> AspectRatioFitter。<br>
设置AspectRatioFitter类型Mode为None，比例Ratio为0.5。如下图：<br>
![](images\aspect.png)<br>
* 在Group无效果的节点下创建一个Text组件，用来说明当前AspectRatioFitter组件的类型。

 
### Group宽决定高

* 复制Group无效果，重命名为Group宽决定高。
* 选中Group宽决定高节点，设置参数如下：<br>
![](images\width.png)<br>
* 选中UIImage节点，设置大小为(100,200)；AspectRatioFitter类型Mode为Width Controls Height。

### Group高决定宽

* 复制Group无效果，重命名为Group高决定宽。
* 选中Group高决定宽节点，设置参数如下：<br>
![](images\height.png)<br>
* 选中UIImage节点，设置大小为(75,150)；AspectRatioFitter类型Mode为Height Controls Width。

### Group适合父亲大小

* 复制Group无效果，重命名为Group适合父亲大小。
* 选中Group适合父亲大小节点，设置参数如下：<br>
![](images\fit.png)<br>
* 选中UIImage节点，设置上下左右拉伸，左右边距都为120；AspectRatioFitter类型Mode为Fit In Parent。

### Group填满父亲大小

* 复制Group无效果，重命名为Group填满父亲大小。
* 选中Group填满父亲大小节点，设置参数如下：<br>
![](images\envolope.png)<br>
* 选中UIImage节点，设置上下左右拉伸，上下边距都为240；AspectRatioFitter类型Mode为Envelope Parent。
