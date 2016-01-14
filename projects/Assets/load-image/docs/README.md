# LoadImage

* 实例演示通过图片资源名称动态加载图片资源。效果图如下：<br>
![LoadImage](images\UI.png)

## UI

* 在新建场景中创建一个UIRoot节点，作为要动态加载图片的父亲节点。如下图：<br>
![UIRoot](images\UIRoot.png)<br>
* 创建脚本UI.js，脚本挂在UIRoot节点上。代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
    // Load the texture
    var self = this;
    this.game.assets.load('Assets/texture/block.bin', function(texture) {
        console.log('Load ok', texture);
        
        // Create a UIImage
        var node = self.game.add.image(self.gameObject);
        
        // You can use 'texture' :
        //   node.texture = texture
        // Also, find(url) = texture :
        node.texture = self.game.assets.find('Assets/texture/block.bin');
        node.resetNativeSize();
    });
};
```