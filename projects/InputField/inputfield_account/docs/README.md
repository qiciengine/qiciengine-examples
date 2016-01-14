# 账号密码输入

* 本范例演示账号和密码输入。效果图如下：<br>
![](images\UI.png)

## UI

* 创建一个Text作为title，用来显示Account。
* 创建一个Text作为title，用来显示Password。
* 创建一个InputField作为account_input，用来输入账号。限制输入字符数为20，输入内容为Standard。如下图：<br>
![](images\account.png)
* 创建一个InputField作为password_input，用来输入密码。设置输入内容为Password，即输入内容隐藏，用*号替代。如下图：<br>
![](images\passward.png)
* 创建一个Button作为OK，点击按钮触发输出账号和密码的事件。
* 创建脚本Login.js，负责输出账号和密码的显示逻辑。脚本挂在OK的节点上。<br>
代码如下：<br>

```javascript   
var Login = qc.defineBehaviour('qc.demo.Login', qc.Behaviour, function() {
    this.accountInput = null;
    this.passwordInput = null;
}, {
    accountInput: qc.Serializer.NODE,
    passwordInput: qc.Serializer.NODE
});

Login.prototype.onClick = function() {
    var account = this.accountInput.text,
        password = this.passwordInput.text;
    console.log('account', account);
    console.log('password', password);
    alert('account=' + account);
    alert('password=' + password);

    // Clear
    this.accountInput.text = '';
    this.passwordInput.text = '';
};
```