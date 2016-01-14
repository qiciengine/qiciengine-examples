# chat

* 实例演示使用Dom实现简易聊天窗口。效果图如下：<br>
![chat](images\UI.gif)

## UI

* 在新建场景中创建一个Dom，作为history。设置Pos为FRONT，Overflow为scroll。如下图：<br>
![dom](images\dom.png)
* 创建一个InputField，输入聊天内容。
* 创建一个Button，点击按钮触发发送聊天内容的事件。
* 创建脚本UI.js，负责显示聊天内容和响应发送按钮事件。脚本挂在history节点上，如下图：<br>
![script](images\script.png)<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
}, {
    inputField: qc.Serializer.NODE,
    sendBtn: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    this.game.timer.loop(5000, this.addRandomChat, this);
    this.addRandomChat();
    
    this.addListener(this.sendBtn.onClick, this.sendMessage, this);
    
    var div = this.gameObject.div;
};

UI.prototype.addRandomChat = function() {
    var template = 
        '<div class="chat2">' +
        '  <div class="icon">' +
        '    <img src="/Assets/raw/icon2.jpg"/>' +
        '  </div>' +
        '  <div class="content">__CONTENT__</div>' +
        '  <div class="clear"></div>' +
        '</div>';
    
    var messages = [
        'Hello!',
        'Welcome!',
        '<img src="/Assets/raw/1.gif"/>'
    ];
    var index = this.game.math.random(0, messages.length - 1);
    template = template.replace(/__CONTENT__/g, messages[index]);
    this.gameObject.innerHTML += template;
};

UI.prototype.sendMessage = function() {
    var message = this.inputField.text;
    if (!message) return;
    
    var template = 
        '<div class="chat1">' +
        '  <div class="icon">' +
        '    <img src="/Assets/raw/icon1.jpg"/>' +
        '  </div>' +
        '  <div class="content">__CONTENT__</div>' +
        '  <div class="clear"></div>' +
        '</div>';
    template = template.replace(/__CONTENT__/g, message);
    this.gameObject.innerHTML += template;
    
    this.inputField.text = '';
};

```