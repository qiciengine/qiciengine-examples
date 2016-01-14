#史莱姆部分UI布局范例

* 本范例的主要内容是介绍游戏《史莱姆》的UI界面布局和界面切换。<br>本范例创建三个界面；主地图、天赋树界面、和商店界面,在分辨率为iPhone4 (960\*640)下设计的。<br>说明：UI主要使用组件有UIRoot、Text、Image、ScrollView、Button、TableLayout和Sprite。


## 主地图UI

* 主地图界面主要是为了演示UI布局。效果图如下：<br>
![](images\mainMapUI.png)<br><br>
* 开始绘制主地图UI前，需要设置根节点UIRoot的ScaleAdapter组件，W:960，H:640，ManualType设置为Width缩放。<br>目的是为了在不同的分辨率下，以宽度进行衡量等比缩放。
* 开始绘制主地图UI，在根节点UIRoot下创建一个Empty Node,命名为主地图。此节点用来作为主地图UI的根节点，设置主地图的大小为撑满整个UIRoot。设置参数如下图：<br>
![](images\mainMapSet.png)<br><br>
* 根据效果图绘制主地图UI，将主地图分为三个部分：map、信息栏和底部菜单。

### map

* 创建一个ScrollView，命名为map，用来显示地图图片，使地图可以跟着上下滑动而滑动。<br>设置map的大小为撑满整个主地图，并设置HitArea有效即在Interactive打钩，Type为Fit Target，Size会自动设置为父亲节点的大小。<br>目的是为了使ScrollView在640\*960的区域内可以交互。 如下图：<br>
![](images\map.png)<br><br>
* 在本范例中，主地图是可以上下滑动，所以将两张图片组合在一起作为主地图。<br>
说明：也可以是一张图片，具体看美术提供的资源。<br>效果图如下：<br>
![](images\maptop.png)<br>
![](images\mapbottom.png)<br><br>
* 开始绘制第一张地图，在node节点下创建一个Image组件，命名为mapTop。<br>以父亲节点的顶部对齐，左右拉伸，PosY：0，Height：1136。<br>完成设置之后，在mapTop节点下创建7个Image，分别命名为阿瓦隆要塞、蒸汽之都、混沌深渊、地狱边境、血腥要塞、德古拉城堡、沙漠绿洲，作为地图上城市的名称。从图集中选择相应的图片，设置为图片原始大小，并设置各自的显示位置。例如沙漠绿洲设置效果图如下：<br>
![](images\lvzhou.png)<br>
按照图中1选择Move或者Scale,面板中就会出现一个可移动的方向标记，移动到2指向的蓝色圆点区域，就会出现一个十字型，可以拖动到指定的位置。<br><br>
* 绘制第二张地图，在node节点下创建一个Image组件，命名为mapBottom。定位类型与mapTop一样，设置PosY为1136(PosY为上一张地图的PosY+高)，高度为1136。mapBottom子节点的设置参考mapTop的子节点沙漠绿洲。
* 设置完成两张地图之后，再回来看map节点属性，在最下方有一个Mask属性。如下图：<br>
![](images\mask3.png)<br>
Mask属性前面打钩，看效果图：<br>
![](images\mask2.png)<br><br>
取消打钩再看下效果图：<br>
![](images\mask1.png)<br>
对比两张的效果图，不难发现Mask属性是根据当前节点的矩形区域大小显示图片，超出矩形区域部分会被遮挡，不会显示出来。

### 信息栏

* 信息栏分成三个部分，分别为头像信息、经验条和萝卜。<br>首先在主地图节点下创建一个Empty Node,命名为信息栏。<br>然后在信息栏的节点下创建3个Image，分别命名为头像信息、经验条和萝卜，并设置各自的显示坐标。<br>信息栏主要是为了演示在不同的分辨率下，信息栏UI一直在屏幕顶部显示。<br>所以需要将信息栏节点设置为以顶部对齐，左右拉伸，如下图：<br>
![](images\Transform.png)<br><br>
左右边距都留下20。如下图：<br>
![](images\infoBarSet.png)<br><br>
* 按照顺序绘制头像信息、经验条和萝卜的子节点信息。如下图：<br>
![](images\infoBarUI.png)<br><br>
将头像信息设置为原图大小，以父亲节点的左侧顶部对齐。如下图：<br>
![](images\headicon.png)<br><br>
经验条和萝卜设置为以顶部对齐，左右拉伸，并设置左边距为135，刚好留下头像的显示区域。如下图：<br>
![](images\exp.png)<br><br>
各自的子节点设置，以经验条为例说明：需要创建2个Image组件分别为icon和setting，2个Text组件分别为LV和Exp。将icon设置为以父亲节点的左侧中心点对齐，如下图：<br>
![](images\icon.png)<br><br>
将LV设置为以父亲节点的左侧对齐，为了美光性，我们选择用自定义的字体。<br>
首先在Project面板中，新建目录：Game/Assets/fonts，将自定义的字体hkhb.bin放入目录中。<br>
选中LV节点，设置FontFamily为Web，将hkhb.bin拖拽放入Font中。<br>设置字体大小为24，加厚度为2的黑色描边。如下图：<br>
![](images\lv.png)<br>
其余节点的设置参考icon和LV。

### 底部菜单

* 底部菜单分成三个部分。分别为天赋树、史莱姆和商店。如下图：<br>
![](images\bottommenu.png)<br>
首先在主地图节点下创建一个Empty Node,命名为底部菜单，以父亲节点的底部中心点对齐。<br>然后在底部菜单节点下，创建三个Button分别为史莱姆、天赋树和商店。<br>按照顺序绘制史莱姆、天赋树和商店的子节点信息。<br>设置Button的大小为100\*100，以父亲节点的中心点对齐,如下图：<br>
![](images\button1.png)<br>
按钮名称即Text节点参数，选择hkhb.bin字体，水平方向居中对齐，垂直方向底部对。<br>
加黑色描边，厚度为2。如下图：<br>
![](images\Outline.png)<br>
使用渐变效果,即在On选项打钩。设置渐变颜色,点击Gradient颜色框，会出现调色板，设置start(244,229,200,255)，end(252,144,45,255)。如下图：<br>
![](images\color.png)<br>

### 编辑主地图脚本

* 完成主地图UI设置后，需要创建一个脚本MapUI.js，脚本挂载在主地图的节点下。<br>将天赋树的节点和商店的节点拖拽到脚本中，实现点击天赋树和商店按钮，切换到天赋树界面和商店界面。如下图：<br>
![](images\mainMapScript.png)<br>
MapUI.js代码如下:<br>

``` javascript
 /**
 * 主地图界面
 */
var MapUI = qc.defineBehaviour('qc.demo.MapUI', qc.Behaviour, function() {
    var self = this;

    // 天赋按钮和商店按钮
    self.talentBtn = null;
    self.storeBtn = null;

    // 登记本界面
    window.mapUI = self;
}, {
    // 需要序列化的字段
    talentBtn: qc.Serializer.NODE,
    storeBtn: qc.Serializer.NODE
});

// 界面初始化处理
MapUI.prototype.awake = function() {
    var self = this;

    // 天赋按钮被点击，显示天赋界面
    self.talentBtn.onClick.add(function() {
        window.talentUI.show();
        self.hide();
    });

    // 商店按钮被点击，显示商店界面
    self.storeBtn.onClick.add(function() {
        window.storeUI.show();
        //self.hide();
    });
}

// 显示本界面
MapUI.prototype.show = function() {
    this.gameObject.visible = true;
}

// 隐藏本界面
MapUI.prototype.hide = function() {
    this.gameObject.visible = false;
}
```

## 天赋树界面

* 天赋树界面主要是为了演示远近景。

### 天赋树界面UI设计

* 天赋树界面可以分为6个部分：天空、远景、树、信息栏、底部按钮和光照特效。效果图如下：<br>
![](images\talentUI.png)<br>
按照顺序绘制UI，具体可以参考主地图设计。
* 为了让树一开始就滚动到最下方，需要在树的节点上挂载一个脚本Tree.js控制ScrollView的显示。<br>
代码如下:

```javascript
/**
 * 天赋树的逻辑处理
 */
var Tree = qc.defineBehaviour('qc.demo.Tree', qc.Behaviour, function() {
}, {
});

// 初始化处理
Tree.prototype.awake = function() {
    // 初始时滚动到最下方
    this.gameObject.setNormalizedPosition(1, 1);
}
```

* 为了实现上下滑动树时，天空跟着树按照一定的比例上下滑动，需要在天空的节点上挂载一个脚本ScroSky.js，其中distance是相对于树的滚动距离比例，即如果树往下滑动Y距离，天空会往下滑动Y\*distance距离。如下图:<br>
![](images\sky.png)<br>
代码如下:

```javascript
/**
 * 天空跟着滚动
 */
var ScrollSky = qc.defineBehaviour('qc.demo.ScrollSky', qc.Behaviour, function() {
    // 参考的树对象
    this.tree = null;

    // 对象滚动1像素时，远景滚动的距离
    this.distance = 0.05;
}, {
    // 需要序列化的字段
    tree: qc.Serializer.NODE,
    distance: qc.Serializer.NUMBER
});

// 帧调度
ScrollSky.prototype.update = function() {
    var targetDistance = Math.abs(this.tree.anchoredY);
    this.gameObject.anchoredY = -targetDistance * this.distance - 960;
}
```
* 以下几个点是区别与主地图设计:<br>
1、天赋树界面有使用sprite组件，用于光照特效和盗贼史莱姆。<br>以盗贼史莱姆为例说明，创建一个Sprite组件，设置参数如下图：<br>
![](images\sprite.png)<br><br>
在Default Animation选项选择wait动作，如下图：<br>
![](images\animation.png)<br><br>
2、在底部按钮，使用Button组件，设置了图片切换。将Transition属性设置为TextureSwap，Normal为正常状态下的图片，Pressed为被按下的图片，Disabled为按钮无效的图片。如下图：<br>
![](images\button2.png)<br>

### 编辑天赋树界面脚本

* 如图主地图UI一样，在完成整个UI设计后，需要创建一个脚本TalentUI.js，挂载在天赋树界面节点下，用来控制天赋树界面与主地图之间的切换。<br>
代码如下：

```javascript
/**
 * 天赋树界面
 */
var TalentUI = qc.defineBehaviour('qc.demo.TalentUI', qc.Behaviour, function() {
    var self = this;

    // 返回界面
    self.backBtn = null;

    // 登记本界面
    window.talentUI = self;
}, {
    // 需要序列化的字段
    backBtn: qc.Serializer.NODE
});

// 界面初始化处理
TalentUI.prototype.awake = function() {
    var self = this;

    // 返回按钮的处理：返回地图界面
    self.backBtn.onClick.add(function() {
        self.hide();
        window.mapUI.show();
    });
}

// 显示本界面
TalentUI.prototype.show = function() {
    this.gameObject.visible = true;
}

// 隐藏本界面
TalentUI.prototype.hide = function() {
    this.gameObject.visible = false;
}
```

## 商城界面

* 商城界面主要是为了演示在不同分辨率下，商品列表中的商品会根据宽度的变化，自动排列顺序。
* 首先将根节点UIRoot设置为宽:960，高:640，ManualType设置为Expand缩放。<br>保证内容能完全放入目标屏幕分辨率内。系统自动根据当前分辨率来判定采用Width还是Height模式，以确保内容能完整显示。<br>本范例初始时采用iphone4(640\*960)的分辨率，效果图如下：<br>
![](images\storeUI1.png)<br><br>
然后将分辨率设置为iPhone5(1136\*640)，再来看效果图：<br>
![](images\storeUI2.png)<br>

### 商城界面UI设计

* 商城界面分为4部分：mask、内容、返回按钮和拥有钻石数。
* 具体UI设计可以参考主地图设计。
* 如何实现在不同的分辨率下，商品自动排列显示。<br>其中原因是我们在商品列表的子节点中添加一个TableLayout组件。<br>设置CellSize(150,150)，即每个商品的大小都为150\*150；<br>SpacingSize(10,25)为每个商品的行间距为10，列间距为25。<br>根据不同分辨率的变化，商品都会按照大小和行列间距的设置自动排列显示。如下图：<br>
![](images\TableLayout.png)<br><br>
* 完成UI设计后，创建一个脚本Store.js，用来控制商城界面与主地图之间的切换。如下图：<br>
![](images\store.png)<br><br>
代码如下:

```javascript
/**
 * 商店界面
 */
var StoreUI = qc.defineBehaviour('qc.demo.StoreUI', qc.Behaviour, function() {
    var self = this;

    // 返回界面
    self.backBtn = null;

    // 登记本界面
    window.storeUI = self;
}, {
    // 需要序列化的字段
    backBtn: qc.Serializer.NODE
});

// 界面初始化处理
StoreUI.prototype.awake = function() {
    var self = this;

    // 返回按钮的处理：返回地图界面
    self.backBtn.onClick.add(function() {
        self.hide();
        window.mapUI.show();
    });
}

// 显示本界面
StoreUI.prototype.show = function() {
    this.gameObject.visible = true;
}

// 隐藏本界面
StoreUI.prototype.hide = function() {
    this.gameObject.visible = false;
}
```

