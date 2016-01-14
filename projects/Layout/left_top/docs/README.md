# leftTop

* 实例演示recttransform中的left-top左上角固定模式。效果图如下：<br>
![leftTop](images\UI.png)

## UI

* 在新建场景中创建一个UIImage作为LeftTop1，设置节点的大小为资源图片的原始大小，并设置左上角固定模式，如下图：<br>
![](images\left.png)
* 创建脚本UI.js，负责动态状态一个UIImage作为LeftTop2，并设置其为左上角固定模式。脚本挂在根节点下。<br>
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
        node.name = 'LeftTop2';
        node.texture = t;
        
        // Default:
        //  pivotX = pivotY = 0
        //  minAnchor = maxAnchor = (0, 0)
        node.anchoredX = 100;
        node.anchoredY = 150;
        
        // set size
        node.resetNativeSize();
    });
};

```