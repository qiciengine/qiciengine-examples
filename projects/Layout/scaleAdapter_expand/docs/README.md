# Expand

* 本范例演示分辨率子适应：等比缩放。如下图：<br>
![](images\UI.gif)
* 在新建场景中创建一个Image作为背景图。
* 选中UIRoot节点，设置ScaleAdapter的缩放方式ManualType为Expand，参考分辨率为640\*960。
* 运行游戏，更改分辨率可以看到UIRoot节点的Width和Height值会根据当前分辨率调整大小，保证内容能完全放入目标屏幕分辨率内。
* 可参考[《分辨率自适应》](http://engine.zuoyouxi.com/demo/Layout/uiroot_adapt/index.html)