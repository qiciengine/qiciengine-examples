var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
    this.angle = 0;
}, {
    ball: qc.Serializer.NODE
});

UI.prototype.onDragStart = function(e) {
    this.ball.alpha = 1;
};

UI.prototype.onDrag = function(e) {
	var pt = this.gameObject.getWorldPosition();
    pt.x += e.source.deltaX;
    pt.y += e.source.deltaY;
    var localPt = this.gameObject.parent.toLocal(pt);
    this.gameObject.x = localPt.x;
    this.gameObject.y = localPt.y;
    
    //  As we drag the ship around inc the angle
    this.angle += 0.01;
    
    //  This just circles the ball around the sprite being dragged
    this.ball.x = this.gameObject.x + 220 * Math.cos(this.angle);
    this.ball.y = this.gameObject.y + 220 * Math.sin(this.angle);
    
    //  And this points the ball at the current pointer
    this.ball.rotation = this.getScript('qc.arcade.RigidBody').angleBetween(this.ball) + Math.PI;
};

UI.prototype.onDragEnd = function(e) {
   this.ball.alpha = 0.5;  
};
