# 方向键移动

* 本范例演示方向键控制物品移动。如下图：<br>
![](images\UI.png)
* 在新建场景中创建一个Image，用来显示贴图。
* 创建一个Text用来提示按上下左右来控制贴图的移动。
* 创建脚本InputTest。js，负责按下方向键控制物品移动的逻辑。脚本挂在根节点下。
代码如下：<br>

```javascript
var InputTest = qc.defineBehaviour('qc.demo.InputTest', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

// 实时检测方向键被按下事件处理
InputTest.prototype.update = function() {
    if (this.game.input.isKeyDown(qc.Keyboard.LEFT)) {
        this.image.anchoredX -= 5;
    }
    if (this.game.input.isKeyDown(qc.Keyboard.RIGHT)) {
        this.image.anchoredX += 5;
    }
    if (this.game.input.isKeyDown(qc.Keyboard.UP)) {
        this.image.anchoredY -= 5;
    }
    if (this.game.input.isKeyDown(qc.Keyboard.DOWN)) {
        this.image.anchoredY += 5;
    }
};

```
