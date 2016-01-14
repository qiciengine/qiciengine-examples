var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
    this.speed = 4;
}, {
    ufo: qc.Serializer.NODE,
    leftBtn: qc.Serializer.NODE,
    rightBtn: qc.Serializer.NODE
});

UI.prototype.update = function() {
    var self = this,
        input = self.game.input,
        ufo = self.ufo;
    
    if (input.isKeyDown(qc.Keyboard.LEFT)) {
        ufo.x -= this.speed;
        if (ufo.x < 0) ufo.x = 0;
        ufo.rotation = -15 * Math.PI/180;
        self.leftBtn.alpha = 0.6;
        
        // follow the ufo
        self.followUfo();
    }
    else if (input.isKeyDown(qc.Keyboard.RIGHT)) {
        ufo.x += this.speed;
        if (ufo.x > this.gameObject.width) ufo.x = this.gameObject.width;
        ufo.rotation = 15 * Math.PI/180;
        self.rightBtn.alpha = 0.6;
        
        // follow the ufo
        self.followUfo();
    }
    else {
        ufo.rotation = 0;
        this.leftBtn.alpha = 0;
        this.rightBtn.alpha = 0;
    }
};

UI.prototype.followUfo = function() {
    var w = this.game.width;
    var x = -this.ufo.x + w/2;
    if (x < -this.gameObject.width + w) {
        x = -this.gameObject.width + w;
    }
    else if (x > 0) {
        x = 0;
    }
    this.gameObject.x = x;
};
