/**
 * 游戏入口
 */
window.Tetris = qc.Tetris = {
    // 棋盘的大小（半径）
    SIZE: 4,

    // 棋盘中，每个格子的宽度和高度
    BLOCK_W: 61,
    BLOCK_H: 67,
    
    // 没有点击时，格子之间的距离
    POOL_DISTANCE_NORMAL: 45,
    
    // 所有的格子图片
    IMAGES: [
        'gray',        // 0
        'blue',        // 1
        'cyan',        // 2
        'green',       // 3
        'lightyellow', // 4
        'red',         // 5
        'yellow'       // 6
    ],
    
    // 所有的操作指令集合
    operation: {}
};

// 游戏逻辑初始化
qc.initGame = function(game) {
    // 将游戏实例记录下来，便于访问
    Tetris.game = game;

    // 帧率显示为60帧（满帧）
    game.time.frameRate = 60;
    
    // 初始化分数信息
    Tetris.score = new qc.Tetris.Score();
    
    // 构建棋盘对象
	Tetris.board = new qc.Tetris.Board();
    
    // 3个形状
    qc.Tetris.Shapes.restart();
};

// 构建坐标
window.Tetris.makePos = function(x, y) {
    return x + '_' + y;
};

// 获取坐标
window.Tetris.readPos = function(pos) {
    var arr = pos.split('_');
    return new qc.Point(arr[0]*1, arr[1]*1);
};