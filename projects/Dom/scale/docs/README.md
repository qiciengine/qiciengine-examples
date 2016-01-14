# DomScale

* 实例演示Dom使用TweenScale的效果。效果图如下：<br>
![](images\UI.gif)

## UI

* 在新建场景中创建一个Dom节点，设置节点大小为(543,490)，ClassName为img1。
* 在Assets/css/目录下创建脚本style.css，负责dom的风格显示，代码如下：<br>

```javascript
/* css for dom */
.img1 {
    background: url("../raw/d6.png") no-repeat;
}
```
* 在dom节点上添加一个TweenScale组件，设置Tween的播放类型PlayStyle为PingPong，旋转角度为0.1~1，周期为2秒。如下图：<br>
![tween](images\tweenScale.png)