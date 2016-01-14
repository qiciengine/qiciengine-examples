# 当前分数显示

1. 设置节点__score__的ClassName属性为：score_current

2. 在Scripts/ui下新建文件：CurrentScore.js，处理当前分的显示逻辑，并将此逻辑脚本挂载到__UIRoot/score__节点上。  
````javascript
	/**
	 * 绘制当前分数
	 */
	var CurrentScore = qc.defineBehaviour('qc.tetris.CurrentScore', qc.Behaviour, function() {
	    var self = this;
	    self.runInEditor = true;
	}, {
	});

	/**
	 * 初始化处理
	 */
	CurrentScore.prototype.awake = function() {
	    this.setScore(qc.Tetris.score.current);
	};

	/**
	 * 更新最新的分数
	 */
	CurrentScore.prototype.setScore = function(best) {
	    this.gameObject.innerHTML = '' + qc.Tetris.score.current;
	};
````
本脚本可以在编辑器下运行（方便在编辑状态下查看效果）：获取当前分数并显示之。

2. 增加score_current样式表。打开Assets/css/style.css，添加样式表：
````javascript
	.score_current{
	    color: #ffffff;
	    font-weight: 100;
	    font-size:50px;
	    text-align: center;
	}
````

3. 查看效果

__视频操作：__  
<video controls="controls" src="../video/create_current_score.mp4"></video>


