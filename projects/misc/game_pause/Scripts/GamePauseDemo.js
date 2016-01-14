// define a user behaviour
var GamePauseDemo = qc.defineBehaviour('qc.engine.GamePauseDemo', qc.Behaviour, function() {
    // need this behaviour schedule in editor
    this.inPausing = false;
}, {
    // fields need to serialize
});

// Awake is called when the script instance is being loaded.
GamePauseDemo.prototype.awake = function() {
    // 游戏暂停时，game逻辑中的update不会被调度，所以需要使用NativeClick进行操作
    this.addListener(this.gameObject.onNativeClick, this.gamePause, this);
};

// Update is called every frame, if the behaviour is enabled.
GamePauseDemo.prototype.update = function() {

};

GamePauseDemo.prototype.gamePause = function() {
    var self = this;
    // 暂停中不响应操作
    if (self.inPausing) {
        return;
    }
    self.inPausing = true;
	var position;
    if (self.game.paused) {
        // 必须先将游戏resume，才能正常播放动画效果
		self.game.paused = false;
        qc.Tween.stopGroup(self.gameObject, 1);
        qc.Tween.stopGroup(self.gameObject, 2);
        qc.Tween.resetGroupToBeginning(self.gameObject, 2, true);
		position = self.gameObject.getScript('qc.TweenPosition');
        if (position) {
            position.onFinished.removeAll(self);
            position.onFinished.addOnce(function() {
                // 需要强制更新下Button的nativeElement位置
                self.gameObject.update(true);
                self.inPausing = false;
				qc.Tween.stopGroup(self.gameObject, 1);
                qc.Tween.stopGroup(self.gameObject, 2);
                qc.Tween.resetGroupToBeginning(self.gameObject, 2);
                qc.Tween.resetGroupToBeginning(self.gameObject, 1);
                qc.Tween.playGroup(self.gameObject, 1);
            }, self);
        }
        qc.Tween.playGroup(self.gameObject, 2, true);
    }
    else {
        qc.Tween.stopGroup(self.gameObject, 1);
        qc.Tween.stopGroup(self.gameObject, 2);
        qc.Tween.resetGroupToBeginning(self.gameObject, 2);
		position = self.gameObject.getScript('qc.TweenPosition');
        if (position) {
			position.onFinished.removeAll(self);
            position.onFinished.addOnce(function() {
                // 需要强制更新下Button的nativeElement位置
                self.gameObject.update(true);
                self.inPausing = false;
                // 动画播放完成后才能暂停游戏，否则动画会无法播放出来
				self.game.paused = true;
            }, self);
        }
        qc.Tween.playGroup(self.gameObject, 2);
    }
};
