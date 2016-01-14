/**
 * 管理游戏玩家的数据
 */
var Me = qc.startup.Me = function() {
	var self = this;
    
    /**
     * @property {qc.Signal} onFieldChanged
     *   当玩家的数据发生变更时，派发本事件
     */ 
	self.onFieldChanged = new qc.Signal();
    
    // 将玩家的数据反序列化出来
    self.restore();
};

Object.defineProperties(Me.prototype, {
    /**
     * @property {number} score - 玩家的分数
     */
    score: {
        get: function() { return this._score; },
        set: function(v) {
            if (this._score === v) return;
            this._score = v;
            this.onFieldChanged.dispatch('score');

            // 将数据保存到磁盘
            this.save();
        }
    }
});

/**
 * 将“我”的数据还原出来
 */
Me.prototype.restore = function() {
    // 我当前的分数
    var score = G.game.storage.get('score');
    if (score) this.score = score;
    else this.score = 0;
};

/**
 * 将玩家数据保存到磁盘
 */
Me.prototype.save = function() {
    G.game.storage.set('score', this.score);
};
