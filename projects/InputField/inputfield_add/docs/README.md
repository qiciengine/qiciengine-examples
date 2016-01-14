# 动态添加输入框

* 本范例演示动态添加输入框。
* 在新建场景中创建一个节点作为根节点。
* 创建脚本AddDynamic.js，负责动态添加输入框的逻辑。脚本挂在根节点下。<br>

代码如下：<br>

```javascript   
var AddDynamic = qc.defineBehaviour('qc.demo.AddDynamic', qc.Behaviour, function() {
    this.texture = null;
}, {
    texture: qc.Serializer.TEXTURE
});

AddDynamic.prototype.awake = function() {
	// 添加输入框到场景中
    var input = this.game.add.inputField(this.gameObject);
    input.anchoredX = 40;
    input.anchoredY = 40;
    input.width = 200;
    input.height = 60;
    input.lineType = qc.InputField.SINGLE_LINE;
    input.contentType = qc.InputField.STANDARD;
    input.placeholderText = 'Please input your name.';
    input.characterLimit = 20;
    input.isFocused = true;

    // background
    input.texture = this.texture;
    input.imageType = qc.UIImage.IMAGE_TYPE_SLICED;
};
```