# rectransform

* 实例演示如何使用recttranform进行界面布局。效果图如下：<br>
![](images\UI.png)

## UI

* 在新建场景中创建一个Button作为Top，设置Top在x、y轴方向的stretch模式，调整Anchors Max(1,0.2)。如下图：<br>
![](images\top.png)
* 在Top节点下创建一个Button作为CenterMiddle，设置节点为居中对齐。如下图：<br>
![](images\centerMiddle.png)
* 在根节点下创建一个Button作为Middle，设置Top在x、y轴方向的stretch模式，调整Anchors Max(1,0.2)，下边距为60。如下图：<br>
![](images\middle.png)
* 在Middle节点下创建一个Button作为RightTop，设置RightTop节点以右上角固定模式，如下图：<br>
![](images\rightTop.png)
* 在Middle节点下创建一个Button作为CenterBottom，设置节点以顶部居中对齐，如下图：<br>
![](images\centerBottom.png)
* 在根节点下创建一个Button作为Bottom，设置节点在在x轴方向的stretch模式，高度为60。如下图：<br>
![](images\bottom.png)
* 在Bottom节点下创建一个Button作为RightSide，设置RightSide在x、y轴方向的stretch模式，调整Anchors Min(0.5,0)。如下图：<br>
![](images\rightSize.png)