# 分数公式与行消除判定
1. 打开__Board.js__脚本，实现die的属性：  
````javascript
    die: {
        get: function() {
            // 如果有单个点形状的，一定死不了
            var pool = qc.Tetris.Shapes.pool;
            for (var i = 0; i < pool.length; i++) {
                if (pool[i].list.length === 1) return false;
            }

            // 逐一检查，各形状能否扔来进来
            for (var pos in this.data) {
                for (var i = 0; i < pool.length; i++) {
                    if (this.checkPutIn(pos, pool[i].list)) return false;
                }
            }
            return true;
        }
    }
````
本代码判定当前游戏是否结束了  
2. 继续编辑__Board.js__脚本，实现putIn、clearLine和getFullLines接口：  
````javascript
    // 放进来
    Board.prototype.putIn = function(pos, list, value) {
        var self = this;
        var pt = qc.Tetris.readPos(pos),
            x = pt.x,
            y = pt.y;
    
        for (var i = 0; i < list.length; i++) {
            var x0 = x + list[i][0],
                y0 = y + list[i][1];
    
            // 这个点应该是空的
            var block = self.data[qc.Tetris.makePos(x0, y0)];
            block.value = value;
        }
    };
    
    // 干掉一行
    Board.prototype.clearLine = function(pts) {
        var self = this;
        pts.forEach(function(pos) {
            self.data[pos].value = 0;
        });
    };
    
    // 取得可以消除的行
    Board.prototype.getFullLines = function() {
        var self = this,
            lines = [];
    
        // 横向9条线
        var pts = self.yLines;
        for (var i = 0; i < pts.length; i++) {
            var start = pts[i], end = [start[0] + start[2] - 1, start[1]];
            var ok = true;
            for (var x = start[0], y = start[1]; x <= end[0];) {
                var pos = qc.Tetris.makePos(x, y);
                if (self.data[pos].value === 0) {
                    // 不符合，不能消除
                    ok = false; break;
                }
    
                // 下一个点
                x++;
            }
            if (ok) {
                // 这条线可以消除，添加进来
                lines.push('y' + qc.Tetris.makePos(start[0], start[1]));
            }
        }
    
        // 右斜9条线
        var pts = self.xLines;
        for (var i = 0; i < pts.length; i++) {
            var start = pts[i], end = [start[0], start[1] + start[2] - 1];
            var ok = true;
            for (var x = start[0], y = start[1]; y <= end[1];) {
                var pos = qc.Tetris.makePos(x, y);
                if (self.data[pos].value === 0) {
                    // 不符合，不能消除
                    ok = false; break;
                }
    
                // 下一个点
                y++;
            }
            if (ok) {
                // 这条线可以消除，添加进来
                lines.push('x' + qc.Tetris.makePos(start[0], start[1]));
            }
        }
    
        // 左斜的9条线
        var pts = self.xyLines;
        for (var i = 0; i < pts.length; i++) {
            var start = pts[i], end = [start[1], start[0]];
            var ok = true;
            for (var x = start[0], y = start[1]; true;) {
                var pos = qc.Tetris.makePos(x, y);
                if (self.data[pos].value === 0) {
                    // 不符合，不能消除
                    ok = false; break;
                }
    
                // 下一个点
                if (end[0] > start[0]) {
                    x++, y--;
                    if (x > end[0]) break;
                }
                else {
                    x--, y++;
                    if (x < end[0]) break;
                }
            }
            if (ok) {
                // 这条线可以消除，添加进来
                lines.push('xy' + qc.Tetris.makePos(start[0], start[1]));
            }
        }
    
        return lines;
    };
````
这3个接口分别实现了：将一个形状放进棋盘的逻辑；消除一行的逻辑；取得所有可以消除的行  
3. 打开脚本__PutIn.js__，实现calcScore函数，计算消除时增加的分数：  
````javascript
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
````