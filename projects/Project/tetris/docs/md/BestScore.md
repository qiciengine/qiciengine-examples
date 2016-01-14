# 历史最高分显示
对于DOM节点，其实就是个div，可以指定其样式，指定其样式表类名，也可以内嵌html元素。  

1. 设置节点__best__的ClassName属性值为：score_best

2. 在Scripts/ui下新建文件：BestScore.js，处理最高分数的显示逻辑，并将此逻辑脚本挂载到__UIRoot/best__节点上。  
````javascript
	/**
	 * 绘制最高分数
	 */
	var BestScore = qc.defineBehaviour('qc.tetris.BestScore', qc.Behaviour, function() {
	    var self = this;
	    self.runInEditor = true;
	}, {
	});

	/**
	 * 初始化处理
	 */
	BestScore.prototype.awake = function() {
	    this.setScore(qc.Tetris.score.current);
	};

	/**
	 * 更新最新的高分
	 */
	BestScore.prototype.setScore = function(best) {
	    this.gameObject.innerHTML = 'Best: ' + best;
	};
````
本脚本可以在编辑器下运行（方便在编辑状态下查看效果）：获取最高分数并显示之。

3. 增加score_best样式表。打开Assets/css/style.css，添加样式表：
````
	.score_best {
	    font-weight: 60;
	    font-size:30px;
	    color: #ffffff; text-align: right;
	}
````

4. 查看效果
  
__视频操作：__  
<video controls="controls" src="../video/create_best_score.mp4"></video>

