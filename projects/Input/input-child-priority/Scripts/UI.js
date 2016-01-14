var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
    popup: qc.Serializer.NODE,
    closeBtn: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    
    // close the popup
    this.addListener(self.closeBtn.onClick, self.closePopup, self);
    
    // drag the popup
    this.addListener(self.popup.onDrag, function(o, e) {
        var pt = o.getWorldPosition();
        pt.x += e.source.deltaX;
        pt.y += e.source.deltaY;
        var localPt = o.parent.toLocal(pt);
        o.x = localPt.x;
        o.y = localPt.y;
    });
};

UI.prototype.onClick = function() {
    var ts = this.popup.getScript('qc.TweenScale');
    if (ts.enable || this.popup.scaleX === 1) return;
    
    ts.resetToBeginning();
    ts.playForward();
};

UI.prototype.closePopup = function() {
    var ts = this.popup.getScript('qc.TweenScale');
    if (ts.enable) return;
    
    ts.resetToBeginning(true);
    ts.playReverse();
};

