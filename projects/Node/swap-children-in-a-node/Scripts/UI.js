var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
    this.addListener(this.game.input.onPointerUp, this.swap, this);
};

UI.prototype.swap = function() {
    var child1 = this.gameObject.find('1'),
        child2 = this.gameObject.find('2');
	this.gameObject.swapChildren(child1, child2);
};
