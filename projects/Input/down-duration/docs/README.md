# mouseDownDuration

* 实例演示Input#isAnyMouseDown和isAnyMouse的使用。效果图如下：<br>
![mouse](images\UI.gif)

## UI

* 在新建场景中创建一个UIImage，作为被点击的对象。
* 在根节点下创建一个UIText，用来显示鼠标点下的时长。
* 创建脚本UI.js，负责监听鼠标点击事件。脚本挂在UIImage节点上。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
    this.duration = -1;
}, {
    label: qc.Serializer.NODE
});

UI.prototype.update = function() {
    var input = this.game.input;
    if (input.isAnyMouseDown()) {
        this._start = this.game.time.now;
    }
    
    if (input.isAnyMouse()) {
        this.duration = this.game.time.now - this._start;
        this.gameObject.alpha = 1;
    }
    else {
        this.duration = -1;
        this.gameObject.alpha = 0.5;
    }
    
    this.label.text = 'Duration: ' + this.duration;
};

```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)