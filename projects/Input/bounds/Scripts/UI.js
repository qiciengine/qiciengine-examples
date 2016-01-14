var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
    // Can not go beyound this boundaries
    this.bounds = null;
}, {
    bounds: qc.Serializer.NODE
});

UI.prototype.onDragStart = function(e) {
    // calc the minX, minY, maxX, minY
    this.minX = this.bounds.x - this.bounds.width/2 + this.gameObject.width/2;
    this.minY = this.bounds.y - this.bounds.height/2 + this.gameObject.height/2;
    this.maxX = this.minX + this.bounds.width - this.gameObject.width;
    this.maxY = this.minY + this.bounds.height - this.gameObject.height;
    
    this.drag = true;
};

UI.prototype.onDrag =function(e) {
    var self = this, o = self.gameObject;
    if (!self.drag) return;
    
    var pt = o.getWorldPosition();
    pt.x += e.source.deltaX;
    pt.y += e.source.deltaY;
    
    var localPt = o.parent.toLocal(pt);
    if (localPt.x < self.minX) localPt.x = self.minX;
    if (localPt.y < self.minY) localPt.y = self.minY;
    if (localPt.x > self.maxX) localPt.x = self.maxX;
    if (localPt.y > self.maxY) localPt.y = self.maxY;
    o.x = localPt.x;
    o.y = localPt.y;
};

UI.prototype.onDragEnd = function(e) {
   this.drag = false;  
};
