/**
 * @author liyk
 * @copyright 2015 Qcplay All Rights Reserved.
 */
    
var fs = require('fs'),
    fse = require('fs-extra'),
    path = require('path'),
    language;

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

/**
 * 判断一个元素是否在数据内,相当于indexOf,但是判断时会忽略大小写
 * @param arr
 * @param ele
 * @returns {boolean}
 */
function existInArray(arr, ele) {
    var exist = false;
    var lowerEle = ele.toLowerCase();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].toLowerCase() === lowerEle) {
            exist = true;
            break;
        }
    }
    return exist;
}

exports.generate = function(l, destination) {
    language = l;
    
    fse.copySync('./menu_' + language, destination);
    
    // 遍历demo收集到的tag存到这个数组里
    var tags = [];
    // 遍历demo收集到的category存到这个数组里
    var categories = JSON.parse(fs.readFileSync('../../order.json', 'utf8'));
    // demo的json配置都存到这个数组里
    var demos = [];
    // html页面中的锚点
    var anchors = categories.slice(0);
    // 根目录
    var root = '../../';
    // 读取根目录
    var directories = getDirectories(root);
    for (var i = 0; i < directories.length; i++) {
        var dir = directories[i];
        // 读取分类目录
        var l2Directories = getDirectories(root + dir);
        for (var j = 0; j < l2Directories.length; j++) {
            var subDir = l2Directories[j];
            var infoPath =  path.join(root, dir, subDir, 'docs', language + '.json');
            if (fs.existsSync(infoPath)) {
                try {
                    // 读取demo目录下的qici_demo_info.json文件
                    var json = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
                    demos.push(json);

                    var demoTags = json.tags;
                    var demoCategory = json.category;
                    var preview = json.preview;
                    
                    // 复制图片文件到destination下
                    var srcPath = path.join(root, dir, subDir, 'docs', preview);
                    var destPath = path.join(destination, 'img/' + dir + '_' + subDir + '_' + preview);
                    fse.copySync(srcPath, destPath);
                    
                    json.preview = dir + '_' + subDir + '_' + preview;
                    json.url = dir + '/' + subDir + '/index.html';

                    // 收集tag
                    demoTags.forEach(function(demoTag) {
                        if (!existInArray(tags, demoTag)) {
                            tags.push(demoTag);
                        }
                    });

                    // 收集categories
                    if (categories.indexOf(dir) >= 0) {
                        categories.splice(categories.indexOf(dir), 1, demoCategory);
                    }
                }
                catch(e) {
                    console.error(e.stack);
                }
            }
        }
    }
    
    // demos按照order排序
    demos.sort(function(a, b) {
        if (a.order < b.order) {
            return -1;
        }
        else if (a.order > b.order) {
            return 1;
        }
        else {
            return 0;
        }
    });
    
    // 将数据写回js文件
    var datasContent = "var tags = __TAGS__;\nvar categories = __CATEGORIES__;\nvar anchors = __ANCHORS__;\nvar demos = __DEMOS__;";
    datasContent = datasContent.replace('__CATEGORIES__', JSON.stringify(categories));
    datasContent = datasContent.replace('__TAGS__', JSON.stringify(tags));
    datasContent = datasContent.replace('__DEMOS__', JSON.stringify(demos));
    datasContent = datasContent.replace('__ANCHORS__', JSON.stringify(anchors));

    fs.writeFileSync(path.join(destination, 'datas.js'), datasContent, 'utf8');
};
