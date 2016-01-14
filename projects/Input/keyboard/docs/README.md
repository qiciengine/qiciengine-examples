# keyboardShip

* 实例演示使用方向键移动飞船的同时背景跟随滚动。效果图如下：<br>
![keyboardShip](images\UI.gif)

## UI

* 在新建场景中创建一个EmptyNode作为根节点map，设置大小为(1280,600)。
* 在map节点下创建一个UIImage作为background，用来显示背景贴图。设置该节点为自适应铺满父亲节点。
* 在map节点下创建一个UIImage作为ground，用来显示地板。设置大小为(1200,64)。
* 在map节点下创建一个UIImage作为river，用来显示河流。设置大小为(1480,64)。
* 在map节点下创建3个UIImage，分别为clound0、clound1、clound2，用来显示云图片。
* 在map节点下创建2个UIImage，分别为leftBtn、rightBtn，用来提示左右方向的图片。
* 在map节点下创建一个UIImage作为ufo，用来显示飞船。
* 创建脚本UI.js，负责使用方向键移动飞船的同时背景跟随滚动的逻辑。脚本挂在map节点下，并将ufo、leftBtn、rightBtn节点设置到对应的属性上。如下图：<br>
![script](images\script.png)<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
    this.speed = 4;
}, {
    ufo: qc.Serializer.NODE,
    leftBtn: qc.Serializer.NODE,
    rightBtn: qc.Serializer.NODE
});

UI.prototype.update = function() {
    var self = this,
        input = self.game.input,
        ufo = self.ufo;
    
    if (input.isKeyDown(qc.Keyboard.LEFT)) {
        ufo.x -= this.speed;
        if (ufo.x < 0) ufo.x = 0;
        ufo.rotation = -15 * Math.PI/180;
        self.leftBtn.alpha = 0.6;
        
        // follow the ufo
        self.followUfo();
    }
    else if (input.isKeyDown(qc.Keyboard.RIGHT)) {
        ufo.x += this.speed;
        if (ufo.x > this.gameObject.width) ufo.x = this.gameObject.width;
        ufo.rotation = 15 * Math.PI/180;
        self.rightBtn.alpha = 0.6;
        
        // follow the ufo
        self.followUfo();
    }
    else {
        ufo.rotation = 0;
        this.leftBtn.alpha = 0;
        this.rightBtn.alpha = 0;
    }
};

// 背景移动
UI.prototype.followUfo = function() {
    var w = this.game.width;
    var x = -this.ufo.x + w/2;
    if (x < -this.gameObject.width + w) {
        x = -this.gameObject.width + w;
    }
    else if (x > 0) {
        x = 0;
    }
    this.gameObject.x = x;
};
```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)