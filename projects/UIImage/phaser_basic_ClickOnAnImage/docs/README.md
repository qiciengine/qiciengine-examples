# 点击事件

* 本范例主要介绍Image点击事件。当贴图被点击时，记录点击次数。效果图如下：<br>
![](images\UI.png)

## UI

* 创建一个Image，设置贴图内容，并设置原始图大小，并设置可以交互。如下图：<br>
![](images\image.png)
* 创建一个Text命名为clue，用来显示点击次数。
* 创建脚本ClickOnAnImage.js，挂在UIImage的节点上，负责显示点击贴图次数的逻辑。<br>
代码如下：<br>

```javascript   
var ClickOnAnImage = qc.defineBehaviour('qc.demo.ClickOnAnImage', qc.Behaviour, function() {
    this._count = 0;
    this.clueLabel = null;
}, {
    clueLabel: qc.Serializer.NODE
});

/**
 * 初始化处理
 */
ClickOnAnImage.prototype.awake = function() {
    // 监听节点被点击的另外一种方式：注册事件
    this.gameObject.onClick.add(function() {
        console.log('Click!');
    });
};

/**
 * 当节点被点击时，本函数自动被调用
 */
ClickOnAnImage.prototype.onClick = function() {
    var self = this;
    self._count++;
    self.clueLabel.text = 'Click ' + self._count + ' times.';
    self.clueLabel.visible = true;
};
```


