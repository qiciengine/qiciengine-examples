# UnloadAsset

* 实例演示释放动态加载的资源。效果图如下：<br>
![UnloadAsset](images\UI.gif)

## UI

* 在新建场景中创建2个Button，分别为unload和destroy。<br>
unload:点击按钮，释放加载的图片资源。<br>
destroy:点击按钮，删除所有资源的节点。<br>
* 创建脚本UI.js，负责实现点击按钮触发事件。脚本挂在UIRoot节点上，将unload节点和destroy节点拖拽到对应的属性上。如下图：<br>
![script](images\script.png)<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    unloadBtn: qc.Serializer.NODE,
    destroyBtn: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    self.addListener(self.unloadBtn.onClick, self.unload, self);
    self.addListener(self.destroyBtn.onClick, function() {
        // Destroy the sprite, ...
        var arr = ['sprite', 'image', 'sound'];
        arr.forEach(function(name) {
            var o = self.gameObject.find(name);
            if (o) o.destroy();
        });
    });
    
    // Load sprite
    self.game.assets.load('Assets/sprite/panda.bin', function(texture) {
        // Create sprite
        var o = self.game.add.sprite(self.gameObject);
        o.name = 'sprite';
        o.x = 100;
        o.y = 350;
        o.texture = texture;
        o.playAnimation('idle');
    });
    
    // Load image
    self.game.assets.load('block', 'Assets/texture/block.bin', function(texture) {
        // Create image
        var o = self.game.add.image(self.gameObject);
        o.name = 'image';
        o.x = 200;
        o.y = 100;
        o.texture = texture;
        o.resetNativeSize();
    });
    
    // Load audio
    self.game.assets.load('Assets/audio/synth2.mp3.bin', function(audio) {
        // Play sound
        var sound = self.game.add.sound(self.gameObject);
        sound.name = 'sound';
        sound.loop = true;
        sound.audio = audio;
        sound.play();
    });
};

UI.prototype.unload = function() {
    this.game.assets.unload('Assets/sprite/panda.bin');
    this.game.assets.unload('Assets/texture/block.bin');
    this.game.assets.unload('Assets/audio/synth2.mp3.bin');
    
    // Check
    console.log('After unload:', 
                this.game.assets.find('Assets/sprite/panda.bin'),
                this.game.assets.find('Assets/texture/block.bin'),
                this.game.assets.find('Assets/audio/synth2.mp3.bin'));
};

```