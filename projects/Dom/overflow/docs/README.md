# DomOverflow

* 实例演示Dom的overflow属性效果。效果图如下：<br>
![DomOverflow](images\UI.gif)

## UI

* 在新建场景中创建一个Text，用来提示点击dom图片。
* 创建一个Dom节点，设置节点大小为(200,200);设置ClassName为img，InnerHTML的内容为``` <img src="/Assets/raw/d6.png"> ```，用来显示dom背景图。
* 在Assets/css/目录下创建style.css，设置dom的风格(黑色边框);<br>
代码如下：<br>

```javascript
/* css for dom */
.img {
    border: 3px solid black;
}
```
* 创建脚本UI.js，负责点击dom，切换Dom的overflow属性。脚本挂在dom节点。<br>
代码如下：<br>

```javascript
var UI = qc.defineBehaviour('qc.engine.UI', qc.Behaviour, function() {
    this.index = 0;
    this.values = ['hidden', 'auto', 'visible', 'scroll'];
}, {
    clue: qc.Serializer.NODE
});

UI.prototype.onClick = function() {
    this.index++;
    if (this.index >= this.values.length) this.index = 0;
    this.gameObject.overflow = this.values[this.index];
};


```
