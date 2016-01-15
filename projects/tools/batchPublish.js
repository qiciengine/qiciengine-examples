/**
 * Created by wudm on 11/13/15.
 */

module.exports = {};

var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');

var faildList;

/**
 * 处理入口
 * 使用：将脚本放在 editorservice 下，用 repl 模式启动 node 执行
 * G.load('batchPublish').publish(目录树, 发布目标文件夹);
 * 例如 G.load('batchPublish').publish('Users/coding/demo', '/Users/wudm/Desktop/publish');
 */
module.exports.publish = function(fullPath, toDir, isEnglish) {
    if (!fullPath || !fs.existsSync(fullPath)) {
        G.log.trace('路径' + fullPath + '不存在。');
        return;
    }

    var gameRoot = G.gameRoot;

    faildList = {};

    var dir = fullPath;
    G.log.trace(chalk.blue('开始处理路径:' + fullPath));

    if (!fs.statSync(fullPath).isDirectory()) {
        G.log.trace(chalk.red('请输入有效的目录。'));
    }
    else {
        // 确保目录存在
        fs.ensureDirSync(toDir);

        // 打开这个文件夹
        var opener = require('opener');
        opener('file:' + toDir);

        publishTree(fullPath, toDir, isEnglish);
    }

    G.log.trace(chalk.blue('处理结束。'));

    // 失败列表打印
    for (var faildDir in faildList)
        G.log.trace(chalk.red('{0}处理失败，原因：{1}'), faildDir, faildList[faildDir]);

    // 还原工程
    if (G.gameRoot !== gameRoot && gameRoot)
        M.PROJECT.openProject(G.gameRoot);
};

// 发布一个目录树，递归下去发布所有工程
var publishTree = function(fullPath, toDir, isEnglish) {
    // 自己是不是个有效工程
    var settingPath = path.join(fullPath, 'ProjectSetting/project.setting');

    if (fs.existsSync(settingPath)) {
        // 处理这个工程
        publish(fullPath, toDir, isEnglish);
        return;
    }

    fs.readdirSync(fullPath).forEach(function(subPath) {
        var subFullPath = fullPath + '/' + subPath;
        var stat = fs.statSync(subFullPath);

        if (stat.isDirectory()) {
            // 是一个目录，继续递归下去处理
            publishTree(subFullPath, toDir + '/' + subPath, isEnglish);
        }
    });
};


// 发布这个工程，发布到指定目录
var publish = function(projectPath, toDir, isEnglish) {
    G.log.trace(chalk.yellow('    发布工程{0}到{1}'), projectPath, toDir);

    // 切换工程到当前目录
    M.PROJECT.openProject(projectPath);

    // 确保 version 存在
    var ver = G.config.project.version;
    if (!ver || (!/^\d[\d\.]*\d$/.test(ver) && !/^\d$/.test(ver))) {
        G.config.project.version = '1.0';
        G.load('filesystem/AutoConfigProject').writeProjectSetting();
    }

    // 执行发布
    var publishRet = M.PROJECT.publishTo(toDir);
    if (typeof publishRet === 'string') {
        G.log.trace(chalk.red('Faild!!!! reason:{0}'), publishRet);

        faildList[toDir] = publishRet;
    }
    // 如果目录中存在 docs/book.json 文件，认为需要 gitbook build 一把，编译并拷贝
    var p = path.join(projectPath, 'docs/book.json');
    if (isEnglish) {
        p = path.join(projectPath, 'docs-en/book.json');
    }
    if (fs.existsSync(p)) {
        G.log.trace(chalk.yellow('start gitbook build'));

        var exec = require('child_process').execSync;

        // 深度拷贝走
        var p2 = isEnglish ? 'docs-en' : 'docs';
        exec('gitbook -v 2.5.2 build "' + path.join(projectPath, p2) + '"');
        fs.copySync(path.join(projectPath, p2 + '/_book'), path.join(toDir, 'docs'));

        G.log.trace(chalk.yellow('gitbook build done'));
    }

    fs.ensureDirSync(path.join(toDir, 'docs'));

    // 打包工程
    G.log.trace(chalk.yellow('start pack zip'));
    var exec = require('child_process').execSync;
    var targetZipPath = path.join(toDir, 'docs', path.parse(projectPath).name + '.zip');
    var zipDir = [ 'Assets', 'Editor', 'Plugins', 'ProjectSetting', 'Scripts'];
    var zipCmd = 'cd \'' + projectPath + '\';zip -r -q \'' + targetZipPath + '\' ' + zipDir.join(' ');
    try { exec(zipCmd); }
    catch (e) {
        faildList[toDir] = 'gitbook fail.';
        return;
    }
    
    var sourceEn = path.join(projectPath, 'docs/en.json');
    var sourceZh = path.join(projectPath, 'docs/zh.json');
    if (fs.existsSync(sourceEn))
        fs.copySync(sourceEn, path.join(toDir, 'docs/en.json'));
    if (fs.existsSync(sourceZh))
        fs.copySync(sourceZh, path.join(toDir, 'docs/zh.json'));
    
    G.log.trace(chalk.yellow('Done\n================\n'));
};

require('./Start.js');
module.exports.publish('/Users/weism/qici/demo', '/Users/weism/qici/version/demo/zh');
module.exports.publish('/Users/weism/qici/demo', '/Users/weism/qici/version/demo/en', true);
process.exit();
