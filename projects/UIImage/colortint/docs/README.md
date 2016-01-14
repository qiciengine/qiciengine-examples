# colorTint
* 本范例介绍设置colorTint属性值给图片进行颜色混合，效果图如下：<br>    
![](images/show.gif)  

## UI   
* 在UIRoot节点下创建一个Image节点取名center，该节点的属性值设置如下：<br>  
![](images/center.png)    

* 在UIRoot节点下创建一个Text节点取名clue，该节点的属性值设置如下：<br>   
![](images/clue.png)     

* 在Scripts文件夹下创建脚本 UI.js，把该脚本挂载到center节点，如下图：<br>   
![](images/script.png)     

* 代码如下：<br>    

```javascript   

var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    clue: qc.Serializer.NODE
});

//点击响应
UI.prototype.onClick = function() {
    //改变颜色
    this.gameObject.colorTint = new qc.Color(this.game.math.random(0, 0xffffff));
}; 
```