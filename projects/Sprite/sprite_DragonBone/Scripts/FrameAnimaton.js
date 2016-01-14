/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var DragonBone = qc.defineBehaviour('qc.demo.DragonBone', qc.Behaviour, function() {
    this.pauseBtn = null;
    this.jumpBtn = null;
}, {
    pauseBtn: qc.Serializer.NODE,
    jumpBtn: qc.Serializer.NODE
});

DragonBone.prototype.awake = function() {
    var self = this,
        sprite = self.gameObject;

    console.log('Animations', sprite.animationNameList);
    console.log('Animation Type', sprite.animationType === qc.Sprite.DRAGON_BONES);
    console.log('Default Animation', sprite.defaultAnimation);

    // 绑定按钮的事件处理
    this.addListener(self.pauseBtn.onClick, function() {
        sprite.paused = !sprite.paused;
    });
    this.addListener(self.jumpBtn.onClick, self.onJump, self);
};

DragonBone.prototype.onClick = function() {
    if (this.gameObject.isPlaying) {
        console.log('Stop playing.');
        this.gameObject.stop();
    }
    else {
        console.log('Play');
        this.gameObject.playAnimation('stand', 1, true);
    }
};

DragonBone.prototype.onJump = function() {
    var tp = this.getScript('qc.TweenPosition');
    var sprite = this.gameObject;
    tp.resetToBeginning();
    tp.onFinished.addOnce(function() {
        sprite.playAnimation('fallEnd');
    });
    tp.playForward();
    sprite.playAnimation('jump');
};