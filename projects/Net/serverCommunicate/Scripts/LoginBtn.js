/**
 * @author chenx
 * @date 2015.10.15
 * copyright 2015 Qcplay All Rights Reserved.
 *
 * 登录指令
 * 传入帐号和密码，若帐号验证失败，则返回错误信息；若不存在该帐号，则新建帐号；存在该帐号，则返回用户数据
 *
 *  登出指令
 *  传入帐号和密码，若帐号验证失败，则返回错误信息；若不存在该帐号，则返回错误信息，不保存；存在该帐号，则保存用户数据
 */

var LoginBtn = qc.defineBehaviour('qc.demo.LoginBtn', qc.Behaviour, function() {
    this.accountData = null;
    this.passwordData = null;
    this.saveData = null;
    this.replyData = null;
    this.communicateNode = null;
}, {
    // 需要序列化的字段
    accountData : qc.Serializer.NODE,
    passwordData : qc.Serializer.NODE,
    saveData : qc.Serializer.NODE,
    communicateNode : qc.Serializer.NODE,
    replyData : qc.Serializer.NODE,
});

// 收到消息回复
LoginBtn.prototype.onReply = function(arg, resJson) {
    this.game.log.trace('onReply :');
    this.game.log.trace(arg);
    this.game.log.trace(resJson);

    var jsonStr = JSON.stringify(resJson);
    this.replyData.text = jsonStr;
};

// 按钮被点击的处理
LoginBtn.prototype.awake = function() {

    var self = this;
    this.addListener(this.gameObject.onClick, function(node, event){

        var account = self.accountData.text;
        var password = self.passwordData.text;
        if (node.name == 'loginBtn')
        {
            var callback = self.onReply.bind(self, {});
            qc.ServerCommunicate.login(self.communicateNode, account, password, {}, callback);
        }
        else if (node.name == 'logoutBtn')
        {
            var callback = self.onReply.bind(self, {});
            var saveData = self.saveData.text;
            qc.ServerCommunicate.logout(self.communicateNode, account, password, {}, saveData, callback);
        }

        self.replyData.text = 'waiting reply...';
    });
};
