# setAnchor

* 实例演示手动修改recttransform中minAnchor和maxAnchor。效果图如下：<br>
![setAnchor](images\UI.png)

## UI

* 在新建场景中创建一个UIImage作为Percentage1，设置节点的大小为资源图片的原始大小，手动修改Anchor的值，如下图：<br>
![](images\anchor.png)
* 创建脚本UI.js，负责动态状态一个UIImage作为Precentage2，并设置Anchor的值。脚本挂在根节点下。<br>
代码如下：<br>

```javascript
/**
 * Anchored the Node to Left-Top
 */ 
var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    // fields need to serialize
});

UI.prototype.awake = function() {
	// Download the texture and then create UIImage
    var self = this;
    self.game.assets.load('texture2', 'Assets/texture/texture2.bin', function(t) {
        // create UIImage
        var node = self.game.add.image(self.gameObject);
        node.name = 'Percentage2';
        node.texture = t;
        
        // Set minAnchor and maxAnchor
        node.setAnchor(new qc.Point(0.2, 0.3), new qc.Point(0.2, 0.3));
        
        // Set Position
        node.anchoredX = 100;
        node.anchoredY = 100;
        
        // set size
        node.resetNativeSize();
    });
};

```