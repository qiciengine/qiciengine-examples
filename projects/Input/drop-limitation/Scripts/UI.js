var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
    this.angle = 0;
}, {
});

UI.prototype.onDrag = function(e) {
	var pt = this.gameObject.getWorldPosition();
    pt.x += e.source.deltaX;
    pt.y += e.source.deltaY;
    var localPt = this.gameObject.parent.toLocal(pt);
    this.gameObject.x = localPt.x;
    this.gameObject.y = localPt.y;
};

UI.prototype.onDragEnd = function(e) {
    var x = this.gameObject.x,
        y = this.gameObject.y;
    
    // Move the items when it is already dropped.
    this.gameObject.x = Math.round(x / 90) * 90;
    this.gameObject.y = Math.round(y / 90) * 90;

    // 限制 x 在 90、180、270、360 这四档当中运动
    this.gameObject.x = Math.max(90, Math.min(360, this.gameObject.x));
};
