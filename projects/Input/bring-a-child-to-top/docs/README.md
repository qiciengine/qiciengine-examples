# bringToTop

* 实例演示点击图片将图片显示在最上层。效果图如下：<br>
![bringToTop](images\UI.gif)

## UI

* 在新建场景中创建一个UIRoot节点。
* 创建脚本UI.js，负责动态添加图片资源到UIRoot节点下，脚本挂在UIRoot节点上。并将目录Assets/texture/的图片设置到Textures数组中。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
    this.textures = [];
}, {
    textures: qc.Serializer.TEXTURES
});

UI.prototype.awake = function() {
    // create 20 UIImage by random
    var math = this.game.math;
    for (var i = 0; i < 20; i++) {
		// 加载图片
        var node = this.game.add.image(this.gameObject);
        node.texture = this.textures[math.random(0, this.textures.length - 1)];
        node.resetNativeSize();
        node.x = math.random(0, this.gameObject.width - node.width);
        node.y = math.random(0, this.gameObject.height - node.height);
        
        // enable click
        node.interactive = true;
        
		// 将脚本添加到图片的节点上
        // add script to control
        node.addScript('qc.demo.Drag');
    }
};

```
* 创建脚本Drag.js，负责点击图片，设置图片在根节点中的层级。<br>
代码如下：<br>

```javascript
var Drag = qc.defineBehaviour('qc.demo.Drag', qc.Behaviour, function() {
}, {
});

Drag.prototype.onDown = function() {
    // Bring to top
    this.gameObject.parent.setChildIndex(this.gameObject, this.gameObject.parent.children.length - 1);
};

Drag.prototype.onDrag = function(e) {
    var self = this,
        o = self.gameObject;
    var pt = o.getWorldPosition();
    pt.x += e.source.deltaX;
    pt.y += e.source.deltaY;
    
    var localPt = o.parent.toLocal(pt);
    o.x = localPt.x;
    o.y = localPt.y;
};

```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)