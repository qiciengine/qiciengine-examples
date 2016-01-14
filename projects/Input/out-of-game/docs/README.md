# outOfGame

* 实例演示Pointer#winthinGame属性的使用。效果图如下：<br>
![outOfGame](images\UI.gif)

## UI

* 在新建场景中创建一个UIImage作为background，设置节点为自适应铺满父亲节点。
* 在根节点下创建一个UIImage作为bubble，设置节点为居中对齐，大小为资源图片的原始大小。如下图：<br>
![bubble](images\bubble.png)
* 在根节点下创建一个UIImage作为cursor，设置节点以左上角对齐，大小为资源图片的原始大小。如下图：<br>
![cursor](images\cursor.png)
* 创建脚本UI.js，负责监听cursor是否超过bubble节点的区域范围。脚本挂在根节点下，并将bubble和cursor节点设置到对应的属性上，如下图：<br>
![script](images\script.png)<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
    bubble: qc.Serializer.NODE,
    cursor: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    this.addListener(this.game.input.onPointerMove, this.onPointerMove, this);
};

UI.prototype.onPointerMove = function(id, x, y) {
    var pointer = this.game.input.getPointer(id);
    if (!pointer || !pointer.withinGame) {
        // Out of game
        this.bubble.alpha = 0.5;
        return;
    }  
    
    this.cursor.x = x;
    this.cursor.y = y;
    this.bubble.alpha = 1;
};
```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)