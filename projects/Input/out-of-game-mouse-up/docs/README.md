# pointerUpOutOfGame

* 实例演示在游戏外也能触发Up事件。效果图如下：<br>
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
    bubble: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    this.addListener(this.game.input.onPointerDown, this.onPointerDown, this);
    this.addListener(this.game.input.onPointerUp, this.onPointerUp, this);
};

UI.prototype.onPointerDown = function(id, x, y) {
    this.bubble.alpha = 0.3;
};

UI.prototype.onPointerUp = function(id, x, y) {
    this.bubble.alpha = 1;
};

```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)