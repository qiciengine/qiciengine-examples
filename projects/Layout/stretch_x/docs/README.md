# stretchX

* 实例演示recttransform中x轴方向的stretch模式。效果图如下：<br>
![stretchX](images\UI.png)

## UI

* 在新建场景中创建一个Button作为StretchX1，设置节点x轴方向的stretch模式，如下图：<br>
![](images\stretchx.png)
* 设置StretchX1节点下的UIText的显示内容。
* 创建脚本UI.js，负责动态状态一个Button作为StretchX2，并设置节点x轴方向的stretch模式及文本内容。脚本挂在根节点下。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
});

UI.prototype.awake = function() {
	// create a Button
    var node = this.game.add.button(this.gameObject);
    
    // Set texture
    node.texture = this.game.assets.find('__builtin_resource__');
    node.frame = 'button.png';
    node.name = 'StretchX2';
    node.imageType = qc.UIImage.IMAGE_TYPE_SLICED;
    
    // stretch x
    node.setAnchor(new qc.Point(0.1, 0), new qc.Point(0.9, 0));
    node.left = 10;
    node.right = 10;
    node.anchoredY = 150;
    node.height = 120;
    
    // set text's content
    node.text.text = 'Stretch-X\n' + 'Left: width*0.1 + 10\n' + 'Right: width*0.1 + 10';
    node.text.fontSize = 20;
};
```