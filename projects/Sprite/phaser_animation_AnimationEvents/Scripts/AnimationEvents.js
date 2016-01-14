/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var AnimationEvents = qc.defineBehaviour('qc.demo.AnimationEvents', qc.Behaviour, function() {
    this._count = 0;
    this.startClue = null;
    this.loopClue = null;
    this.stopClue = null;
    this.background = null;
}, {
    startClue: qc.Serializer.NODE,
    loopClue: qc.Serializer.NODE,
    stopClue: qc.Serializer.NODE,
    background: qc.Serializer.NODE
});

/**
 * 初始化处理
 */
AnimationEvents.prototype.awake = function() {
    var self = this,
        o = self.gameObject;

    // 动作开始播放的事件
    this.addListener(o.onStart, function() {
        self.startClue.visible = true;
    });

    // 动作播放一轮结束
    this.addListener(o.onLoopFinished, function() {
        self.loopClue.visible = true;
        self._count++;
        self.loopClue.text = 'Animation looped*' + self._count;

        if (self._count > 2) {
            // 结束动作播放
            console.log(o.isPlaying);
            o.stop();
        }
    });

    // 动作播放结束的事件
    this.addListener(o.onFinished, function() {
        self.stopClue.visible = true;
    });

    // 开始播放动作
    o.playAnimation('run', 1.0, true);
};

/**
 * 帧调度
 */
AnimationEvents.prototype.update = function() {
    if (this.gameObject.isPlaying) {
        this.background.x--;
    }
};
