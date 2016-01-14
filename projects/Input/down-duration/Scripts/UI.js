var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
    this.duration = -1;
}, {
    label: qc.Serializer.NODE
});

UI.prototype.update = function() {
    var input = this.game.input;
    if (input.isAnyMouseDown()) {
        this._start = this.game.time.now;
    }
    
    if (input.isAnyMouse()) {
        this.duration = this.game.time.now - this._start;
        this.gameObject.alpha = 1;
    }
    else {
        this.duration = -1;
        this.gameObject.alpha = 0.5;
    }
    
    this.label.text = 'Duration: ' + this.duration;
};
