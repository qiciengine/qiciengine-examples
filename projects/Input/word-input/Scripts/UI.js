var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
    var self = this,
        input = self.game.input;
    this.addListener(input.onKeyDown, self.onKeyDown, self);
};

UI.prototype.onKeyDown = function(keyCode) {
    this.gameObject.text += ' ' + keyCode;  
};
