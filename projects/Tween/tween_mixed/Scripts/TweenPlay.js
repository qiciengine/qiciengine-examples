/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 曲线动作演示播放
 */
var TweenPlay = qc.defineBehaviour('qc.demo.TweenPlay', qc.Behaviour, function() {
    this.dragonbone = false;
}, {
    // 需要序列化的字段
    dragonbone: qc.Serializer.BOOLEAN
});

TweenPlay.prototype.onEnable = function() {
    // 定期播放动作
    if (this.game.device.editor) return;
    var self = this;
    this.game.timer.loop(4000, function() {
        if (!self.dragonbone) self.play();
        else {
            self.playRandom();
        }
    });
};

// 开始播放
TweenPlay.prototype.play = function() {
    var self = this,
        tp = self.getScript('qc.TweenPosition'),
        ta = self.getScript('qc.TweenAlpha');

    // 播放动作
    self.gameObject.playAnimation('jump');
    tp.resetGroupToBeginning();
    tp.playGroupForward();
};

// 被点击时播放下
TweenPlay.prototype.onClick = function() {
    if (!this.dragonbone)
        this.play();
    else
        this.playRandom();
};

// 随机播放动作
TweenPlay.prototype.playRandom = function() {
    var self = this;
    var list = this.gameObject.animationNameList;
    var index = this.game.math.random(0, list.length - 1);
    this.gameObject.playAnimation(list[index], 1, false);
    this.gameObject.onFinished.addOnce(function() {
        self.gameObject.playAnimation('idle', 1, true);
    });
};