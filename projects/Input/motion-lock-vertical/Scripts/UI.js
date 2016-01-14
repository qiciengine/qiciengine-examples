var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.onDrag = function(e) {
    // drag Y only.
	var pt = this.gameObject.getWorldPosition();
    pt.y += e.source.deltaY;
    var localPt = this.gameObject.parent.toLocal(pt);
    this.gameObject.y = localPt.y;
};
