/**
 * @author chenx
 * @date 2015.10.15
 * copyright 2015 Qcplay All Rights Reserved.
 *
 * 发送指令
 */

var SendBtn = qc.defineBehaviour('qc.demo.SendBtn', qc.Behaviour, function() {
    this.inputCmd = null;
    this.inputData = null;
    this.replyData = null;
    this.communicateNode = null;
}, {
    // 需要序列化的字段
    inputCmd : qc.Serializer.NODE,
    inputData : qc.Serializer.NODE,
    communicateNode : qc.Serializer.NODE,
    replyData : qc.Serializer.NODE,
});

// 收到消息回复
SendBtn.prototype.onReply = function(arg, resJson) {
    this.game.log.trace('onReply :');
    this.game.log.trace(arg);
    this.game.log.trace(resJson);

    var jsonStr = JSON.stringify(resJson);
    this.replyData.text = jsonStr;
};

// 按钮被点击的处理
SendBtn.prototype.onClick = function() {
    var cmd = this.inputCmd.text;
    var data = this.inputData.text;
    var json = '';
    this.game.log.trace('data : {0}', data);
    try{
        json = JSON.parse(data);
    }catch(e){
        alert('data 不为 json 串')
        return;
    }
    var callback = this.onReply.bind(this, {test:11});

    // 发送消息
    qc.ServerCommunicate.sendMessage(this.communicateNode, cmd, json, callback)

    this.replyData.text = 'waiting reply...';
};
