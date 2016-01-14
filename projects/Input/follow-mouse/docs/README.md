# followMouse

* 实例演示跟随手指或者鼠标移动的效果。效果图如下：<br>
![followMouse](images\UI.gif)

## UI

* 在新建场景中创建一个Sprite作为ball，用来显示球的图片。
* 在ball节点添加一个RigidBody插件，当点击某个位置时，球自动移动到指定的位置。
* 创建脚本UI.js，负责跟随手指或者鼠标移动的逻辑。脚本挂在ball节点上。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
    var input = this.game.input,
        self = this;
    
    this.addListener(input.onPointerDown, self.doOnMove, self);
    this.addListener(input.onPointerMove, self.doOnMove, self);
    this.addListener(input.onPointerUp, self.doOnUp, self);
};

UI.prototype.doOnMove = function(id, x, y) {
    this.getScript('qc.arcade.RigidBody').moveToObject({x: x, y: y}, 400);

    this._onMove = true;
    this._pointerX = x;
    this._pointerY = y;
};

UI.prototype.update = function() {
    if (!this._onMove) return;

    // 判定是否已靠近
    var ob = this.gameObject;

    var rw = ob.width;
    var rh = ob.height;

    if (qc.Rectangle.containsRaw(ob.x - rw / 2, ob.y - rh / 2, rw, rh, this._pointerX, this._pointerY)) {
        // 停止下来
        this.getScript('qc.arcade.RigidBody').velocity.setTo(0, 0);
    };
};

UI.prototype.doOnUp = function(id, x, y) {
    this._onMove = false;
    this.getScript('qc.arcade.RigidBody').velocity.setTo(0, 0);
};
```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)