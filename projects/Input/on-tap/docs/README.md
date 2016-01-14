# onTap

* 实例演示tap与click的区别，tap便是短触的点击。效果图如下：<br>
![onTap](images\UI.gif)

## UI

* 在新建场景中创建一个UIImage作为image，用来显示点击时播放的图片，设置大小为原始资源图片的大小。
* 创建脚本UI.js，负责点击与双击的效果。脚本挂在image节点上。将要切换的图片资源设置到Textures属性上，如下图：<br>
![image](images\script.png)<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
    textures: qc.Serializer.TEXTURES
});

UI.prototype.onClick = function(event) {
    // double click?
    if (event.isTap) {
        // Yes! Change the texture
        if (this.gameObject.texture === this.textures[0]) 
            this.gameObject.texture = this.textures[1];
        else
            this.gameObject.texture = this.textures[0];
        this.gameObject.resetNativeSize();
    }
	
    if (event.isDoubleTap) {
        this.gameObject.colorTint = new qc.Color(0xff00ffff);
    }
    else if (event.isDoubleClick) {
        this.gameObject.colorTint = new qc.Color(0xffff00ff);
    }
    else {
        this.gameObject.colorTint = new qc.Color(0xffffffff);
    }
    
    // Change alpha
    this.gameObject.alpha = (this.gameObject.alpha === 1) ? 0.5: 1;
};
```
* 更多输入交互可参考 [API qc.Input](http://docs.zuoyouxi.com/api/input/Input.html)