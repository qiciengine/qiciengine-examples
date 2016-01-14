# 键盘操作

* 本范例演示监听键盘操作事件。效果图如下：<br>
![](images\UI.png)

## UI

* 在新建场景中创建一个Image，用来显示贴图。
* 创建一个Text用来显示上次被按下的key键值。
* 创建一个Text作为FrameInfo，用来显示本帧是否有按键被按下或者处于按下的状态。
* 创建脚本InputTest.js，负责监听本帧是否有任意按键被按下或者是处于按下的状态，显示上次本按下的key值。
脚本挂在根节点下，如下图：<br>
![](images\inputtest.png)<br>
代码如下：<br>

```javascript
var InputTest = qc.defineBehaviour('qc.demo.InputTest', qc.Behaviour, function() {
    this.image = null;
    this.label = null;
    this.label2 = null;
}, {
    image: qc.Serializer.NODE,
    label: qc.Serializer.NODE,
    label2: qc.Serializer.NODE
});

InputTest.prototype.awake = function() {
    var self = this;
    self.game.input.onKeyDown.add(this.onKeyDown, this);
    self.game.input.onKeyUp.add(this.onKeyUp, this);
    self.game.input.onKeyRepeat.add(this.onKeyRepeat, this);
};

// 按键被按下
InputTest.prototype.onKeyDown = function(key) {
    var input = this.game.input;

    console.log('KeyDown', key);
    this.image.scaleY = 0.5;
	
	// Alt键、Ctrl键、Shift键被按下处理
    if (input.isAltDown() || input.isControlDown() || input.isShiftDown() ||
        input.isMetaDown())
        this.image.rotation = Math.PI;
};

//按键松开
InputTest.prototype.onKeyUp = function(key) {
    console.log('KeyUp', key);

    this.image.scaleY = 1;
    this.image.rotation = 0;
};

InputTest.prototype.onKeyRepeat = function(key) {
    console.log('KeyRepeat', key);

    this.label.text = 'KeyRepeat:' + key;
};

InputTest.prototype.update = function() {
    var content = '';
    var input = this.game.input;

    if (input.isKeyDown(qc.Keyboard.SPACEBAR)) {
        content += 'SpaceBar Down.\n';
    }
    content += 'isAnyKeyDown:' + input.isAnyKeyDown() + '\n';
    content += 'isAnyKey:' + input.isAnyKey() + '\n';

    this.label2.text = content;
};
```