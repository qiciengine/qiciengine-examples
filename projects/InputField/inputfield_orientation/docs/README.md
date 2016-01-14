# 竖屏锁定

* 本范例演示竖屏锁定的功能。在竖屏锁定的情况下，场景是不允许切换横屏显示的。效果图如下：<br>
![](images\UI.png)

## UI

* 在新建场景中创建一个Empty Node作为lock_portrait。
* 在lock_portrait节点上添加一个插件LockOrientation。<br>
添加步骤：点击"Add Component" -> Plugins -> LockOrientation。<br>
设置Orientation属性为Portrait(竖屏锁定)，如下图：<br>
![](images\orientation.png)
* 在lock_portrait节点下创建一个InputField，将InputField节点放置到屏幕的正上方。





