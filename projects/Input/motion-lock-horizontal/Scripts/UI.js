var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.onDrag = function(e) {
    // drag X only.
	var pt = this.gameObject.getWorldPosition();
    pt.x += e.source.deltaX;
    var localPt = this.gameObject.parent.toLocal(pt);
    this.gameObject.x = localPt.x;
};
