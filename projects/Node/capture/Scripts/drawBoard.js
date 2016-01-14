// define a user behaviour
var drawBoard = qc.defineBehaviour('qc.engine.drawBoard', qc.Behaviour, function() {
    // need this behaviour schedule in editor
    //this.runInEditor = true;
}, {
    // fields need to serialize
});

// Awake is called when the script instance is being loaded.
drawBoard.prototype.awake = function() {
	var ctx = this.gameObject;

    ctx.moveTo(5, 5);
    ctx.lineStyle(4, 0x000000, 0.8);
    ctx.lineTo(155, 5);
    ctx.lineTo(155, 155);
    ctx.lineTo(5, 155);
    ctx.lineTo(5, 5);
};
