# AudioSupportInfo

* 实例演示支持声音的格式。效果图如下：<br>
![AudioSupportInfo](images\UI.png)

## UI

* 在新建场景中创建一个Text，作为infoText，用来显示支持声音格式的文本内容。
* 在根节点下创建一个Button，作为playBtn，点击按钮播放或者暂停声音事件。
* 在根据节点上创建一个Sound，设置播放的音乐文件。
* 创建一个脚本showInfo.js，负责播放或者暂停音乐的逻辑。脚本挂在UIRoot，将infoText、playBtn、Sound拖拽到对应的属性上。如下图：<br>
![script](images\script.png)<br>
代码如下：<br>

```javascript
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
```