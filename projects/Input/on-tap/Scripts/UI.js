var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
    textures: qc.Serializer.TEXTURES
});

UI.prototype.onClick = function(event) {
    // double click?
    if (event.isTap) {
        // Yes! Change the texture
        if (this.gameObject.texture === this.textures[0]) 
            this.gameObject.texture = this.textures[1];
        else
            this.gameObject.texture = this.textures[0];
        this.gameObject.resetNativeSize();
    }
	
    if (event.isDoubleTap) {
        this.gameObject.colorTint = new qc.Color(0xff00ffff);
    }
    else if (event.isDoubleClick) {
        this.gameObject.colorTint = new qc.Color(0xffff00ff);
    }
    else {
        this.gameObject.colorTint = new qc.Color(0xffffffff);
    }
    
    // Change alpha
    this.gameObject.alpha = (this.gameObject.alpha === 1) ? 0.5: 1;
};

