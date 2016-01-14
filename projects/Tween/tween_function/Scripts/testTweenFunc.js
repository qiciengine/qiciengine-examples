// define a user behaviour
var testTweenFunc = qc.defineBehaviour('qc.engine.testTweenFunc', qc.Behaviour, function() {
    this.gameObject.alpha = 0;
    this.toPos = new qc.Point(50, 50);
}, {
});

// Awake is called when the script instance is being loaded.
testTweenFunc.prototype.awake = function() {
	var tween = this.gameObject.getScript('qc.TweenFunction');
    tween.resetGroupToBeginning();
    tween.playGroupForward();
};

// duration > 0
testTweenFunc.prototype.testAlphaFunc = function(factor, duration) {
	// sest alpha
    this.gameObject.alpha = factor;
    
    // set pos
    this.gameObject.x = this.toPos.x * factor;
    this.gameObject.y = this.toPos.y * factor;
};

// duration == 0, this function is only invoked once in single loop.
testTweenFunc.prototype.testOnceFunc = function(factor, duration) {
	var text = this.gameObject.find('UIText');
    text.visible = true;
};
