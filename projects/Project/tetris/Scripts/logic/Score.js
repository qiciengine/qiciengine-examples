/**
 * 维护分数信息
 */
var Score = qc.Tetris.Score = function() {
    var self = this;
    self._current = 0;
    self._best = 0;

    // 将本地数据读取出来
    var game = qc.Tetris.game;
    var current = game.storage.get('current'),
        best = game.storage.get('best');
    if (current) self._current = current;    
    if (best) self._best = best;
};
Score.prototype = {};
Score.prototype.constructor = Score;

Object.defineProperties(Score.prototype, {
    current: {
        get: function() { return this._current; },
        set: function(v) {
            this._current = v;
            if (this.best < v) this.best = v;
        }
    },

    best: {
        get: function() { return this._best; },
        set: function(v) {
            this._best = v;
            var storage = qc.Tetris.game.storage;
            storage.set('best', v);
            storage.save();
        }
    }
});