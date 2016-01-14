var ButtonCtr = qc.defineBehaviour('qc.demo.ButtonCtr', qc.Behaviour, function() {
}, {
});

ButtonCtr.prototype.awake = function() {
    var self = this;
    this.addListener(self.gameObject.onEnter, function() {
        self._isEnter = true;
        self.gameObject.frame = 'hover.png';
    });
    this.addListener(self.gameObject.onExit, function() {
        self._isEnter = false;
        self.gameObject.frame = 'normal.png';
    });
};

ButtonCtr.prototype.onClick = function() {
    alert('Click!');
};
