var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
    background: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    this.addListener(self.gameObject.onEnter, function() {
        self._isEnter = true;
        self.gameObject.frame = 'button_sprite_sheet_03.png';
    });
    this.addListener(self.gameObject.onExit, function() {
        self._isEnter = false;
        self.gameObject.frame = 'button_sprite_sheet_02.png';
    });
};

UI.prototype.onDown = function() {
    this.gameObject.frame = 'button_sprite_sheet_01.png';
};

UI.prototype.onUp = function() {
    if (this._isEnter) {
        this.gameObject.frame = 'button_sprite_sheet_03.png';
    }  
    else {
        this.gameObject.frame = 'button_sprite_sheet_02.png';
    }
};

UI.prototype.onClick = function() {
    this.background.visible = !this.background.visible;
};
