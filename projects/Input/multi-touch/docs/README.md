# multiTouch

* 实例演示多触点事件响应。效果图如下：<br>
![multiTouch](images\UI.gif)

## UI

* 在新建场景中创建一个EmptyNode作为UIRoot，设置大小为(475,765)。
* 创建脚本UI.js，负责多触点事件响应，脚本挂在UIRoot节点上，并设置Texture属性。如下图：<br>
![script](images\script.png)<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
    this.mouses = {};
    this.touchs = {};
}, {
    texture: qc.Serializer.TEXTURE
});

UI.prototype.awake = function() {
    var self = this, input = self.game.input;
    
	// 注册点击响应事件
    this.addListener(input.onPointerDown, self.onPointerDown, self);
    this.addListener(input.onPointerUp, self.onPointerUp, self);
    this.addListener(input.onPointerMove, self.onPointerMove, self);
};

UI.prototype.onPointerDown = function(id, x, y) {
    var self = this,
        input = self.game.input;
    
	// 创建一个UIImage 添加到当前节点下
    // create a UIImage at point (x, y)
    var node = self.game.add.image(self.gameObject);
    node.pivotX = 0.5;
    node.pivotY = 0.5;
    node.texture = self.texture;
    node.x = x;
    node.y = y;
    node.resetNativeSize();
    
    var pointer = input.getPointer(id);
    if (pointer.isMouse) {
        self.mouses[id] = node;
    }
    else {
        self.touchs[id] = node;
    }
};

// 点击松开事件
UI.prototype.onPointerUp = function(id, x, y) {
    var self = this,
        input = self.game.input;
    
	// 删除图片对象
    // destroy the UIImage
    var pointer = input.getPointer(id);
    if (pointer.isMouse) {
        self.mouses[id].destroy();
        delete self.mouses[id];
    }
    else {
        self.touchs[id].destroy();
        delete self.touchs[id];
    }
};

UI.prototype.onPointerMove = function(id, x, y) {
    var self = this,
        input = self.game.input;
    
    // move the UIImage
    var node;
    var pointer = input.getPointer(id);
    if (pointer.isMouse) {
        node = self.mouses[id];
    }
    else {
        node = self.touchs[id];
    }
    node.x = x;
    node.y = y;
};
```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)