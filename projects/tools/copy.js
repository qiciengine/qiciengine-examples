var fs = require('fs-extra');

// 复制一个文件夹
function copyDir(src, target, ignor) {
    // 确保目标路径存在
    fs.ensureDirSync(target);
    fs.readdirSync(src).forEach(function(file) {
        var path1 = src + '/' + file,
            path2 = target + '/' + file;
        var stat = fs.statSync(path1);
        if (stat.isDirectory()) {
            if (file[0] === '.') return;
            if (ignor.indexOf(file) !== -1) return;
            copyDir(path1, path2, ignor);
            return;
        }

        fs.copySync(path1, path2);
    });
};

var list = fs.readJsonSync('../order.json');
var ignor = ['docs', 'Build', 'Temp', 'docs-en'];
list.forEach(function(file) {
    copyDir('../' + file, 'demos/' + file, ignor);
});