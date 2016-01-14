# 九宫格贴图

* 本范例演示九宫格贴图通过改变大小展示Sliced和Tiled的效果。<br>
Sliced：9宫格图片，4角不变中间拉伸
Tiled：9宫格图片，4角不变中间平铺
效果图如下：<br>
![](images\UI.gif)

## 九宫格

* 从图集中选择一张贴图，设置Nine Padding属性Left、Right、Top和Bottom的大小。如下图：<br>
![](images\ninepadding.png)<br>
从上图预览可以看到贴图被切割成九个部分，九宫格制作就完成。

## UI

* 创建一个Image用来显示sliced的效果。如下图：<br>
![](images\sliced.png)<br>
改变大小后的效果如下图：<br>
![](images\sliced1.png)<br>
* 创建一个Image用来显示tiled的效果；设置与sliced的贴图一样。如下图：<br>
![](images\tiled.png)<br>
改变大小后的效果如下图：<br>
![](images\tiled1.png)<br>
* 创建一个Image用来显示tiled的效果。如下图：<br>
![](images\tiled2.png)<br>
改变大小后的效果如下图：<br>
![](images\tiled3.png)<br>
* 创建一个Button命名为Size，通过点击Size改变三个Image的大小，查看Sliced和Tiled的效果。
* 创建脚本ChangeSize.js，挂在Size的节点上，负责改变三个Image的大小。如下图：<br>
![](images\size.png)<br>
代码如下：<br>

```javascript   
var ChangeSize = qc.defineBehaviour('qc.demo.ChangeSize', qc.Behaviour, function() {
    this.image1 = null;
    this.image2 = null;
    this.image3 = null;
}, {
    image1: qc.Serializer.NODE,
    image2: qc.Serializer.NODE,
    image3: qc.Serializer.NODE
});

ChangeSize.prototype.onClick = function() {
    this.image1.width = this.game.math.random(20, 200);
    this.image1.height = this.game.math.random(20, 200);

    this.image2.width = this.game.math.random(20, 200);
    this.image2.height = this.game.math.random(20, 200);

    this.image3.width = this.game.math.random(20, 200);
    this.image3.height = this.game.math.random(20, 200);
};
```

