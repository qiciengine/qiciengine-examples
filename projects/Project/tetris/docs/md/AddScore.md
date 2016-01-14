# 添加分数
## 加分动画
1. 为score挂载TweenScale组件，当增加分数时会缩放下节点，操作如下视频所示：  
  <video controls="controls" src="../video/add_score_tween.mp4"></video>

2. 打开__CurrentScore.js__脚本，修改setScore方法，添加播放动画的逻辑：  
````javascript
    /**
     * 更新最新的分数
     */
    CurrentScore.prototype.setScore = function() {
        this.gameObject.innerHTML = '' + qc.Tetris.score.current;
        
        // 播放缩放动画
        if (qc.Tetris.score.current > 0) {
        	var ts = this.getScript('qc.TweenScale');
            ts.resetToBeginning();
            ts.playForward();    
        }
    };
````

3. 打开__PutIn.js__脚本，增加测试代码：  
````javascript
    qc.Tetris.operation.putIn = function(index, pos) {
        // 测试而已，需要被删除掉
        var ui = qc.Tetris.game.ui;
        qc.Tetris.score.current = 3400;
        ui.currentScore.setScore();
        
        // TODO: 逻辑待实现
    };
````

4. 运行游戏，在控制台输入如下指令，以便查看效果  
````javascript   
    qc.Tetris.operation.putIn();
````    

5. 删除步骤3添加的临时测试代码