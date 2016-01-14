var Drag = qc.defineBehaviour('qc.demo.Drag', qc.Behaviour, function() {
}, {
});

Drag.prototype.onDown = function() {
    // Bring to top
    this.gameObject.parent.setChildIndex(this.gameObject, this.gameObject.parent.children.length - 1);
};

Drag.prototype.onDrag = function(e) {
    var self = this,
        o = self.gameObject;
    var pt = o.getWorldPosition();
    pt.x += e.source.deltaX;
    pt.y += e.source.deltaY;
    
    var localPt = o.parent.toLocal(pt);
    o.x = localPt.x;
    o.y = localPt.y;
};
