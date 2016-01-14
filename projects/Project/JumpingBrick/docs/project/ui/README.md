# 界面控制

## 界面间的切换逻辑
使用一个类来专门负责各个不同界面间切换的逻辑。新建脚本UIManager.js，并将其加载到UIRoot上，内容如下：  
````javascript

var UIManager = qc.defineBehaviour('qc.JumpingBrick.UIManager', qc.Behaviour, function() {
	var self = this;
	JumpingBrick.uiManager = self;
}, {
	welcome: qc.Serializer.NODE,
	logining: qc.Serializer.NODE,
	gamePanel: qc.Serializer.NODE,
	gameOver: qc.Serializer.NODE,
	announcement: qc.Serializer.NODE,
    crop: qc.Serializer.NODE
});

UIManager.Welcome = 0;
UIManager.Logining = 1;
UIManager.Game = 2;
UIManager.GameOver = 3;
UIManager.Announcement = 4;

UIManager.prototype.awake = function() {
	this.switchStateTo(UIManager.Welcome);
};

/**
 * 切换状态
 */
UIManager.prototype.switchStateTo = function(state) {
	var self = this;
    JumpingBrick.game.time.frameRate = 30;
    self.welcome.visible = state === UIManager.Welcome;
    if (self.welcome.visible) {
        JumpingBrick.data.logout();
        JumpingBrick.data.buildShareContent(-1);
    }
    self.logining.visible = state === UIManager.Logining;
    self.gamePanel.visible = state === UIManager.Game;
    if (self.gamePanel.visible) {
    	JumpingBrick.gameControl.switchState(qc.JumpingBrick.GameControl.STATE_MANUEL);
        JumpingBrick.gameControl.restoreGameState();
        JumpingBrick.gameControl.resetFPS();
        // 缩小Logo
        qc.Tween.playGroupForward(self.crop, 1);
    }
    else {
        // 还原Logo
        qc.Tween.playGroupReverse(self.crop, 1);
    }

    self.gameOver.visible = state === UIManager.GameOver;
    if (self.gameOver.visible) {
    	JumpingBrick.gameOver.refresh();
    }
    self.announcement.visible = state === UIManager.Announcement;
    if (self.announcement.visible) {
        self.announcement.getScript('qc.JumpingBrick.Announcement').updateRank();
    }
};
````

## 功能界面
游戏界面已经在前面完成，这里还需要以下界面：
* __[登陆界面](UI_Welcome.md)__
* __[登陆等待界面](UI_LoginWait.md)__
* __[结算界面](UI_GameOver.md)__
* __[排行榜界面](UI_Anno.md)__
* __[界面管理](UI_Manager.md)__