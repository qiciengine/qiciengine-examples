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
        '    <img src="Assets/raw/icon2.jpg"/>' +
        '  </div>' +
        '  <div class="content">__CONTENT__</div>' +
        '  <div class="clear"></div>' +
        '</div>';

    var messages = [
        'Hello!',
        'Welcome!',
        '<img src="Assets/raw/1.gif"/>'
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
        '    <img src="Assets/raw/icon1.jpg"/>' +
        '  </div>' +
        '  <div class="content">__CONTENT__</div>' +
        '  <div class="clear"></div>' +
        '</div>';
    template = template.replace(/__CONTENT__/g, message);
    this.gameObject.innerHTML += template;

    this.inputField.text = '';
};
