/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var SliderShow = qc.defineBehaviour('qc.demo.SliderShow', qc.Behaviour, function() {
    this.textures = [];
    this.imageA = null;
    this.imageB = null;
}, {
    imageA: qc.Serializer.NODE,
    imageB: qc.Serializer.NODE,
    textures: qc.Serializer.TEXTURES
});

SliderShow.prototype.onEnable = function() {
    var self = this;

    // Init first pic.
    self.imageA.texture = self.textures[0];
    self.imageA.resetNativeSize();
    self.imageA.alpha = 1;
    self.imageB.alpha = 0;
    self.index = 0;

    self.timer = self.game.timer.add(3000, self.fadePictures, self);    
};

SliderShow.prototype.fadePictures = function() {
    var self = this;
    self.index++;
    if (self.index >= self.textures.length) self.index = 0;

    var fadeOut = self.imageA.alpha === 0 ? self.imageB : self.imageA,
        fadeIn = self.imageA.alpha !== 0 ? self.imageB : self.imageA;
    var ta1 = fadeOut.getScript('qc.TweenAlpha'),
        ta2 = fadeIn.getScript('qc.TweenAlpha');
    fadeIn.texture = self.textures[self.index];
    fadeIn.resetNativeSize();

    // Fade Out
    ta1.from = 1;
    ta1.to = 0;
    ta1.resetToBeginning();
    ta1.playForward();

    // Fade In
    ta2.from = 0;
    ta2.to = 1;
    ta2.resetToBeginning();
    ta2.onFinished.addOnce(function() {
        // Change Pic.
        self.timer = self.game.timer.add(3000, self.fadePictures, self);
    });
    ta2.playForward();
};
