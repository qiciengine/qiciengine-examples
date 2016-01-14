/**
 * 请求重新开始游戏
 */
qc.Tetris.operation.restart = function() {
    var game = qc.Tetris.game,
        ui = game.ui;

    // 清空棋盘信息
    qc.Tetris.board.restart();

    // 当前分数清0
    qc.Tetris.score.current = 0;

    // 3个形状重新替换掉
    qc.Tetris.Shapes.restart();

    // 界面初始化
    ui.restart();
};