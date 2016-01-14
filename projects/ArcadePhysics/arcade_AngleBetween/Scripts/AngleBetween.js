/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 面向目标
 */
var AngleBetween = qc.defineBehaviour('qc.demo.AngleBetween', qc.Behaviour, function() {
    this.arrow = null;
}, {
    arrow: qc.Serializer.NODE
});

AngleBetween.prototype.awake = function() {
    this.rigidbody = this.arrow.getScript('qc.arcade.RigidBody');
    this.arrow.rotation = this.rigidbody.angleBetween(this.gameObject);
};

// 开始拖拽的处理
AngleBetween.prototype.onDragStart = function(e) {
    var self = this,
        o = self.gameObject;
    self.oldPos = new qc.Point(o.x, o.y);
    self.drag = true;
};

// 拖拽中的处理
AngleBetween.prototype.onDrag = function(e) {
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

        // 箭头指向本节点
        self.arrow.rotation = self.rigidbody.angleBetween(self.gameObject);
    }
};

// 拖拽结束的处理
AngleBetween.prototype.onDragEnd = function(e) {
    delete this.drag;
};
