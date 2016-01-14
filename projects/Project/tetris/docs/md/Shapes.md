# 形状池设计与实现

1. 本游戏中，总共有23种形状，每种类型的形状，其颜色是不同的。  
在Scripts/logic下创建脚本Shapes.js，负责各种形状的配置、抽取等。
````javascript
	var Shapes = qc.Tetris.Shapes = {
	    // 所有可能的形状
	    tiles: [
	        // 1个点的
	        {
	            value: 1,
	            list: [[[0, 0]]]
	        },

	        {
	            value: 2,
	            list: [
	                [[1, -1], [0, 0], [1, 0], [0, 1]],
	                [[0, 0],  [1, 0], [-1, 1], [0, 1]],
	                [[0, 0], [1, 0], [0, 1], [1, 1]]
	            ]
	        }, {
	            value: 3,
	            list: [
	                [[0, -1], [0, 0], [0, 1], [0, 2]],
	                [[0, 0], [1, -1], [-1, 1], [-2, 2]],
	                [[-1, 0], [0, 0], [1, 0], [2, 0]]
	            ]
	        }, {
	            value: 4,
	            list: [
	                [[0, 0], [0, 1], [0, -1], [-1, 0]],
	                [[0, 0], [0, -1], [1, -1], [-1, 1]],
	                [[0, 0], [0, 1], [0, -1], [1, 0]],
	                [[0, 0], [1, 0], [-1, 0], [1, -1]],
	                [[0, 0], [1, 0], [-1, 0], [-1, 1]]
	            ]
	        }, {
	            value: 5,
	            list: [
	                [[0, 0], [0, 1], [0, -1], [1, -1]],
	                [[0, 0], [1, -1], [-1, 1], [-1, 0]],
	                [[0, 0], [1, -1], [-1, 1], [1, 0]],
	                [[0, 0], [1, 0], [-1, 0], [0, -1]],
	                [[0, 0], [1, 0], [-1, 0], [0, 1]]
	            ]
	        }, {
	            value: 6,
	            list: [
	                [[0, -1], [-1, 0], [-1, 1], [0, 1]],
	                [[-1, 0], [0, -1], [1, -1], [1, 0]],
	                [[0, -1], [1, -1], [1, 0], [0, 1]],
	                [[-1, 1], [0, 1], [1, 0], [1, -1]],
	                [[-1, 0], [-1, 1], [0, -1], [1, -1]],
	                [[-1, 0], [-1, 1], [0, 1], [1, 0]]
	            ]
	        }
	    ],

	    /**
	     * 重新开始的逻辑
	     */
	    restart: function() {
	        qc.Tetris.Shapes.pool = [];
	        for (var i = 0; i < 3; i++) {
	            qc.Tetris.Shapes.pool.push(qc.Tetris.Shapes.random());
	        }
	    },

	    /**
	     * 随机抽取一个形状
	     */
	    random: function() {
	        // 先抽取分类
	        var math = qc.Tetris.game.math;
	        var shapes = Shapes.tiles;
	        var shape = shapes[math.random(0, shapes.length - 1)];

	        // 再抽子类
	        var list = shape.list[math.random(0, shape.list.length - 1)];
	        return {
	            value: shape.value,
	            list: list
	        };
	    },

	    /**
	     * 当前的pool数据
	     */
	    pool: []
	};
````
代码说明如下：  
	* value指明了格子应该使用哪个图片
	* list包含了多个形状，形状由数组组成，每个元素指明了逻辑坐标
	* pool属性存储了当前屏幕上3个形状的数据信息

2. 修改Tetris.js的qc.initGame方法，最后面添加3个形状的初始化逻辑：
````javascript
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
````