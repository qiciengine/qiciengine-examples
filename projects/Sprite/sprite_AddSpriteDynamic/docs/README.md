# 动态加载精灵

* 本范例演示动态创建精灵。如下图：<br>
![](images\UI.png)
* 在新建场景中创建一个EmptyNode命名为node，创建脚本AddSprite.js，挂在node节点上，负责创建精灵对象。<br>
代码如下：<br>

```javascript
var AddSprite = qc.defineBehaviour('qc.demo.AddSprite', qc.Behaviour, function() {
}, {
});

AddSprite.prototype.awake = function() {
    var self = this;
    self.game.assets.load('hall', 'Assets/texture/bbg_cave_hall.bin', function(asset) {
        // 创建精灵对象
        var sprite = self.game.add.sprite();
        sprite.texture = asset;
        sprite.resetNativeSize();
    });
};
```