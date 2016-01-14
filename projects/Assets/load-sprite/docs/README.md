# LoadSprite

* 实例演示通过脚本动态加载精灵。效果图如下：<br>
![LoadSprite](images\UI.png)

## UI

* 在新建场景中创建一个UIRoot节点，作为要加载图片的父亲节点。如下图：<br>
![UIRoot](images\UIRoot.png)<br>
* 创建脚本UI.js，脚本挂在UIRoot节点上。代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
    // Load the sprite
    // Same to 'load the image'
    var self = this;
    this.game.assets.load('Assets/sprite/panda.bin', function(texture) {
        console.log('Load ok', texture);
        
        // Create a Sprite
        var node = self.game.add.sprite(self.gameObject);
        node.x = 150;
        node.y = 150;
        
        // Also:
        // node.texture = self.game.assets.find('Assets/sprite/panda.bin');
        node.texture = texture;
        
        node.playAnimation('idle');
    });
};
```