var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    loadBtn: qc.Serializer.NODE,
    loadBtn2: qc.Serializer.NODE,
    displayBtn: qc.Serializer.NODE,
    displayBtn2: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    self.addListener(self.loadBtn.onClick, function() {
        // Load the image
        self.game.assets.load('Assets/texture/t1.bin');
    });
    self.addListener(self.loadBtn2.onClick, function() {
        // Load the image identified by 't2'
        self.game.assets.load('t2', 'Assets/texture/t2.bin');
    });
    
    self.addListener(self.displayBtn.onClick, function() {
        // Display the image
        self._createImage(150, -10, self.game.assets.find('Assets/texture/t1.bin'));
    });
    self.addListener(self.displayBtn2.onClick, function() {
        // Display the image
        // OR: 
        // self._createImage(450, -10, self.game.assets.find('Assets/texture/t2.bin'));
        self._createImage(450, -10, self.game.assets.find('t2'));
    });
};

// Display the image
UI.prototype._createImage = function(x, y, texture) {
    var self = this;
    var o = self.game.add.image(self.gameObject);
    o.x = x; 
    o.y = y;
    // OR: o.texture = self.game.assets.find('Assets/texture/t2.bin');
    o.texture = texture;
    o.resetNativeSize();

    if (!o.texture) alert('Load Image First!');
};