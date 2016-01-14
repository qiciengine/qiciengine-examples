# stretchY

* 实例演示recttransform中y轴方向的stretch模式。效果图如下：<br>
![stretchY](images\UI.png)

## UI

* 在新建场景中创建一个Button作为StretchY1，设置节点y轴方向的stretch模式，如下图：<br>
![](images\stretchy.png)
* 设置StretchY1节点下的UIText的显示内容。
* 创建脚本UI.js，负责动态状态一个Button作为StretchY2，并设置节点y轴方向的stretch模式及文本内容。脚本挂在根节点下。<br>
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
    node.name = 'StretchY2';
    node.imageType = qc.UIImage.IMAGE_TYPE_SLICED;
    
    // stretch x
    node.setAnchor(new qc.Point(0, 0.1), new qc.Point(0, 0.9));
    node.top = 10;
    node.bottom = 10;
    node.anchoredX = 150;
    node.width = 250;
    
    // set text's content
    node.text.text = 'Stretch-Y\n' + 'Top: height*0.1 + 10\n' + 'Bottom: height*0.1 + 10';
    node.text.fontSize = 20;
};
```