# 数据处理
数据分为两大类：  
1. 本地数据持久化。例如历史最高分、暂停时当前关卡数据等。  
本地数据可以使用引擎提供的[Storage](http://docs.zuoyouxi.com/api/storage/index.html)功能来实现。
2. 网络数据。比如提交历史最高分、登录信息、排行榜信息等。  
网络数据需要自行搭建服务器部分，可以选择各种顺手的语言，例如：php, java, asp.net等。然后通过引擎提供的[AssetsUtil](http://docs.zuoyouxi.com/api/assets/AssetUtil.html)功能来与服务器进行通讯。   

__接下来，开始一步一步实现这些功能__
1. __[数据库创建及连接](CreateDB.md)__
2. __[添加微信支持](Wechat.md)__
3. __[分数上传及排行榜查询](ScoreAndAnno.md)__
4. __[服务器连接](SeverComm.md)__
5. __[本地数据存储](Storage.md)__
6. __[处理游戏数据](GameData.md)__
