/**
 * 游戏结束结算界面
 */
var GameOver = qc.defineBehaviour('qc.JumpingBrick.GameOver', qc.Behaviour, function() {
	var self = this;
	JumpingBrick.gameOver = self;
}, {
	highScoreShow : qc.Serializer.NODE,
    lastScoreShow : qc.Serializer.NODE,
    newHighShow : qc.Serializer.NODE,
    descShow : qc.Serializer.NODE,
    retryButton : qc.Serializer.NODE,
    followButton : qc.Serializer.NODE,
    annoButton : qc.Serializer.NODE,
    shareButton : qc.Serializer.NODE,
    shareGuide : qc.Serializer.NODE,
    otherShareGuide : qc.Serializer.NODE,
    shareText : qc.Serializer.NODE
});


// Awake is called when the script instance is being loaded.
GameOver.prototype.awake = function() {
    var self = this;
    var cacheAsBitmap = self.gameObject.getScript('qc.CacheAsBitmap');
    self.retryButton.onClick.add(function() {
        JumpingBrick.uiManager.switchStateTo(qc.JumpingBrick.UIManager.Game);
    }, self);
    self.followButton.onClick.add(function() {
        document.location.href = JumpingBrick.data.gPage;        
    }, self);
    self.annoButton.onClick.add(function() {
        JumpingBrick.uiManager.switchStateTo(qc.JumpingBrick.UIManager.Announcement);
    }, self);
    self.shareButton.onClick.add(function() {
        if (JumpingBrick.data.isWeChat()) {
            self.shareGuide.visible = true;    
        }
        else {
            self.otherShareGuide.visible = true;
        }
        if (cacheAsBitmap) {
            cacheAsBitmap.dirty = true;
        }
    }, self);
    self.shareGuide.onClick.add(function() {
        self.shareGuide.visible = false;
        if (cacheAsBitmap) {
            cacheAsBitmap.dirty = true;
        }
    });
    self.otherShareGuide.onClick.add(function() {
        self.otherShareGuide.visible = false;
        if (cacheAsBitmap) {
            cacheAsBitmap.dirty = true;
        }
    });

    self.game.input.onKeyDown.add(function(keyCode) {
        if (!self.gameObject.worldVisible) return;
        if (keyCode === qc.Keyboard.ENTER || keyCode === qc.Keyboard.SPACEBAR) {
            JumpingBrick.uiManager.switchStateTo(qc.JumpingBrick.UIManager.Game);
        }
    }, self);
};


GameOver.prototype.refresh = function() {
	var self = this,
		data = JumpingBrick.data;
    self.shareGuide.visible = false;
    self.otherShareGuide.visible = false;
    self.highScoreShow.text = '最高分：' + data.highScore;
    self.lastScoreShow.text = data.lastScore.toString();
    self.newHighShow.visible = !!data.lastScore && data.newHigh;
    self.descShow.text = self._makeDesc(data.lastScore);
    var cache = self.gameObject.getScript('qc.CacheAsBitmap');
    if (cache) {
        cache.dirty = true;
    }
};

GameOver.prototype._makeDesc = function(score) {
    var percent = Math.min(30, score) * 2;
    if (score > 30) {
        percent += Math.min(20, score - 30);
    }
    if (score > 50) {
        percent += Math.floor((score - 50) / 2);
    }
    percent = Math.min(99, percent);
    return '你击败了全球' + parseInt(percent) + '%的玩家';
};
