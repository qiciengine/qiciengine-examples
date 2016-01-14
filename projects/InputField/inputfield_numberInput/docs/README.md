# 输入数字 

* 数字输入类型：只能输入数字、小数点、加减号和e，但最终效果只会显示有效数字。效果图如下：<br>
![](images\number.gif)
* 在新建场景中创建一个InputField，设置输入框的输入类型ContentType为Number。如下图：<br>
![](images\number.png)
* 在根节点下创建一个Text，命名为title，用来显示当前输入框满足输入要求的内容。
* 创建脚本NumberInput.js，负责显示输入框满足要求的内容显示，脚本挂在number_input节点上。<br>
代码如下：<br>

```javascript   
var NumberInput = qc.defineBehaviour('qc.demo.NumberInput', qc.Behaviour, function() {
    this.title = null;
}, {
    title: qc.Serializer.NODE
});

NumberInput.prototype.update = function() {
    var v = parseFloat(this.gameObject.text);
    this.title.text = '' + v;
};
```