// define a user behaviour
var ShowAndHide = qc.defineBehaviour('qc.engine.ShowAndHide', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
});

// Called when the script instance is being loaded.
ShowAndHide.prototype.awake = function() {
	
};

// Called every frame, if the behaviour is enabled.
ShowAndHide.prototype.update = function() {
	// 每个节点独立的 random 概率， 1/100 概率changed
	var i, len, children;
    
    children = this.gameObject.children;
    len = children.length;
    for (i = 0; i < len; i++) {
        if (Math.random() > 1 / 100) continue;
        children[i].visible = !children[i].visible;
    }
};
