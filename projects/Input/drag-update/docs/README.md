# dragUpdate

* 实例演示拖动飞船的同时箭头指向飞船进行环绕的效果。效果图如下：<br>
![dragUpdate](images\UI.gif)

## UI

* 在新建场景中创建一个Sprite，作为ship，用来显示飞船。
* 在ship的节点上添加一个RigidBody插件,通过RigidBody计算箭头与飞船的夹角。
* 在根节点下创建一个Sprite，作为ball，用来显示箭头。
* 在根节点下创建一个Text，作为clue，用来提示操作内容。
* 创建脚本UI.js，负责拖动飞船的同时箭头指向飞船进行环绕的逻辑。脚本挂在Ship节点上，并将ball节点设置到UI.js脚本Ball属性上。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
    this.angle = 0;
}, {
    ball: qc.Serializer.NODE
});

// 开始拖动
UI.prototype.onDragStart = function(e) {
	// 箭头的透明度为1
    this.ball.alpha = 1;
};

// 拖动中
UI.prototype.onDrag = function(e) {
	var pt = this.gameObject.getWorldPosition();
    pt.x += e.source.deltaX;
    pt.y += e.source.deltaY;
    var localPt = this.gameObject.parent.toLocal(pt);
    this.gameObject.x = localPt.x;
    this.gameObject.y = localPt.y;
    
    //  As we drag the ship around inc the angle
    this.angle += 0.01;
    
    //  This just circles the ball around the sprite being dragged
    this.ball.x = this.gameObject.x + 220 * Math.cos(this.angle);
    this.ball.y = this.gameObject.y + 220 * Math.sin(this.angle);
    
	// 计算夹角（弧度）
    //  And this points the ball at the current pointer
    this.ball.rotation = this.getScript('qc.arcade.RigidBody').angleBetween(this.ball) + Math.PI;
};

// 拖动结束
UI.prototype.onDragEnd = function(e) {
	// 箭头的透明度为0.5
   this.ball.alpha = 0.5;  
};

```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)