var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
    leftLabel: qc.Serializer.NODE,
    middleLabel: qc.Serializer.NODE,
    rightLabel: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this, input = self.game.input;
    
    this.addListener(input.onPointerDown, self.onPointerDown, self);
    this.addListener(input.onPointerUp, self.onPointerUp, self);
};

UI.prototype.onPointerDown = function(id, x, y) {
    var self = this,
        input = self.game.input;
    
    var pointer = input.getPointer(id);
    if (pointer.isMouse) {
        if (pointer.id === qc.Mouse.BUTTON_LEFT) {
            self.leftLabel.text = 'Left Button: true';
        }
        else if (pointer.id === qc.Mouse.BUTTON_MIDDLE) {
            self.middleLabel.text = 'Middle Button: true';
        }
        else if (pointer.id === qc.Mouse.BUTTON_RIGHT) {
            self.rightLabel.text = 'Right Button: true';
        }
    }
};

UI.prototype.onPointerUp = function(id, x, y) {
    var self = this,
        input = self.game.input;
    
    var pointer = input.getPointer(id);
    if (pointer.isMouse) {
        if (pointer.id === qc.Mouse.BUTTON_LEFT) {
            self.leftLabel.text = 'Left Button: false';
        }
        else if (pointer.id === qc.Mouse.BUTTON_MIDDLE) {
            self.middleLabel.text = 'Middle Button: false';
        }
        else if (pointer.id === qc.Mouse.BUTTON_RIGHT) {
            self.rightLabel.text = 'Right Button: false';
        }
    }
};
