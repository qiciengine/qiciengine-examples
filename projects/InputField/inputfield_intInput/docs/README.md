# 输入整数

* 只能整数输入：只能输入数字、小数点、加减号和e，但最终效果只会显示整数。效果图如下：<br>
![](images\int.gif)
* 在新建场景中创建一个InputField，设置输入框的输入类型ContentType为Int。如下图：<br>
![](images\int.png)
* 在根节点下创建一个Text，命名为title，用来显示当前输入框满足输入要求的内容。
* 创建脚本IntInput.js，负责显示输入框满足要求的内容显示，脚本挂在int_input节点上。<br>
代码如下：<br>

```javascript   
var IntInput = qc.defineBehaviour('qc.demo.IntInput', qc.Behaviour, function() {
    this.title = null;
}, {
    title: qc.Serializer.NODE
});

IntInput.prototype.update = function() {
    var v = parseInt(this.gameObject.text);
    this.title.text = '' + v;
};
```