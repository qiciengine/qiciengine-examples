/**
 * 请求放入指定格子，如果成功放入返回true，否则返回false
 */
qc.Tetris.operation.putIn = function(index, pos) {
    var shape = qc.Tetris.Shapes.pool[index],
        board = qc.Tetris.board,
        ui = qc.Tetris.game.ui,
        log = qc.Tetris.game.log;
    log.trace('尝试将({0})放入({1})', index, pos);

    if (!board.checkPutIn(pos, shape.list)) {
        // 禁止放入
        return false;
    }
    log.trace('放入格子：({0})', pos);

    // 更新棋盘信息
    board.putIn(pos, shape.list, shape.value);

    // 计算可以消除的行，并同时消除掉
    var lines = board.getFullLines();
    lines.forEach(function(flag) {
        var children = ui.killLineEffect.find(flag).gameObject.children;
        var pts = [];
        children.forEach(function(child) { pts.push(child.name); });
        board.clearLine(pts);
    });

    // 计算分数明细，并添加之
    var scoreDetail = qc.Tetris.operation.calcScore(lines);
    qc.Tetris.score.current += scoreDetail.total;

    // 替换为新的形状
    qc.Tetris.Shapes.pool.splice(index, 1);
    qc.Tetris.Shapes.pool.push(qc.Tetris.Shapes.random());

    // 重新绘制棋盘
    ui.board.redraw();

    // 行消除与分数增加的动画表现
    if (lines.length > 0) {
        for (var i = 0; i < lines.length; i++) {
            ui.killLineEffect.play(i, lines[i], scoreDetail.lines[i]);
        }
    }

    // 当前分数的动画表现
    ui.currentScore.setScore();

    // 形状飞入的动画表现，并将旧的形状删除掉
    ui.pool.remove(index);
    ui.pool.add(2);
    ui.pool.flyIn(index);

    // 死亡检测
    if (board.die) {
        // 延迟显示死亡界面
        log.trace('Game Over!');
        qc.Tetris.game.timer.add(3000, function() {
            ui.onDie();
        });
    }

    // 放入成功了
    return true;
};

/**
 * 计算分数明细
 * total: 总分数
 * lines: [各行的分数]
 */
qc.Tetris.operation.calcScore = function(lines) {
    var scores = {
        total: 40,
        lines: []
    };
    if (lines.length < 1) return scores;

    // 计算加成
    var append = Math.max(0, lines.length - 1 * 10);

    for (var i = 0; i < lines.length; i++) {
        var flag = lines[i];

        var line = qc.Tetris.game.ui.killLineEffect.find(flag);
        var len = line.gameObject.children.length;
        scores.lines[i] = len * 20 + append * len;
        scores.total += scores.lines[i];

        // 40合并到第一行去做表现
        if (i === 0) {
            scores.lines[i] += 40;
        }
    }

    return scores;
};