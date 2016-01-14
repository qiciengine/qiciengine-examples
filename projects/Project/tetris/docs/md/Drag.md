# 形状的拖放处理
形状在被按下时，需要变大，如果是手机上需要向上做一定的位置偏移。拖拽时形状应该跟着鼠标或手指进行移动。  

修改脚本Scripts/ui/ShapeUI.js，添加如下代码：  
1. 修改reset函数，增加放大区块的逻辑：  
````javascript   
	ShapeUI.prototype.reset = function(fixToBoard) {
	    var self = this, o = self.gameObject;
	    for (var pos in self._blocks) {
	        var p = qc.Tetris.readPos(pos);
	        var pt = qc.Tetris.board.toWorld(p, fixToBoard ? qc.Tetris.BLOCK_H : qc.Tetris.POOL_DISTANCE_NORMAL);
	        var block = self._blocks[pos];
	        block.anchoredX = pt.x;
	        block.anchoredY = pt.y;
	        
	        var scale = fixToBoard ? 1.13 : 1;
	        block.find('shadow').scaleX = scale;
	        block.find('shadow').scaleY = scale;
	        block.find('block').scaleX = scale;
	        block.find('block').scaleY = scale;
	    }
	};
````

2. 添加按下的逻辑处理，放大区块：
````javascript   
	/**
	 * 鼠标按下：放大区块
	 */
	ShapeUI.prototype.onDown = function(e) {
	    var self = this, o = self.gameObject;
	    self.drop = false;
	    self.reset(true);

	    // 在手机下，需要往上做点偏移
	    o.y -= self.offsetY;
	};
````
	* drop标记当前区块是否被放到棋盘了，刚开始按下清理下环境
	* 按下时需要向上做偏移offsetY

3. 添加鼠标松开或触摸结束的处理，还原区块的位置和大小：
````javascript   
	/**
	 * 鼠标松开：重置区块大小
	 */
	ShapeUI.prototype.onUp = function() {
	    var self = this;
	    self.reset();
	};
````	

4. 添加开始拖拽的处理：
````javascript   
	/**
	 * 拖拽开始
	 */
	ShapeUI.prototype.onDragStart = function(e) {
	    var self = this;
	    self.drop = false;
	    self.drag = true;
	    self.lastPos = '';
	    self.game.input.nativeMode = true;
	    self.reset(true);

	    self.game.log.trace('Start drag:{0}', self.index);

	    // 复制出可放入标记
	    var ob = self.flagBlocks = self.game.add.clone(self.gameObject, qc.Tetris.boardUI.gameObject);
	    ob.children.forEach(function(block) {
	        block.find('shadow').visible = false;
	        var b = block.find('block');
	        b.width = qc.Tetris.BLOCK_W;
	        b.height = qc.Tetris.BLOCK_H;
	        b.scaleX = 1;
	        b.scaleY = 1;
	        b.frame = 'dark' + b.frame;
	    });
	    ob.scaleX = 1;
	    ob.scaleY = 1;
	    ob.interactive = false;
	    self.hideFlag();
	};
````
	* 初始时，标记正在拖拽（drag = true），并且没有被放下（drop = false）
	* 当拖拽到棋盘时，需要实时指示是否可以放下本形状。拖拽开始先清理下最近一次检测的逻辑坐标点（last = ''）
	* 设置输入模式nativeMode = true。确保输入事件能被实时处理（默认情况下延后一帧处理，运行效率比较高），本游戏对拖拽的实时响应比较重要。
	* 拖拽开始时，放大并偏移形状（和鼠标按下的逻辑一样）
	* 后续的逻辑：另外复制出本形状，并隐藏掉。这个形状在后续拖拽中，会在棋盘显示出来以指示当前是否可以放入。这个指示的格子图片，使用暗色的图片。

5. 添加拖拽的处理，每帧都会进行调度：
````javascript   
	/**
	 * 拖拽中
	 */
	ShapeUI.prototype.onDrag = function(e) {
	    var self = this,
	        o = self.gameObject;
	    if (self.drag) {
	        // 改变节点的目标位置
	        var p = o.getWorldPosition();
	        p.x += e.source.deltaX;
	        p.y += e.source.deltaY;
	        var lp = o.parent.toLocal(p);
	        o.x = lp.x;
	        o.y = lp.y;

	        // 计算当前对应棋盘中心点的偏移
	        var board = qc.Tetris.boardUI.gameObject;
	        p = board.toLocal(p);
	        p.y += board.height * 0.5;

	        // 反算出对应的归一化坐标
	        var xy = qc.Tetris.board.toLocal(p);
	        var x = Math.round(xy.x),
	            y = Math.round(xy.y),
	            pos = qc.Tetris.makePos(x, y);
	        if (self.lastPos !== pos) {
	            self.lastPos = pos;
	            if (qc.Tetris.board.data[pos] &&
	                qc.Tetris.board.checkPutIn(pos, self.data.list)) {
	                self.showFlag(pos);
	            }
	            else {
	                self.hideFlag();
	            }
	        }
	    }
	};
````	
	* 在拖拽的事件e中，会指明本帧到上一帧的移动偏移量（屏幕坐标），本形状加上屏幕坐标偏移，这样就移动起来了
	* 然后计算本形状的中心点，对应到棋盘的逻辑坐标。并检查目标是否可以放入，如果可以就需要显示指示
	* 最近一次检测的逻辑坐标需要记录下来，防止每帧都对同一逻辑坐标检查是否可以放入（白耗CPU）

6. 打开脚本Scripts/logic/Board.js，实现checkPutIn方法：
````javascript   
	Board.prototype.checkPutIn = function(pos, list) {
	    var self = this;
	    var pt = qc.Tetris.readPos(pos),
	        x = pt.x,
	        y = pt.y;

	    for (var i = 0; i < list.length; i++) {
	        var x0 = x + list[i][0],
	            y0 = y + list[i][1];

	        // 这个点应该是空的
	        var block = self.data[qc.Tetris.makePos(x0, y0)];
	        if (!block) return false;
	        if (block.value !== 0) return false;
	    }
	    return true;
	};
````	

7. 继续打开Scripts/ui/ShapeUI.js，继续实现拖拽结束的逻辑：
````javascript   
	/**
	 * 拖拽结束
	 */
	ShapeUI.prototype.onDragEnd = function(e) {
	    var self = this,
	        o = self.gameObject;
	    self.drag = false;

	    if (self.flagBlocks.visible && self.lastPos) {
	        // 放到这个位置中去
	        self.drop = true;
	        qc.Tetris.operation.putIn(self.index, self.lastPos, self.data);
	    }
	    else {
	        self.reset();
	    	o.parent.getScript('qc.tetris.Pool').resize();
	    }

	    // 显示标记可以干掉了
	    self.flagBlocks.destroy();
	    delete self.flagBlocks;
	};

	/**
	 * 隐藏指示标记
	 */
	ShapeUI.prototype.hideFlag = function() {
	    this.flagBlocks.visible = false;
	};

	/**
	 * 显示指示标记
	 */
	ShapeUI.prototype.showFlag = function(pos) {
	    this.flagBlocks.visible = true;
	    var pt = qc.Tetris.board.data[pos];
	    this.flagBlocks.anchoredX = pt.x;
	    this.flagBlocks.anchoredY = pt.y;
	};
````
	* 拖拽结束后，需要判定形状是否被放入目标节点
	* 如果可以放入，则调用指令：qc.Tetris.operation.putIn（下步骤实现）
	* 如果不能放入，则需要将位置和大小等还原
	* 最后，指示对象需要被析构

8. 在Scripts/operation创建文件PutIn.js，实现放入形状指令：
````javascript   
	/**
	 * 请求放入指定格子，如果成功放入返回true，否则返回false
	 */
	qc.Tetris.operation.putIn = function(index, pos) {
	    // TODO: 逻辑待实现
	};
````	

9. 在Shape.js中，我们使用到了棋盘对象：qc.Tetris.boardUI.gameObject，但目前这个值(BoardUI)尚未被赋值。  
打开BoardUI.js，在构造函数中加入代码赋值：  
````javascript   
	var BoardUI = qc.defineBehaviour('qc.tetris.BoardUI', qc.Behaviour, function() {
	    var self = this;
	    
	    // 登记下本对象
	    qc.Tetris.boardUI = self;

	    /**
	     * 棋盘的棋子元素
	     */
	    self.pieces = {};

	    ...
````

10. 运行测试下，形状可以随意拖拽了，并且可以反弹回原来位置。不过还无法放入（因为PutIn我们还没实现），请继续后面教程。