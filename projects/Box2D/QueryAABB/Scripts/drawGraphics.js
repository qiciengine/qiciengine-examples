// define a user behaviour
var drawGraphics = qc.defineBehaviour('qc.engine.drawGraphics', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
});

// Called when the script instance is being loaded.
drawGraphics.prototype.drawLine = function(x1, y1, x2 ,y2) {
	var ctx = this.gameObject;
	ctx.clear();
    ctx.moveTo(x1, y1);
    ctx.lineStyle(2, 0xff3388, 0.8);
    ctx.lineTo(x2, y2);
};

// 绘制区域
drawGraphics.prototype.drawRect = function(x1, y1, x2 ,y2) {
	var ctx = this.gameObject;
	ctx.clear();
    ctx.moveTo(x1, y1);
    ctx.lineStyle(2, 0xff3388, 0.8);
    ctx.lineTo(x2, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x1, y2);
    ctx.lineTo(x1, y1);
};
