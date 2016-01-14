var GameWorld = qc.defineBehaviour('qc.JumpingBrick.GameWorld', qc.Behaviour, function() {
	var self = this;

	// 设置到全局中
    JumpingBrick.gameWorld = self;

	// 创建结束监听
	self.onGameOver = new qc.Signal();

	// 分数更新的事件
	self.onScoreChanged = new qc.Signal();

	self.levelInfo = [];

	self.runInEditor = true;
}, {

});

/**
 * 掉出屏幕外结束
 */
GameWorld.GAMEOVER_DEADLINE = 1;
/**
 * 碰撞结束
 */
GameWorld.GAMEOVER_BLOCK = 2;

GameWorld.prototype.awake = function() {
 	var self = this;
	// 初始化状态
	this.resetWorld();
};

/**
 * 重置世界
 */
GameWorld.prototype.resetWorld = function() {
	var self = this;

	// 方块在虚拟世界坐标的位置
	self.x = 0;
	self.y = 480;

	// 方块在虚拟世界的速度值
	self.horV = 0;
	self.verV = 0;

	// 当前受到的重力
	self.gravity = JumpingBrick.gameConfig.gravity;

	// 维持上升速度的剩余时间
	self.verKeepTime = 0;

	// 死亡线的y轴坐标值
	self.deadline = 0;

	// 已经生成的关卡
	self.levelInfo = [];

	// 是否游戏结束
	self.gameOver = false;

	// 当前的分数
	self.setScore(0, true);
};

/**
 * 获取要保存的游戏数据
 */
GameWorld.prototype.saveGameState = function() {
	var self = this;
    var saveData = {
        deadline : self.deadline,
        x : self.x,
        y : self.y,
        horV : self.horV,
        verV : self.verV,
        gravity : self.gravity,
        verKeepTime : self.verKeepTime,
        levelInfo : self.levelInfo,
        gameOver : self.gameOver,
        score : self.score
    };
    return saveData;
};

/**
 * 恢复游戏
 */
GameWorld.prototype.restoreGameState = function(data) {
    if (!data) {
        return false;
    }
    var self = this;
	self.deadline = data.deadline;
	self.x = data.x;
	self.y = data.y;
	self.horV = data.horV;
	self.verV = data.verV;
	self.gravity = data.gravity;
	self.verKeepTime = data.verKeepTime;
	self.levelInfo = data.levelInfo;
	self.gameOver = data.gameOver;
	self.setScore(data.score, true);
    return true;
};

/**
 * 获取指定y轴值对应的关卡
 */
GameWorld.prototype.transToLevel = function(y) {
	// 关卡从0开始，-1表示第一屏的960区域
	return y < 960 ? -1 : Math.floor((y - 960) / JumpingBrick.gameConfig.levelInterval);
};

/**
 * 获取指定关卡开始的y轴坐标
 */
GameWorld.prototype.getLevelStart = function(level) {
	return level < 0 ? 0 : (960 + level * JumpingBrick.gameConfig.levelInterval);
};

/**
 * 删除关卡数据
 */
GameWorld.prototype.deleteLevelInfo = function(level) {
	var self = this;

	delete self.levelInfo[level];
};

/**
 * 设置分数
 */
GameWorld.prototype.setScore = function(score, force) {
	if (force || score > this.score) {
		this.score = score;
		this.onScoreChanged.dispatch(score);	
	}
};

/**
 * 获取关卡信息
 */
GameWorld.prototype.getLevelInfo = function(level) {
	if (level < 0) 
		return null;

	var self = this;
	var levelInfo = self.levelInfo[level];

	if (!levelInfo) {
		// 不存在则生成
		levelInfo = self.levelInfo[level] = self.buildLevelInfo(level);
	}
	return levelInfo;
};

/**
 * 生成关卡
 */
GameWorld.prototype.buildLevelInfo = function(level) {
	var self = this,
		gameConfig = JumpingBrick.gameConfig,
		blockSide = gameConfig.blockSide,
		levelHeight = gameConfig.levelHeight;

	var levelInfo = {
		color: gameConfig.levelColor[Math.floor(level / gameConfig.levelColorStride) % gameConfig.levelColor.length],
		startY: self.getLevelStart(level),
		passArea: null,
		block: []
	};

	// 获取关卡的配置
	var cfg = JumpingBrick.gameConfig.getLevelConfig(level);

	// 根据配置的通行区域生成关卡的通行区域
	var startX = self.game.math.random(cfg.passScopeMin, cfg.passScopeMax - cfg.passWidth);
	levelInfo.passArea = new qc.Rectangle(
		startX, 
		0, 
		cfg.passWidth,
		levelHeight);

	// 生成阻挡块
	var idx = -1, len = cfg.block.length;
	while (++idx < len) {
		var blockCfg = cfg.block[idx];
		// 阻挡块x坐标的生成范围是可通行区域的左侧x + minX 到 右侧x + maxX
		var blockX = startX + 
			self.game.math.random(blockCfg.minx, cfg.passWidth + blockCfg.maxx - blockSide);
		// 阻挡块y坐标的生成范围是关卡上边界y + minY 到上边界y + maxY
		var blockY = JumpingBrick.gameConfig.levelHeight + 
			self.game.math.random(blockCfg.miny, blockCfg.maxy - blockSide);

		levelInfo.block.push(new qc.Rectangle(
			blockX,
			blockY,
			blockSide,
			blockSide));
	}
	return levelInfo;
};

/**
 * 控制方块跳跃
 * @param {number} direction - 跳跃的方向 < 0 时向左跳，否则向右跳
 */
GameWorld.prototype.brickJump = function(direction) {
	var self = this;
	// 如果重力加速度为0，表示方块正在靠边滑动，只响应往另一边跳跃的操作
	if (self.gravity === 0 && direction * self.x >= 0) {
		return;
	}
	// 恢复重力影响
	self.gravity = JumpingBrick.gameConfig.gravity;
	self.verV = JumpingBrick.gameConfig.verVelocity;
	self.horV = (direction < 0 ? -1 : 1) * JumpingBrick.gameConfig.horVelocity;
	self.verKeepTime = JumpingBrick.gameConfig.verVelocityKeepTime;
};

/**
 * 游戏结束的处理
 */
GameWorld.prototype.doGameOver = function(type) {
	var self = this;
	self.gameOver = true;
	self.onGameOver.dispatch(type);
};

/**
 * 更新分数
 */
GameWorld.prototype.calcScore = function() {
	var self = this;

	// 当前方块所在关卡
	var currLevel = self.transToLevel(self.y);
	// 当前关卡的起点
	var levelStart = self.getLevelStart(currLevel);

	// 当方块完全脱离关卡通行区域后计分
	var overLevel = self.y - levelStart - JumpingBrick.gameConfig.levelHeight - JumpingBrick.gameConfig.brickRadius;
	var currScore = overLevel >= 0 ? currLevel + 1  : 0;
	self.setScore(currScore);
};

/**
 * 移动方块
 * @param {number} delta - 经过的时间
 */
GameWorld.prototype.moveBrick = function(delta) {
	var self = this;

	// 首先处理水平方向上的移动
    self.x += self.horV * delta;

    // 再处理垂直方向上得移动
    if (self.verKeepTime > delta) {
    	// 速度保持时间大于经历的时间
        self.y += self.verV * delta;
        self.verKeepTime -= delta;
    }
    else if (self.verKeepTime > 0) {
    	// 有一段时间在做匀速运动，一段时间受重力加速度影响
        self.y += self.verV * delta + 0.5 * self.gravity * Math.pow(delta - self.verKeepTime, 2);
        self.verV += self.gravity * (delta - self.verKeepTime);
        self.verKeepTime = 0;
    }
    else {
    	// 完全受重力加速度影响
        self.y += self.verV * delta + 0.5 * self.gravity * Math.pow(delta, 2);
        self.verV += self.gravity * delta;
    }
};

/**
 * 块与阻挡的碰撞检测
 */
GameWorld.prototype.checkRectCollide = function(x, y, width, height) {
    var self = this,
    	brickRadius = JumpingBrick.gameConfig.brickRadius;

	var	upDis = self.y - y - height; // 距离上边距离
	if (upDis >= brickRadius) 
		return false;

    var downDis = y- self.y; // 距离下边距离
    if (downDis >= brickRadius)
    	return false;

    var leftDis = x - self.x; // 距离左边距离
    if (leftDis >= brickRadius)
    	return false;

    var rightDis = self.x - x - width; // 记录右边距离
    if (rightDis >= brickRadius)
    	return false;

    // 当块中点的y轴值，在阻挡的范围内时，中点距离左右边的边距小于brickRadius时相交
    if (downDis < 0 && upDis < 0) {
        return leftDis < brickRadius && rightDis < brickRadius;
    }

    // 当块的中点在阻挡范围上时
    if (upDis > 0) {
        return leftDis < brickRadius - upDis && rightDis < brickRadius - upDis;
    }
    // 当块的中点在阻挡范围下时
    if (downDis > 0) {
        return leftDis < brickRadius - downDis && rightDis < brickRadius - downDis;
    }
    return false;
};

/**
 * 碰撞检测
 */
GameWorld.prototype.checkCollide = function() {
    var self = this;

    // game节点铺满了屏幕，那么节点的宽即为屏幕的宽
    var width = this.gameObject.width;
    var brickRadius = JumpingBrick.gameConfig.brickRadius;
    var leftEdge = -0.5 * width;
    var rightEdge = 0.5 * width;

    // 下边缘碰撞判定，方块中心的位置距离下边缘的距离小于方块的中心到顶点的距离
    if (this.deadline - self.y > brickRadius) {
        return GameWorld.GAMEOVER_DEADLINE;
    }

    // 左边缘判定，方块中心的位置距离左边缘的距离小于方块的中心到顶点的距离
    if (self.x - leftEdge < brickRadius) {
        self.x = leftEdge + brickRadius;
        self.horV = 0;
        self.verV = JumpingBrick.gameConfig.verLockVelocity;
        self.gravity = 0;
    }
    // 右边缘判定，方块中心的位置距离右边缘的距离小于方块的中心到顶点的距离
    if (rightEdge - self.x < brickRadius) {
        self.x = rightEdge - brickRadius;
        self.horV = 0;
        self.verV = JumpingBrick.gameConfig.verLockVelocity;
        self.gravity = 0;
    }

    // 方块在世界中，只会与当前关卡的阻挡和下一关的阻挡进行碰撞
    var currLevel = self.transToLevel(self.y);
    for (var idx = currLevel, end = currLevel + 2; idx < end; idx++) {
    	var level = self.getLevelInfo(idx);
    	if (!level) 
    		continue;

    	var passArea = level.passArea;
    	// 检测通道左侧和右侧阻挡
    	if (self.checkRectCollide(
    			leftEdge, 
    			passArea.y + level.startY, 
    			passArea.x - leftEdge, 
    			passArea.height) ||
    		self.checkRectCollide(
    			passArea.x + passArea.width, 
    			passArea.y + level.startY, 
    			rightEdge - passArea.x - passArea.width,
    			passArea.height)) {
    		return GameWorld.GAMEOVER_BLOCK;
    	}

    	// 检测本关的阻挡块
    	var block = level.block;
    	var len = block.length;
	    while (len--) {
	        var rect = block[len];
	        if (self.checkRectCollide(rect.x, rect.y + level.startY, rect.width, rect.height)) {
	            return GameWorld.GAMEOVER_BLOCK;
	        }
	    }
    }
    
    return 0;
};

/**
 * 更新逻辑处理
 * @param {number} delta - 上一次计算到现在经历的时间，单位：秒
 */
GameWorld.prototype.updateLogic = function(delta) {
	var self = this,
		screenHeight = self.gameObject.height;
	if (self.gameOver) {
		return;
	}
	// 将经历的时间分隔为一小段一小段进行处理，防止穿越
	var calcDetla = 0;
	while (delta > 0) {
		calcDetla = Math.min(delta, JumpingBrick.gameConfig.preCalcDelta);
		delta -= calcDetla;
		// 更新方块位置
		self.moveBrick(calcDetla);
		// 检测碰撞
		var ret = self.checkCollide();
		if (ret !== 0) {
			// 如果碰撞关卡阻挡或者碰撞死亡线则判定死亡
			self.doGameOver(ret);
			return;
		}
	}

	// 更新DeadLine
	self.deadline = Math.max(self.y - screenHeight * JumpingBrick.gameConfig.raiseLimit, self.deadline);

	// 结算分数
	self.calcScore();
};