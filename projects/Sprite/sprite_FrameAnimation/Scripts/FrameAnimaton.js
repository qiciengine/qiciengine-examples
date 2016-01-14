/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var FrameAnimaton = qc.defineBehaviour('qc.demo.FrameAnimaton', qc.Behaviour, function() {
}, {
});

FrameAnimaton.prototype.awake = function() {
    var self = this,
        sprite = self.gameObject;

    console.log('Animations', sprite.animationNameList);
    console.log('Animation Type', sprite.animationType === qc.Sprite.FRAME_ANIMATION);
    console.log('Default Animation', sprite.defaultAnimation);
};

FrameAnimaton.prototype.onClick = function() {
    if (this.gameObject.isPlaying) {
        console.log('Stop playing.');
        this.gameObject.stop();
    }
    else {
        console.log('Play');
        this.gameObject.playAnimation('run', 1, true);
    }
};

FrameAnimaton.prototype.update = function() {
    console.log('Frame', this.gameObject.frame);
};
