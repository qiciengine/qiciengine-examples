# 销毁精灵

* 本范例演示销毁精灵。通过点击飞机贴图进行销毁。效果图如下：<br>
![](images\UI.gif)

## UI

* 创建一个Image作为背景图sky。
* 创建一个Sprite作为plane，将Assets/texture/boss1.bin设置到Texture属性上，并设置为原始图大小且为可交互。如下图：<br>
![](images\plane.png)
* 创建脚本DestroySprite.js，挂在plane节点上。负责销毁精灵的逻辑。<br>
代码如下：<br>

```javascript
var DestroySprite = qc.defineBehaviour('qc.demo.DestroySprite', qc.Behaviour, function() {
}, {
});

DestroySprite.prototype.onDestroy = function() {
    alert('Destroy Plane.');
};

DestroySprite.prototype.onClick = function() {
    this.gameObject.destroy();
};
```