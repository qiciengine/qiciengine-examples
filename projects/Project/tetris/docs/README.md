# 游戏名：[《神奇的六边形》](http://engine.zuoyouxi.com/demo/game/hexagon/)

<video controls="controls" src="video/game.mp4"><ideo>

# 教程内容
本文档完整介绍《神奇六边形》的开发流程，重点演示如何使用青瓷引擎快速构建。  
文档中不对具体的业务逻辑、算法和数据结构进行详细解释，请读者自行参考源码和注释进行理解。  
另外，本示例工程用了大量的DOM元素来绘制静态元素，避免每帧绘制，能极大的提高帧率和降低手机发热问题，读者需要关注下。

请首先阅读：  
* [Hello World](http://engine.zuoyouxi.com/demo/GetStart/HelloWorld/index.html)
* [游戏制作与启动](http://engine.zuoyouxi.com/demo/GetStart/StartUp/index.html)

# 技能需求
1. JavaScript编码能力
2. 了解QICI Engine编辑器的操作，比如创建场景、挂载逻辑脚本、导入资源、打包图集等