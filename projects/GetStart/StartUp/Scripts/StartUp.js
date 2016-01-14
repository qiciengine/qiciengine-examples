// 定义本工程的名字空间
qc.startup = {};

// 用来存放所有的全局数据（函数、变量等）
window.G = qc.startup.G = {};

// 初始化逻辑
qc.initGame = function(game) {
    game.log.trace('Start the game logic.');
    
	// 将game实例的引用记录下来，方便在其他逻辑脚本模块中访问
    G.game = game;

    // 我的数据
    G.me = new qc.startup.Me();
    
	// 怪物管理模块
    G.monsters = new qc.startup.MonsterManager();
    
    // TODO: 其他逻辑待补充
};
