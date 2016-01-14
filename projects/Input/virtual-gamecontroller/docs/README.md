# 虚拟键盘

* 实例演示虚拟键盘的实现。效果图如下：<br>
![](images\UI.gif)

## UI

### map

* 在新建场景中创建一个UIImage作为map，用来显示背景图。设置map的大小为(2048,600)。
* 在map节点下创建一个UIImage作为ground，用来显示地板图。设置ground大小为(2048,48)，并以中心点底部对齐。如下图：<br>
![ground](images\ground.png)
* 选中ground节点，在此节点上添加一个RigidBody插件，并设置其为不可移动。如下图：<br>
![ground](images\rigidBody.png)
* 在map节点下创建一个Sprite作为player，用来显示玩家模型。在player节点上添加一个RigidBody插件，控制player节点的移动和跳跃。

### BottomRight

* 在根节点下创建一个EmptyNode作为BottomRight，大小设置为(200,100)，以右下角对齐。
* 在BottomRight节点下创建两个UIImage分别为Jump和Fire。用来触发跳跃和发射子弹的事件。

### LeftBottom

* 在根节点下创建一个EmptyNode作为LeftBottom，大小为(256,128)，以左下角对齐。
* 在LeftBottom节点下依次创建5个UIImage并排列，分别为MoverLeft、Down、MoverRight、MoveLeftDown、MoveRightDown。用来触发左右移动的事件。

### 脚本

* 创建脚本UI.js，负责控制player节点的实时位置。脚本挂在map节点上。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
    player: qc.Serializer.NODE
});

UI.prototype.update = function() {
    // follow the player
    var w = this.gameObject.parent.width;
    var x = w/2 - this.player.x;
    if (x < w - this.gameObject.width) {
        x = w - this.gameObject.width;
    }
    else if (x > 0) {
        x = 0;
    }
    this.gameObject.x = x;
};
```

* 创建脚本OnCollide.js，负责player落地后处理。脚本挂在player节点上。<br>
代码如下：<br>

```javascript
/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */
var OnCollide = qc.defineBehaviour('qc.demo.OnCollide', qc.Behaviour, function() {
}, {
});

OnCollide.prototype.onCollide = function(o1, o2) {
    if (this.gameObject.lastAnimationName === 'jump')
        this.gameObject.playAnimation('idle');
};
```

* 创建脚本BtnCtr.js，负责虚拟键盘的响应。在MoverLeft、Down、MoverRight、MoveLeftDown、MoveRightDown、Jump和Fire节点挂上此脚本。并设置各自的控制的对象、方向及其他信息。<br>
代码如下：<br>

```javascript
var BtnCtr = qc.defineBehaviour('qc.demo.BtnCtr', qc.Behaviour, function() {
}, {
	direction: qc.Serializer.STRING,
	player: qc.Serializer.NODE,
    ground: qc.Serializer.NODE,
    bulletPrefab: qc.Serializer.PREFAB
});

BtnCtr.prototype.onDown = function() {
	var self = this;
    var rigidbody = this.player.getScript('qc.arcade.RigidBody');
    switch (this.direction) {
    case 'left':
    	rigidbody.velocity.x = -200;
    	if (rigidbody.velocity.y === 0)
    		this.player.playAnimation('walk');
    	this.player.scaleX = -1;
    	break;	

    case 'right':	
    	rigidbody.velocity.x = 200;
    	if (rigidbody.velocity.y === 0)
    		this.player.playAnimation('walk');
    	this.player.scaleX = 1;
    	break;

    case 'down':
    	if (rigidbody.velocity.x === 0 && rigidbody.velocity.y === 0)
    		this.player.playAnimation('duck');
    	break;	

    case 'leftdown':	
        rigidbody.velocity.x = -100;
        if (rigidbody.velocity.y === 0)
            this.player.playAnimation('duckwalk');
    	this.player.scaleX = -1;
    	break;	

    case 'rightdown':	
        rigidbody.velocity.x = 100;
        if (rigidbody.velocity.y === 0)
            this.player.playAnimation('duckwalk');
           this.player.scaleX = 1;
    	break;	

    case 'fire':
    	this._timer = this.game.timer.loop(1000, function() {
    		self.fire();
    	});	
    	self.fire();
    	this.player.playAnimation('attack');
    	break;

    case 'jump':
    	rigidbody.velocity.y = -400;
    	this.player.playAnimation('jump');
    	break;	
    }
};

BtnCtr.prototype.onUp = function() {
	var rigidbody = this.player.getScript('qc.arcade.RigidBody');
    switch (this.direction) {
    case 'fire':
    	// stop fire
    	this.player.playAnimation('idle');
    	this.game.timer.remove(this._timer);
    	break;	

    case 'jump': break;	

    default:
    	rigidbody.velocity.x = 0;
    	this.player.playAnimation('idle');
    	break;	
    }
};

BtnCtr.prototype.fire = function() {
	var bullet = this.game.add.clone(this.bulletPrefab, this.player.parent);
    bullet.y = this.player.y;
    bullet.x = this.player.scaleX === -1 ? this.player.x - 100 : this.player.x + 100;
    var rigidbody = bullet.getScript('qc.arcade.RigidBody');
    rigidbody.velocity.x = this.player.scaleX === -1 ? -600: 600;
    rigidbody.addCollide(this.ground);
    
    this.game.timer.add(3000, function() {
        bullet.destroy();
    });
};
```