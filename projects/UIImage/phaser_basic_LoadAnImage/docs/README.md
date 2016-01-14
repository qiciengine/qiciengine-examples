# 加载贴图

* 本范例主要演示动态加载贴图。效果图如下：<br>
![](images\runUI.png)<br>

## UI

* 创建一个根节点UIRoot，创建脚本LoadAnImage.js，挂载根节点上，负责动态加载贴图的逻辑。如下图：<br>
![](images\UI.png)<br>
LoadAnImage.js代码如下：<br>

```javascript   
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
```
