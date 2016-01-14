var showInfo = qc.defineBehaviour('qc.showInfo', qc.Behaviour, function() {
}, {
    audioNode : qc.Serializer.NODE,
    textNode : qc.Serializer.NODE,
    playNode : qc.Serializer.NODE
});

// 激活
showInfo.prototype.awake = function() {
    var soundManager = this.game.sound;
    var usingWebAudio = soundManager.usingWebAudio;
    var usingAudioTag = soundManager.usingAudioTag;
    var canPlayMp3 = soundManager.mp3Support;
    var canPlayOgg = soundManager.oggSupport;

    // 打印信息
    this.textNode.text =
        'usingWebAudio : ' + usingWebAudio + '\n' +
        'usingAudioTag : ' + usingAudioTag + '\n' +
        'canPlayMp3 : ' + canPlayMp3 + '\n' +
        'canPlayOgg : ' + canPlayOgg;

    var audioNode = this.audioNode;
    var playNode = this.playNode;
    this.addListener(this.playNode.onClick, function() {
        var isPlaying = audioNode.isPlaying;
        if (isPlaying) {
            audioNode.stop();
        }
        else {
            audioNode.play();
        }
    });
};

// 更新
showInfo.prototype.update = function() {
    var audioNode = this.audioNode;
    var playNode = this.playNode;
    var isPlaying = audioNode.isPlaying;
    if (isPlaying)
        playNode.find('Text').text = 'Stop';
    else
        playNode.find('Text').text = 'Start';
};