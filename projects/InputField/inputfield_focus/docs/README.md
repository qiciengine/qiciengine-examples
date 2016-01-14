# 焦点切换

* 本范例演示焦点切换。通过点击Tab键，实现焦点在1、2、3三个输入框之间切换。效果图如下：<br>
![](images\UI.gif)
* 在新建场景中创建三个InputField分别命名为1、2、3，按顺序排列。
* 创建一个Text用来提示使用Tab键切换焦点。
* 创建脚本FocusChange.js，负责切换焦点的逻辑。脚本挂在根节点下。将创建的三个InputField设置到inputs属性上。如下图：<br>
![](images\focusChange.png)<br>
代码如下：<br>

```javascript   
var FocusChange = qc.defineBehaviour('qc.demo.FocusChange', qc.Behaviour, function() {
    this.inputs = [];
}, {
    inputs: qc.Serializer.NODES
});

FocusChange.prototype.awake = function() {
    // Important!
    this.game.input.keyboard.addKeyCapture(qc.Keyboard.TAB);

    // When Tab Pressed, switch focus.
    this.game.input.onKeyDown.add(this.onTabPress, this);
};

FocusChange.prototype.onTabPress = function(keyCode) {
    if (keyCode === qc.Keyboard.TAB) {
        var index = this.currIndex;
        if (index === undefined) {
            index = 0;
        }
        else {
            this.inputs[index].isFocused = false;
            index++;
            if (index >= this.inputs.length) index = 0;
        }

        console.log('focus', index);
        this.currIndex = index;
        this.inputs[index].isFocused = true;
    }
};
```
