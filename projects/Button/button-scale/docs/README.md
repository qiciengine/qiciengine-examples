# Scale

* 实例演示通过代码和编辑器创建按钮，并设置其缩放、旋转等位置信息。效果图如下：<br>
![scale](images\UI.gif)

# UI

* 在新建场景中创建一个UIImage，作为background，显示背景图。
* 在根节点下创建5个Button，分别为button1、button2、button3、button4和button5。分别设置各个按钮的缩放、旋转等位置信息。
* 创建脚本UI.js，负责动态创建button6，并在button6的节点上挂上脚本ButtonCtr.js。UI.js挂在UIRoot节点上。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    buttonTexture: qc.Serializer.TEXTURE
});

UI.prototype.awake = function() {
    // Create button6 by script.
    var button = this.game.add.button(this.gameObject);
    button.name = 'button6';
    button.texture = this.buttonTexture;
    button.frame = 'button_sprite_sheet_02.png';
    button.resetNativeSize();
    button.text.visible = false;
    button.pivotX = 0.5;
    button.pivotY = 0.5;
    button.anchoredX = 570;
    button.anchoredY = 200;
    button.rotation = 32 * Math.PI / 180;
    button.scaleX = 2;
    button.scaleY = 2;
    
    // add script
    var c = button.addScript('qc.demo.ButtonCtr');
    c.background = this.gameObject.find('background');
    this.game.assets.load('sky6', 'Assets/texture/toxic.bin', function(texture) {
        c.backgroundTexture = texture;    
    });
};

```
* 创建脚本ButtonCtr.js，负责按钮点击、移入和移出的表现效果。依次选中各个按钮，挂上此脚本，并设置操作对象background和表现效果backgroundTexture。<br>
代码如下:<br>

```javascript
var ButtonCtr = qc.defineBehaviour('qc.demo.ButtonCtr', qc.Behaviour, function() {
}, {
    background: qc.Serializer.NODE,
    backgroundTexture: qc.Serializer.TEXTURE
});

ButtonCtr.prototype.awake = function() {
    var self = this;
    this.addListener(self.gameObject.onEnter, function() {
        self._isEnter = true;
        self.gameObject.frame = 'button_sprite_sheet_03.png';
    });
    this.addListener(self.gameObject.onExit, function() {
        self._isEnter = false;
        self.gameObject.frame = 'button_sprite_sheet_02.png';
    });
};

ButtonCtr.prototype.onDown = function() {
    this.gameObject.frame = 'button_sprite_sheet_01.png';
};

ButtonCtr.prototype.onUp = function() {
    if (this._isEnter) {
        this.gameObject.frame = 'button_sprite_sheet_03.png';
    }  
    else {
        this.gameObject.frame = 'button_sprite_sheet_02.png';
    }
};

ButtonCtr.prototype.onClick = function() {
    this.background.texture = this.backgroundTexture;
};

```