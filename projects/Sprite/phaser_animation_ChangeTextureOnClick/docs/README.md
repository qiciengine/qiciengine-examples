# 点击切换贴图

* 本范例演示点击切换精灵动画。效果图如下：<br>
![](images\UI.gif)
<!---
![](images\UI.png)
![](images\UI1.png)
--->
* 创建一个Sprite组件，设置精灵动画animation.bin。设置Sprite可交互。如下图：<br>
![](images\interactive.png)<br>
* 创建脚本ChangeTexture.js，挂在Sprite节点上。负责点击精灵动画触发切换动画事件。将另一个精灵动画yg.bin设置在脚本texture属性上。如下图：<br>
![](images\script.png)<br>
代码如下：<br>

```javascript
var ChangeTexture = qc.defineBehaviour('qc.demo.ChangeTexture', qc.Behaviour, function() {
    this.texture = null;
}, {
    texture: qc.Serializer.TEXTURE
});

/**
 * 当节点被点击时，本函数自动被调用
 */
ChangeTexture.prototype.onClick = function() {
    this.gameObject.texture = this.texture;
    this.gameObject.playAnimation('run');
    this.gameObject.resetNativeSize();
};
```