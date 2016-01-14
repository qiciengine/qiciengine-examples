var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.onDown = function(e) {
    // set position to the pointer
    var pt = new qc.Point(e.source.x, e.source.y);
    var localPt = this.gameObject.parent.toLocal(pt);
    this.gameObject.x = localPt.x;
    this.gameObject.y = localPt.y;
};

UI.prototype.onDrag = function(e) {
	var pt = this.gameObject.getWorldPosition();
    pt.x += e.source.deltaX;
    pt.y += e.source.deltaY;
    var localPt = this.gameObject.parent.toLocal(pt);
    this.gameObject.x = localPt.x;
    this.gameObject.y = localPt.y;
};
