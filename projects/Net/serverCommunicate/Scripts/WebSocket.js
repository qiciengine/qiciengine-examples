// define a user behaviour
var WebSocket = qc.defineBehaviour('qc.engine.WebSocket', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    this.replyData = null;
    this.socketNode = null;
}, {
    // 需要序列化的字段
    socketNode : qc.Serializer.NODE,
    replyData : qc.Serializer.NODE,
});

// Called when the script instance is being loaded.
WebSocket.prototype.awake = function() {

    var self = this;
    // 先注册 socket 消息处理
    qc.ServerCommunicate.registerSocketCmd(this.socketNode, 'MSG_TEST_SOCKET', function(socketNode, para1, para2, para3){

        console.log(socketNode, para1, para2, para3);
        var ret = {
            para1 : para1,
            para2 : para2,
            para3 : para3,
        }
        self.replyData.text = JSON.stringify(ret);
    })

    // 连接 socket 服务器
    qc.ServerCommunicate.socketConnect(this.socketNode);
};

// 按钮被点击的处理
WebSocket.prototype.onClick = function() {

    // 发送消息
    qc.ServerCommunicate.sendSocketMessage(this.socketNode, 'TEST_SOCKET', 'para1', 2, { value : 'test'} );

    this.replyData.text = 'waiting reply...';
};
