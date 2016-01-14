# 后台服务扩展

* 本范例演示扩展后台服务的功能。
在实际拓展编辑器中，如果需要的功能设计到磁盘操作、或者获取一些后台支持时，可以使用扩展后台服务的方式来完成。

* 在Project/Editor/Service目录下创建脚本ModuleTest.js，实现后台扩展的功能。
代码如下：  
````javascript
G.log.trace('------------------------------ load Project Module');
// 拓展模块的管理实例
var exModule = M.EXTERNAL_MODULES;
// 前端和后台通讯实例
var pipe = M.SERVICE_PIPE;
// 后台自带文件处理插件
var fs = exModule.loadExistModule('fs-extra');
// nodejs 自带路径处理
var path = require('path');

// 模块构造函数
module.exports = function() {
    G.log.trace('--------------------------- module create');
};

// 模块析构函数，清理相关资源
module.destruct = function() {
    G.log.trace('--------------------------- module destruct');
    G.emitter.removeListener('BeforePublish', beforePublish);
    G.emitter.removeListener('AfterPublish', afterPublish);
    pipe.off('receiveData', onReceiveData);
};

// 发布前的处理
var beforePublish = function(params) {
    G.log.trace('--------------------------- before publish');
	var version = G.config.project.version;
    if (!version) {
        G.config.project.version = '1.0.0';
    }
    else {
        var array = version.split('.');
        var index = array.length - 1;
        var value = 0;
        while ((value = parseInt(array[index])) >= 99 && index > 0) {
            index--;
        }
        array[index] = value + 1;
        for (index = index + 1; index < array.length; ++index) {
            array[index] = 0;
        }
		G.config.project.version = array.join('.');
    }
    M.PROJECT.saveProjectSetting();
};

// 发布后的处理
var afterPublish = function(params) {
    G.log.trace('--------------------------- publish success');

    var startGamePath = path.join(params.outPath, 'StartGame.html');
    var content = fs.readFileSync(startGamePath, 'utf8');
    content = content.replace(/http:\/\/engine\.zuoyouxi\.com\/lib\/[0-9\.]*\/qc-core\.js/g, '../lib/qc-core.js');
    fs.writeFileSync(startGamePath, content);
};

// 收到前端的消息
var onReceiveData = function(data) {
	G.log.trace(data);
    pipe.sendData('MyDemoMessage', {receiveData: data});
};

// 监听发布前事件
G.emitter.on('BeforePublish', beforePublish);
// 监听发布后事件
G.emitter.on('AfterPublish', afterPublish);
// 监听前端消息
pipe.on('receiveData', onReceiveData);

````

* 在Project/Editor目录下创建脚本PublisUtil.js，来处理前端功能。
代码如下：  
````javascript
var beforePublish = function() {
    console.log('************beforePublish');
    qc.servicePipe.sendData('receiveData', { message: 'Welcome!' });
};

var afterPublish = function() {
    console.log('************afterPublish');
};

var onReceiveData = function(data) {
	console.log(data);
};

G.e.on(G.e.BEFORE_PUBLISH, beforePublish);
G.e.on(G.e.AFTER_PUBLISH, afterPublish);
qc.servicePipe.on('MyDemoMessage', onReceiveData);


````

* 现在可以打包试试了，每次打包出来的版本号都会往上加1，如果打开控制台，可以看到前端和后端之前的通讯。

