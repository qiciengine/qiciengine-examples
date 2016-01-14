window.JumpingBrick = qc.JumpingBrick = {
	// 初始化各个模块
    // 数据管理及持久化处理
    data: null,
    // 界面切换管理
    uiManager: null,
    // 游戏世界
    gameWorld: null,
    // 游戏控制
    gameControl: null,
    // 游戏配置
    gameConfig: null,
    // 游戏结束界面
    gameOver: null,
    // 排行榜
    announcement: null
};

// 游戏逻辑初始化
qc.initGame = function(game) {
    // 记录下游戏实例方便访问
    JumpingBrick.game = game;

    JumpingBrick.game.time.frameRate = 100;
};