/**
 * 消除一行的表现界面
 */
var LineUI = qc.defineBehaviour('qc.tetris.LineUI', qc.Behaviour, function() {
    var self = this;

    // 描述行的信息
    self.flag = 'xy';
    self.x = 0;
    self.y = 0;
}, {
    blockPrefab: qc.Serializer.PREFAB
});

Object.defineProperties(LineUI.prototype, {
    /**
     * 取得行标记
     */
    key: {
        get: function() {
            return this.flag + qc.Tetris.makePos(this.x, this.y);
        }
    },

    /**
     * 取得本行的格子数量
     */
    count: {
        get: function() {
            return this.gameObject.children.length;
        }
    }
});

/**
 * 初始化行
 */
LineUI.prototype.init = function(flag, start, end) {
    var self = this;
    self.flag = flag;
    self.x = start[0];
    self.y = start[1];

    // 创建一个格子
    var createBlock = function(pos) {
        var block = self.game.add.clone(self.blockPrefab, self.gameObject);
        block.frame = 'white.png';
        block.anchoredX = qc.Tetris.board.data[pos].x;
        block.anchoredY = qc.Tetris.board.data[pos].y;
        block.name = pos;
        return block;
    };

    switch (flag) {
    case 'xy':
        for (var x = self.x, y = self.y; true;) {
            createBlock(qc.Tetris.makePos(x, y));

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
        break;

    case 'y':
        for (var x = start[0], y = start[1]; x <= end[0];) {
            createBlock(qc.Tetris.makePos(x, y));
            x++;
        }
        break;

    case 'x':
        for (var x = start[0], y = start[1]; y <= end[1];) {
            createBlock(qc.Tetris.makePos(x, y));
            y++;
        }
    }

    // 初始时隐藏掉
    self.gameObject.name = self.key;
    self.gameObject.visible = false;
};

/**
 * 播放消失的动画
 */
LineUI.prototype.playDisappear = function() {
    var self = this,
        o = self.gameObject,
        ta = self.getScript('qc.TweenAlpha');

    o.visible = true;
    ta.resetToBeginning();
    ta.onFinished.addOnce(function() {
        // 隐藏掉
        o.visible = false;
    });
    ta.playForward();
};