# DomRotate

* 实例演示Dom使用TweenRotation的效果。效果图如下：<br>
![](images\UI.png)

## UI

* 在新建场景中创建一个Dom节点，设置节点大小为(543,490)，ClassName为img1。
* 在Assets/css/目录下创建脚本style.css，负责dom的风格显示，代码如下：<br>

```javascript
/* css for dom */
.img1 {
    background: url("../raw/d6.png") no-repeat;
}
```
* 在dom节点上添加一个TweenRotation组件，设置Tween的播放类型PlayStyle为Loop，旋转角度为0~360°，周期为10秒。如下图：<br>
![tween](images\tweenRotation.png)
