/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

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
