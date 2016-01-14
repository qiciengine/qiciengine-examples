# LoadImageWithoutScript

* 实例演示通过图片资源名称动态加载图片资源。效果图如下：<br>
![LoadImage](images\UI.png)

## UI

* 在新建场景中创建一个UIRoot节点，作为要动态加载图片的父亲节点。如下图：<br>
![UIRoot](images\UIRoot.png)<br>
* 创建脚本UI.js，脚本挂在UIRoot节点上。代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    // Specify type: Texture
    texture: qc.Serializer.TEXTURE
});

UI.prototype.awake = function() {
    // The texture is automatically loaded
    alert(this.texture === this.game.assets.find('Assets/texture/block.bin'));
    
    // Display it
    var o = this.game.add.image(this.gameObject);
    o.texture = this.texture;
    o.resetNativeSize();
};
```