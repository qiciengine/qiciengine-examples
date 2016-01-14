/**
 * 游戏控制，将虚拟世界投影到游戏世界，并管理暂停等处理
 */
var GameControl = qc.defineBehaviour('qc.JumpingBrick.GameControl', qc.Behaviour, function() {
	var self = this;

    // 设置到全局中
    JumpingBrick.gameControl = self;

    // 方块
    self.brick = null;

    // 关卡的父节点，用于动态挂载关卡节点
    self.levelParent = null;

    // 开始指引界面
    self.startManual = null;

    // 暂停界面
    self.pausePanel = null;

    // 暂停按钮
    self.pauseButton = null;

    // 回到游戏按钮
    self.resumeButton = null;

    // 当前的状态
    self._state = 0;
}, {
    brick: qc.Serializer.NODE,
    tableViewNode : qc.Serializer.NODE,
    scoreText: qc.Serializer.NODE,
    levelParent: qc.Serializer.NODE,
    startManual: qc.Serializer.NODE,
    pausePanel: qc.Serializer.NODE,
    pauseButton: qc.Serializer.NODE,
    resumeButton: qc.Serializer.NODE
});

/**
 * 游戏开始时，指引界面状态
 */
GameControl.STATE_MANUEL 	= 0;
/**
 * 游戏运行状态
 */
GameControl.STATE_RUN 		= 1;
/**
 * 游戏暂停状态
 */
GameControl.STATE_PAUSE 	= 2;

/**
 * 游戏结束处理
 */
GameControl.STATE_GAMEOVER 	= 3;

/**
 * 初始化
 * @return {[type]} [description]
 */
GameControl.prototype.awake = function() {
	var self = this,
		config = JumpingBrick.gameConfig;

    // 监听节点的鼠标或者触摸按下事件
    self.addListener(self.gameObject.onDown, self.doPointDown, self);
    // 监听键盘事件
    self.addListener(self.game.input.onKeyDown, self.doKeyDown, self);
    // 监听暂停按钮
    self.pauseButton && self.addListener(self.pauseButton.onClick, self.doPause, self);
    // 监听恢复按钮
    self.resumeButton && self.addListener(self.resumeButton.onClick, self.doResume, self);
    // 监听游戏结束
    self.addListener(JumpingBrick.gameWorld.onGameOver, self.doGameOver, self);

  	// 监听分数变化
  	self.addListener(JumpingBrick.gameWorld.onScoreChanged, self.doScoreChanged, self);

    // 获取Brick上的结束时播放的TweenPosition
    self._brickTweenPosition = self.brick.getScript('qc.TweenPosition');
    if (self._brickTweenPosition)
    self.addListener(self._brickTweenPosition.onFinished, self.doGameFinished, self);

    // 获取levelParent上的结束时播放的TweenPosition
    self._levelTweenPosition = self.levelParent.getScript('qc.TweenPosition');

    // 根据配置初始化方块信息
    if (self.brick) {
    	self.brick.width = self.brick.height = config.brickSide;
    	self.brick.rotation = Math.PI / 4;
    }

    // 初始化
    self.switchState(GameControl.STATE_MANUEL);
};

GameControl.prototype.resetFPS = function() {
	var self = this;
	self.game.debug.total = 0;
	self._fpsCount = 1;
};

/**
 * 每帧更新
 */
GameControl.prototype.update = function() {
	var self = this;

	if (self.state === GameControl.STATE_RUN) {
		// 只有运行状态才处理虚拟世界更新
		var delta = self.game.time.deltaTime * 0.001;
		JumpingBrick.gameWorld.updateLogic(delta);
		self.syncWorld();
	}

	// 帧率分析，如果当前能支持60帧则60帧调度
	if (self._fpsCount > 50) {
		var cost = self.game.debug.total / self._fpsCount;
		self._fpsCount = 1;
		self.game.debug.total = 0;
		if (cost < 10) {
			self.game.time.frameRate = 60;
		}
		else {
			self.game.time.frameRate = 30;
		}
	}
	else {
		self._fpsCount++;
	}
};

/**
 * 切换状态
 */
GameControl.prototype.switchState = function(state) {
	var self = this;
	self.state = state;
	self.startManual.visible = self.state === GameControl.STATE_MANUEL;
	if (self.startManual.visible) {
		// 进入开始引导时，必须重置游戏世界
		JumpingBrick.gameWorld.resetWorld();
		self.tableViewNode.getScript('com.qici.extraUI.TableView').revokeAllCell();
	}

 	self.pausePanel.visible = self.state === GameControl.STATE_PAUSE;

 	self.syncWorld();
};

/**
 * 销毁时
 */
GameControl.prototype.onDestroy = function() {
   // 预生成的关卡节点清理
    this._blockPool = [];

    // 使用中的关卡节点清理
    this._showLevel = [];
};

/**
 * 处理方块跳跃
 */
GameControl.prototype.doBrickJump = function(direction) {
	var self = this,
		world = JumpingBrick.gameWorld;

	if (self.state === GameControl.STATE_MANUEL) {
		// 引导状态跳跃直接切换到运行状态
		self.switchState(GameControl.STATE_RUN);
	}

	world.brickJump(direction);
};

/**
 * 处理点击
 */
GameControl.prototype.doPointDown = function(node, event) {
	var self = this;
	if (self.state !== GameControl.STATE_MANUEL &&
		self.state !== GameControl.STATE_RUN) {
		return;
	}
	var localPoint = self.gameObject.toLocal({x: event.source.x, y: event.source.y});
	var halfWidth = self.gameObject.width * 0.5;
	self.doBrickJump(localPoint.x - halfWidth);
};

/**
 * 处理键盘
 */
GameControl.prototype.doKeyDown = function(keycode) {
	var self = this;
	if (keycode === qc.Keyboard.LEFT || keycode === qc.Keyboard.RIGHT) {
        if (self.state !== GameControl.STATE_MANUEL &&
			self.state !== GameControl.STATE_RUN) {
			return;
		}
        self.doBrickJump(keycode === qc.Keyboard.LEFT ? -1 : 1);
    }
    else if (keycode === qc.Keyboard.ENTER || keycode === qc.Keyboard.SPACEBAR) {
    	if (self.state === GameControl.STATE_RUN) {
    		self.doPause();
    	}
    	else if (self.state === GameControl.STATE_PAUSE) {
    		self.doResume();
    	}
    }
};

/**
 * 处理暂停
 */
GameControl.prototype.doPause = function() {
	var self = this;
	self.saveGameState();
	self.switchState(GameControl.STATE_PAUSE);
};

/**
 * 处理恢复
 */
GameControl.prototype.doResume = function() {
	var self = this;
	self.clearGameState();
	self.switchState(GameControl.STATE_RUN);
};

/**
 * 处理游戏结束
 */
GameControl.prototype.doGameOver = function(type) {
	var self = this;
	// 切换状态
	self.switchState(GameControl.STATE_GAMEOVER);
	// 播放结束动画
	if (type !== qc.JumpingBrick.GameWorld.GAMEOVER_DEADLINE && self._brickTweenPosition) {
		if (self._levelTweenPosition) {
			self._levelTweenPosition.setCurrToStartValue();
		    self._levelTweenPosition.setCurrToEndValue();
		    self._levelTweenPosition.to.x += 6;
		    self._levelTweenPosition.to.y += 6;
		    self._levelTweenPosition.resetToBeginning();
		    qc.Tween.playGroup(self.levelParent, 1);
		}
		self._brickTweenPosition.setCurrToStartValue();
		self._brickTweenPosition.setCurrToEndValue();
		self._brickTweenPosition.to.y = -2 * JumpingBrick.gameConfig.brickRadius;
		self._brickTweenPosition.duration = Math.max(0.01, Math.sqrt(Math.abs(2 * (self._brickTweenPosition.to.y - self._brickTweenPosition.from.y) / JumpingBrick.gameConfig.gravity)));	
		self._brickTweenPosition.resetToBeginning();
		qc.Tween.playGroup(self.brick, 1);
	}
	else {
		self.doGameFinished();
	}
	
};

/**
 * 保存游戏
 */
GameControl.prototype.saveGameState = function() {
	var self = this,
		gameWorld = JumpingBrick.gameWorld,
		data = JumpingBrick.data;

    var saveData = gameWorld.saveGameState();
    data.saveGameState(saveData);
};

/**
 * 恢复游戏
 */
GameControl.prototype.restoreGameState = function() {
	var self = this,
		gameWorld = JumpingBrick.gameWorld,
		data = JumpingBrick.data;
	var saveData = data.restoreGameState();
	if (saveData) {
		gameWorld.restoreGameState(saveData);
		self.switchState(GameControl.STATE_PAUSE);	
	}
};

/**
 * 清理游戏
 */
GameControl.prototype.clearGameState = function() {
	var self = this,
		data = JumpingBrick.data;
	data.clearGameState();
};

/**
 * 分数变更
 */
GameControl.prototype.doScoreChanged = function(score) {
	var self = this;
	if (self.scoreText) {
		self.scoreText.text = '' + score;
	}
	JumpingBrick.data.buildShareContent(score);
};

/**
 * 处理游戏完结
 */
GameControl.prototype.doGameFinished = function() {
	var self = this;
	// 更新数据
	JumpingBrick.data.saveScore(JumpingBrick.gameWorld.score);

	// 切换到结算界面
	qc.Tween.stopGroup(self.brick, 1);
	qc.Tween.stopGroup(self.levelParent, 1);
	self.brick.rotation = Math.PI / 4;
	JumpingBrick.uiManager.switchStateTo(qc.JumpingBrick.UIManager.GameOver);
};

/**
 * 同步世界数据
 */
GameControl.prototype.syncWorld = function() {
	var self = this,
		world = JumpingBrick.gameWorld,
		screenWidth = self.gameObject.width,
		leftEdge = -0.5 * screenWidth,
		rightEdge = 0.5 * screenWidth;

	// 同步方块
	self.brick.x = world.x;
	self.brick.y = world.y - world.deadline;

	self.levelParent.y = -world.deadline;
};