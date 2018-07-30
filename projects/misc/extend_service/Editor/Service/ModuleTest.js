trace('------------------------------ load Project Module');
// 拓展模块的管理实例
var exModule = EXTERNAL_MODULES_D;
// 前端和后台通讯实例
var pipe = SERVICE_PIPE_D;
// 后台自带文件处理插件
var fs = exModule.loadExistModule('fs-extra');
// nodejs 自带路径处理
var path = require('path');

// 模块构造函数
module.exports = function() {
    trace('--------------------------- module create');
};

// 模块析构函数，清理相关资源
module.destruct = function() {
    trace('--------------------------- module destruct');
    G.emitter.removeListener('BeforePublish', beforePublish);
    G.emitter.removeListener('AfterPublish', afterPublish);
    pipe.off('receiveData', onReceiveData);
};

// 发布前的处理
var beforePublish = function(params) {
    trace('--------------------------- before publish');
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
    PROJECT_D.saveProjectSetting();
};

// 发布后的处理
var afterPublish = function(params) {
    trace('--------------------------- publish success');

    var startGamePath = path.join(params.outPath, 'StartGame.html');
    var content = fs.readFileSync(startGamePath, 'utf8');
    content = content.replace(/http:\/\/engine\.zuoyouxi\.com\/lib\/[0-9\.]*\/qc-core\.js/g, '../lib/qc-core.js');
    fs.writeFileSync(startGamePath, content);
};

// 收到前端的消息
var onReceiveData = function(data) {
	trace(data);
    pipe.sendData('MyDemoMessage', {receiveData: data});
};

// 监听发布前事件
G.emitter.on('BeforePublish', beforePublish);
// 监听发布后事件
G.emitter.on('AfterPublish', afterPublish);
// 监听前端消息
pipe.on('receiveData', onReceiveData);
