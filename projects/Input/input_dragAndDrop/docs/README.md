# 拖放

* 本范例演示拖放功能。效果图如下：<br>
![](images\UI.gif)
* 在新建场景中创建一个Image作为target，用来作为拖放的目标位置。
* 在根节点下创建一个Image作为被拖动的对象，用来显示贴图。
* 创建脚本DragTest.js，负责拖动对象到指定的位置。脚本挂在UIImage的节点上。
代码如下：<br>

```javascript
var DragTest = qc.defineBehaviour('qc.demo.DragTest', qc.Behaviour, function() {
}, {
});

DragTest.prototype.onDragStart = function(e) {
    console.log('Start Drag', e);

    // 记录当前的坐标位置，并标记拖拽开始
    var self = this,
        o = self.gameObject;
    self.oldPos = new qc.Point(o.x, o.y);
    self.drag = true;
};

// 节点拖拽中的处理
DragTest.prototype.onDrag = function(e) {
    console.log('Dragging');

    var self = this,
        o = self.gameObject;
    if (self.drag) {
        // 改变节点的目标位置
        var p = o.getWorldPosition();
        p.x += e.source.deltaX;
        p.y += e.source.deltaY;
        p = o.parent.toLocal(p);
        o.x = p.x;
        o.y = p.y;
    }
};

// 节点拖拽结束的处理
DragTest.prototype.onDragEnd = function(e) {
    console.log('End Drag', e);

    // 拖拽结束了
    var self = this,
        o = self.gameObject;
    self.drag = false;

    if (!e.result) {
        // 没有任何容器接受，反弹回去
        console.log('reset position.');
        this.gameObject.x = this.oldPos.x;
        this.gameObject.y = this.oldPos.y;
    }
};
```
* 创建脚本DropTest.js，负责将对象放到指定的位置。脚本挂在target节点上。
代码如下：<br>

```javascript
var DropTest = qc.defineBehaviour('qc.demo.DropTest', qc.Behaviour, function() {
}, {
    // 需要序列化的字段
});

// 检查拖拽的节点是否可以放进来
DropTest.prototype.isAllowDrop = function(node) {
    // 50%的概率可以放进来
    var r = this.game.math.random(0, 1) === 0;
    console.log(r ? 'Can Drop.' : 'Cannot Drop.');
    return r;
};

// 节点拖拽放下了
DropTest.prototype.onDragDrop = function(e) {
    console.log('***Drop Drag', e);

    // 将此节点放进来
    var node = e.dragging;
    node.parent = this.gameObject;
    node.x = 0;
    node.y = 0;

    // 标记下，对象放入了目标容器
    e.result = this.gameObject;
};
```
