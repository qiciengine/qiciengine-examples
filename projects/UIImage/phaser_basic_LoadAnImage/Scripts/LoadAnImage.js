/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var LoadAnImage = qc.defineBehaviour('qc.demo.LoadAnImage', qc.Behaviour, function() {
}, {
});

/**
 * 脚本初始化处理：动态加载图片并显示
 */
LoadAnImage.prototype.awake = function() {
    var self = this;

    // 异步加载图片资源
    self.game.assets.load('einstein', 'Assets/texture/ra_einstein.bin', function(asset) {
        // asset即为资源信息
        console.log(asset);
        console.log(self.game.assets.find('einstein'));

        // 显示出来
        var image = self.game.add.image(self.gameObject);
        image.texture = asset;
        image.resetNativeSize();
    });
};
