var ButtonCtr = qc.defineBehaviour('qc.demo.ButtonCtr', qc.Behaviour, function() {
}, {
    background: qc.Serializer.NODE,
    backgroundTexture: qc.Serializer.TEXTURE
});

ButtonCtr.prototype.awake = function() {
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

ButtonCtr.prototype.onDown = function() {
    this.gameObject.frame = 'button_sprite_sheet_01.png';
};

ButtonCtr.prototype.onUp = function() {
    if (this._isEnter) {
        this.gameObject.frame = 'button_sprite_sheet_03.png';
    }  
    else {
        this.gameObject.frame = 'button_sprite_sheet_02.png';
    }
};

ButtonCtr.prototype.onClick = function() {
    this.background.texture = this.backgroundTexture;
};
