# 玩家分数管理
1. 创建脚本：Scripts/logic/Score.js：  
````javascript
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
````
__Score__类维护了两个数据：current（当前玩家的分数）、best（玩家的历史最高分）

2. 实例化Score类  
打开__Tetris.js__脚本，在initGame方法中，加入代码：
````javascript
	qc.initGame = function(game) {
	    // 将游戏实例记录下来，便于访问
	    Tetris.game = game;

	    // 帧率显示为60帧（满帧）
	    game.time.frameRate = 60;
	    
	    // 初始化分数信息
	    Tetris.score = new qc.Tetris.Score();
	};
````

3. 运行下，控制台应该没有报错，但目前游戏啥都没有
