# LoadImageWithoutCallback

* 实例演示通过回调方法动态加载图片资源。效果图如下:<br>
![UI](images\UI.gif)

## UI

* 在新建场景中创建4个Button，分别为LoadBtn、ShowBtn、LoadBtn2和ShowBtn2。<br>
LoadBtn:点击按钮，通过图片资源名称加载图片资源。<br>
ShowBtn:点击按钮，显示通过资源名称加载的图片。<br>
LoadBtn2:点击按钮，通过图片资源的关键字加载图片资源。<br>
ShowBtn2:点击按钮，显示通过图片资源的关键字加载的图片。<br>

* 创建脚本UI.js，负责按钮事件响应。脚本挂在UIRoot节点上，将LoadBtn、ShowBtn、LoadBtn2和ShowBtn2节点拖拽到对应的属性上，如下图：<br>
![script](images\script.png)<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    loadBtn: qc.Serializer.NODE,
    loadBtn2: qc.Serializer.NODE,
    displayBtn: qc.Serializer.NODE,
    displayBtn2: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    self.addListener(self.loadBtn.onClick, function() {
        // Load the image
        self.game.assets.load('Assets/texture/t1.bin');
    });
    self.addListener(self.loadBtn2.onClick, function() {
        // Load the image identified by 't2'
        self.game.assets.load('t2', 'Assets/texture/t2.bin');
    });
    
    self.addListener(self.displayBtn.onClick, function() {
        // Display the image
        self._createImage(150, -10, self.game.assets.find('Assets/texture/t1.bin'));
    });
    self.addListener(self.displayBtn2.onClick, function() {
        // Display the image
        // OR: 
        // self._createImage(450, -10, self.game.assets.find('Assets/texture/t2.bin'));
        self._createImage(450, -10, self.game.assets.find('t2'));
    });
};

// Display the image
UI.prototype._createImage = function(x, y, texture) {
    var self = this;
    var o = self.game.add.image(self.gameObject);
    o.x = x; 
    o.y = y;
    // OR: o.texture = self.game.assets.find('Assets/texture/t2.bin');
    o.texture = texture;
    o.resetNativeSize();

    if (!o.texture) alert('Load Image First!');
};
```
