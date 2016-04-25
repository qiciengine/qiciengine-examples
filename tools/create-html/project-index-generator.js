/**
 * @author liyk
 * @copyright 2015 Qcplay All Rights Reserved.
 */
    
var fs = require('fs'),
    path = require('path');

/**
 * 获取指定目录下的子目录
 * @param srcPath
 * @returns {*}
 */
function getDirectories(srcPath) {
    return fs.readdirSync(srcPath).filter(function(file) {
        return fs.statSync(path.join(srcPath, file)).isDirectory();
    });
}

var footerZh = '该DEMO仅用于交流学习，DEMO中的素材出自 @@copyright@@ ，特此鸣谢。<br>厦门青瓷数码技术有限公司';
var footerEn = 'This demo is just for learning, all copyrighted materials in the game belong to @@copyright@@, many thanks to them.<br>Qcplay Co.Ltd.';
exports.generate = function(root, language) {
    var templateSouce = fs.readFileSync('./template.html', 'utf8');
    // 读取根目录
    var directories = getDirectories(root);
    for (var i = 0; i < directories.length; i++) {
        var dir = directories[i];
        // 读取分类目录
        var l2Directories = getDirectories(path.join(root, dir));
        for (var j = 0; j < l2Directories.length; j++) {
            var indexSource = templateSouce;
            var subDir = l2Directories[j];
            var infoPath = path.join(root, dir, subDir, 'docs', language + '.json');
            if (fs.existsSync(infoPath)) {
                try {
                    var json = JSON.parse(fs.readFileSync(infoPath, 'utf8'));

                    indexSource = indexSource.replace(/@@category@@/gi, json.category);
                    indexSource = indexSource.replace(/@@anchor@@/gi, dir);
                    indexSource = indexSource.replace(/@@name@@/gi, json.name);
                    indexSource = indexSource.replace(/@@desc@@/gi, json.desc);
                    indexSource = indexSource.replace(/@@width@@/gi, json.width);
                    indexSource = indexSource.replace(/@@height@@/gi, json.height);
                    indexSource = indexSource.replace(/@@download@@/gi, language === 'zh' ? '工程下载' : 'Download the project');
                    indexSource = indexSource.replace(/@@downloadUrl@@/gi, 'docs/' + subDir +'.zip');
                    indexSource = indexSource.replace(/@@open game in new window@@/gi, language === 'zh' ? '在新窗口中打开游戏' : 'Open demo in new window');
                    indexSource = indexSource.replace(/@@open in new window@@/gi, language === 'zh' ? '查看样例文档' : 'Open docuemnt for demo');
                    indexSource = indexSource.replace(/@@docUrl@@/gi, 'docs/index.html');
                    indexSource = indexSource.replace(/@@demoUrl@@/gi, 'StartGame.html');
                    indexSource = indexSource.replace(/@@docDisplay@@/gi, fs.existsSync(path.join(root, dir, subDir, 'docs/index.html')) ? 'block' : 'none');
                    if (json.copyright) {
                        indexSource = indexSource.replace(/@@footerText@@/gi, language === 'en' ? footerEn : footerZh);
                        indexSource = indexSource.replace(/@@copyright@@/gi, json.copyright);
                        indexSource = indexSource.replace(/@@footerDisplay@@/gi, 'block');
                    }
                    else {
                        indexSource = indexSource.replace(/@@footerText@@/gi, '');
                        indexSource = indexSource.replace(/@@footerDisplay@@/gi, 'none');
                    }
                    fs.writeFileSync(path.join(root, dir, subDir, 'index.html'), indexSource, 'utf8');
                }
                catch(e) {
                    console.error(e);
                }
            }
        }
    }
};
