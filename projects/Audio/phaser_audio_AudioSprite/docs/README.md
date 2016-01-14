# 声音片段

* 本范例演示播放声音片段。将9段声音组合成mp3，通过控制每一段声音的起始播放时间，从而听到所需要的声音片段。效果图如下：<br>
![](images\UI.png)

## UI

* 创建一个Image作为背景图title，设置为以左侧对齐，上下拉伸。如下图：<br>
![](images\title1.png)
* 在title的节点上添加一个Aspect Ratio Fitter组件，设置模式为Height Controls Width，比例为1.5。根据当前分辨率的高按照1.5的比例控制宽大小。如下图：<br>
![](images\title2.png)
* 创建一个Empty Node作为声音片段集合的父亲节点buttons。
* 创建9个Button分别控制各自声音片段的播放。
* 创建脚本AudioSprite.js，挂在各个Button的节点上。负责播放声音片段。设置audio声音集合fx_mixdown.mp3.bin，markerStart起始时间第几秒，markerDuration播放时间几秒。
    * alien death<br>
    ![](images\aliendeath.png)
    * boss hit：<br>
    ![](images\bosshit.png)
    * escape：<br>
    ![](images\escape.png)
    * meow：<br>
    ![](images\meow.png)
    * numkey：<br>
    ![](images\numkey.png)
    * ping：<br>
    ![](images\ping.png)
    * death：<br>
    ![](images\death.png)
    * shot：<br>
    ![](images\shot.png)
    * squit：<br>
    ![](images\squit.png)<br>

代码如下：<br>

```
var AudioSprite = qc.defineBehaviour('qc.demo.AudioSprite', qc.Behaviour, function() {
    this.audio = null;
    this.markerStart = 0;
    this.markerDuration = 1;
}, {
    audio: qc.Serializer.AUDIO,
    markerStart: qc.Serializer.NUMBER,
    markerDuration: qc.Serializer.NUMBER
});

AudioSprite.prototype.onClick = function() {
    var sound = this.game.add.sound();
    sound.audio = this.audio;
	// 设置播放区间 (起始时间，播放时长)
    sound.addMarker(this.markerStart, this.markerDuration);
    sound.destroyWhenStop = true;
    sound.volume = 0.9;
    sound.play();
};
```