# Text

* 详细介绍Text属性。

## 1、overflow

* overflow：决定文本内容超出Text的边框大小时，是否溢出显示。
* 创建一个Image作为Text的底图，命名为1。大小设置为120\*30，Frame属性设置为button2.png。如下图：<br>
![](images\1.png)
* 在1的节点上创建一个Text，用来显示文本内容。设置Text为上下左右拉伸，文字的颜色为黑色，并设置文本内容。如下图：<br>
![](images\text1.png)
* 复制1，重新命名为2，将Text的overflow属性打钩，如下图：<br>
![](images\overflow.png)
* 对比1和2，可以明显看出overflow的效果。如下图：<br>
![](images\overflowUI.png)

## 2、wrap

* 多行文本自动换行，超出边界不溢出显示和溢出显示。
* 复制1，重新命名为3，设置3的节点大小为120\*60，并重新设置文本内容。
* 选择3节点下的Text节点，在Wrap属性打钩。如下图：<br>
![](images\wrap.png)
* 复制3，重新命名为4，，将Text的overflow属性打钩。如下图：<br>
![](images\4.png)
* 对比3和4，可以明显看出wrap的效果。如下图：<br>
![](images\wrapUI.png)

## 3、颜色嵌套

* 支持多颜色显示。格式：颜色嵌套[#ff0000]红色，[#00ff00]绿色[-]，继续红色[-]。
* 复制4，重新命名为5。重新设置文本内容，如下图：<br>
![](images\color.png)<br>
效果图如下：<br>
![](images\colorUI.png)

## 4、对齐

* 复制4，重新命名为6。设置节点6的大小为125\*110。
* 选中6节点下的Text节点，重新设置文本内容，并设置为水平居中和垂直居中。如下图：<br>
![](images\paragraph.png)<br>
效果图如下：<br>
![](images\paragraphUI.png)

## 5、描边效果

* 复制4，重新命名为7。选中节点7下的Text，设置描边效果：描边厚度为2，颜色为白色。如下图：<br>
![](images\outline.png)<br>
效果图如下：<br>
![](images\outlineUI.png)

## 6、阴影效果

* 复制4，重新命名为8.选中节点8下的Text，设置阴影效果:在Shadow属性里的On属性上打钩。设置阴影颜色color为(255,0,0)，阴影XY轴偏移量为2。如下图：<br>
![](images\shadow.png)<br>
效果图如下：<br>
![](images\shadowUI.png)

## 7、外发光

* 复制4，重新命名为9。选中节点9下的Text，设置外发光效果:在Glow属性里的On属性上打钩。设置外发光颜色color为(255,0,0)，模糊度Blur为1。如下图：<br>
![](images\glow.png)<br>
效果图如下：<br>
![](images\glowUI.png)

## 8、渐变

* 复制4，重新命名为10。选中节点10下的Text，设置渐变效果:在Gradient属性里的On属性上打钩。设置阴影起始颜色Start为(255,0,0)，结束颜色End为(0,0,0)。如下图：<br>
![](images\gradient.png)<br>
效果图如下：<br>
![](images\gradientUI.png)

## 9、Bitmap字体

* 复制4，重新命名为bitmapfont。选中节点bitmapfont下的Text，设置Font Family属性为Bitmap，Font属性为Assets/font/number.bin。如下图：<br>
![](images\bitmap.png)<br>
效果图如下：<br>
![](images\bitmapUI.png)

## 10、Web字体

* 复制4，重新命名为webfont。选中节点webfont下的Text，设置Font Family属性为Bitmap，Font属性为Assets/font/number.bin。如下图：<br>
![](images\web.png)<br>
效果图如下：<br>
![](images\webUI.png)

## 11、Text点击事件

* 创建一个Text作为click。
* 创建脚本TextTest.js，负责点击click后事件处理逻辑。脚本挂在click上。效果图如下：<br>
![](images\click.png)<br>
代码如下：<br>

```javascript
var TextTest = qc.defineBehaviour('qc.demo.TextTest', qc.Behaviour, function() {
}, {
});

TextTest.prototype.onClick = function() {
    // Create UIText
    var t = this.game.add.text(this.gameObject.parent);
    t.anchoredX = this.gameObject.anchoredX;
    t.anchoredY = this.gameObject.anchoredY + 50;
    t.autoSize = true;
    t.alignH = qc.UIText.LEFT;
    t.alignV = qc.UIText.MIDDLE;
    t.fontSize = 22;
    t.color = new qc.Color(0xFFCCCCCC);
    t.text = '[#ffffff]Hello.[-]Qici Engine.';
    t.lineSpacing = 5;

    // 渐变效果
    t.gradient = true;
    t.startColor = new qc.Color(0xffffffff);
    t.endColor = new qc.Color(0xFFFF00FF);

    // 描边效果
    t.stroke = new qc.Color(0xffffffff);
    t.strokeThickness = 2;

    // 阴影
    t.enableShadow = true;
    t.shadowBlur = 0.5;
    t.shadowColor = new qc.Color(0xffa0a0a0);
    t.shadowOffsetX = 1;
    t.shadowOffsetY = 1;

    // 外发光
    t.enableGlow = true;
    t.glowColor = qc.Color.red;
    t.glowBlur = 0.5;
};

```
