# 环境搭建
[点击查看文档](http://docs.zuoyouxi.com/manual/Overview/Install.html)  
 
# 创建工程
指定工程文件夹名：HelloWorld。操作方法如下：  
<video controls="controls" src="video/create_project.mp4"></video> 

# 工程设置
1. 设定编辑器布局为：竖屏。操作方法：选择菜单“Layout/Portrait”  
2. 选择菜单“Project/Settings...”，在Inspector面板中打开工程设置界面
3. 设置值如下：
	* Project Name（工程名）： HelloWorld
	* Game Name（游戏名）：HelloWorld
	* Company（开发者姓名或公司名）：qcplay
	* Identifier（游戏唯一标识符，需要保证唯一）：com.qici.helloworld
	* Version（当前工程的版本号）：0.9
	* 其他字段使用默认值  

<video controls="controls" src="video/setting.mp4"></video> 

# 创建场景
创建一个空的场景，步骤如下：
1. 选择菜单“Project/New Scene”
2. 场景中挂载个UIRoot对象（暂时可以理解为放界面元素的根节点就好了）
3. 保存场景，场景名称：HelloWorld，场景的文件路径：Assets/state/HelloWorld.bin  

<video controls="controls" src="video/create_scene.mp4"></video> 

# 设置为入口场景
将刚才创建的新场景HelloWorld加入到场景列表中。方法是打开Project Setting面板，将场景选中：  
1. 在场景列表中，第一个即为入口场景（系统会自动加载）
2. 场景需要勾选后，才能被加载。否则发布时将视为无效场景

<video controls="controls" src="video/add_scene.mp4"></video> 

# 添加脚本
这里，我们使用代码创建一个文本，并显示：”Hello World!“。
1. 在Project面板中，右击”Script“创建一个js文件：Init.js
2. 双击打开，编辑代码如下：  
````javascript
	var Init = qc.defineBehaviour('qc.helloworld.Init', qc.Behaviour, function() {

	}, {
	});

	Init.prototype.awake = function() {
		// create a text
	    var node = this.game.add.text(this.gameObject);
	    node.text = 'Hello World!';
	    node.color = new qc.Color(0xffffff);
	};
````
3. 将此代码挂载到UIRoot节点（方法是直接拖拽到节点上），这样此脚本就能被调度运行。  
<video controls="controls" src="video/add_script.mp4"></video> 

## 代码讲解
* 首先，我们定义一个类：qc.helloworld.Init。qc.defineBehaviour接收4个参数，这里可以先简单了解下：  
	第一个参数：类的名字为qc.helloworld.Init  
	第二个参数：所有挂载到场景对象（本示例为UIRoot节点）的脚本，都应该继承自：qc.Behaviour  
	第三个参数：脚本对象的构造函数  
	第四个参数：可被序列化的对象字段及其类型描述  
````javascript
	var Init = qc.defineBehaviour('qc.helloworld.Init', qc.Behaviour, function() {

	}, {
	});
````
* 然后，在Init对象的awake函数中，添加逻辑代码以创建text。awake并不需要开发者自己去调度，当UIRoot这个节点被反序列化后，系统自动调用脚本的awake方法
* 在awake方法中：
	* this.game：游戏实例的引用
	* this.game.add：对象创建工厂（可以用来创建文本、图片、精灵等对象）
	* this.gameObject：本逻辑脚本挂载的目标游戏对象（本实例为UIRoot）
	* this.game.add.text(this.gameObject)：在UIRoot节点下，创建一个Text对象
	* 然后设置文本内容为：'Hello World!'
	* 最后设置文本颜色值为白色

# 运行起来
1. 保存当前场景
2. 点击”运行“按钮，查看结果   

<video controls="controls" src="video/run.mp4"></video> 

# 让文字居中
默认情况下，文本的位置在屏幕左上角(0,0)。修改Init.js代码，在awake中，添加如下代码：
````javascript
	// 设置文本对象原点在中心
	node.pivotX = 0.5;
    node.pivotY = 0.5;

    // 位置居中
    node.x = this.gameObject.width/2;
    node.y = this.gameObject.height/2;

    // 文本水平对齐
    node.alignH = qc.UIText.CENTER;
````
运行之，现在文本居中显示了。  
<video controls="controls" src="video/center.mp4"></video> 

# 换个方式：不要编码
在之前的实现方式中，如果非编码人员（如策划人员、美术人员）想要调整显示的文字、位置和样式等，他们是没有能力自行修改的。  
因此我们换一种方式，直接在场景中可视化创建文字对象，并设置其内容、文字大小等信息：  
1. 将Init.js从UIRoot对象中干掉，这样此脚本将无法自动被调度了
2. 在UIRoot下创建UIText节点，并在Inspector面板中设置其内容   
3. 运行查看效果  
4. 是不是比手写代码快很多？  
<video controls="controls" src="video/editor.mp4"></video> 

# 这一切如何发生的呢？
从传统的编程方式来看，到这里会有一些疑问：程序执行入口在哪？编辑器”偷偷摸摸“干了些啥？让我们依次展开详细解释。  
首先，将本工程发布出来  
打开文件：[StartGame.html](StartGame.txt)，查看文件内容。这里按顺序摘取主要内容依次解释。 
<video controls="controls" src="video/publish.mp4"></video> 

* 游戏配置  
由编辑器根据Project Settings自动生成
````javascript
	qici.config = {
        projectName: 'HelloWorld',
        gameName: 'HelloWorld',
        companyName: 'qcplay',
        bundleIdentifier: 'com.qici.helloworld',
        gameInstance: 'qc_game',
        backgroundColor: 4671303,
        runInBackground: true,
        antialias: true,
        transparent: false,
        developerMode: false,
        renderer: 'Auto',
        loadingPrefab: '',
        scene: {
            
        "HelloWorld" : "Assets/state/HelloWorld.bin"
        },
        entityScene : 'HelloWorld',
        loading: {
            loadingInterval: 200,
            brightingInterval: 10,
            blinkingCount: 5,
            blinkingInterval: 70,
            fadingInterval: 400
        }
    };
````
* 导入引擎库文件和用户脚本文件  
游戏一开始会出现吃豆子的加载动画，这过程加载如下几个代码文件：
````javascript
	qici.scripts = [
        './Assets/meta/globalUrlMap.js',
        'http://engine.zuoyouxi.com/lib/0.97.06/phaser.min.js',
        'http://engine.zuoyouxi.com/lib/0.97.06/webfontloader.js',
        'http://engine.zuoyouxi.com/lib/0.97.06/qc-core.js',
        // External scripts for plugins

        // User scripts    
        './js/game-scripts-mini-0.9.js'
    ];
````
加载这些js文件和播放进度的动画表现，在qc-loading.js脚本中实现：
````javascript   
<body onload="qici.init();">
    <div id="gameDiv" style="position:relative;"></div>
    <script src='http://engine.zuoyouxi.com/lib/0.97.06/qc-loading.js'></script>
</body>
````
* 游戏实例初始化  
在编辑器目录，打开lib/qc-loading-debug.js文件。加载js文件和进度表现的逻辑忽略不看；  
当js文件加载完毕后，调用qici.loadGame方法：
````javascript
qici.loadGame = function() {
    var game = window[qici.config.gameInstance] = new qc.Game({
        width: '100%',
        height: '100%',
        parent: 'gameDiv',
        state: qici.splashState,
        editor: qici.config.editor === true,
        backgroundColor: new qc.Color(qici.config.backgroundColor),
        runInBackground: qici.config.runInBackground,
        antialias: qici.config.antialias,
        transparent: qici.config.transparent,
        debug: qici.config.developerMode === true,
        renderer: (function() {
            if (qici.config.renderer === 'WebGL') {
                return Phaser.WEBGL;
            }
            if (qici.config.renderer === 'Canvas'){
                return Phaser.CANVAS;
            }
            return Phaser.AUTO;
        })()
    });
    game.bundleIdentifier = qici.config.bundleIdentifier;
    game.log.important('**** [QICI Engine]Starting game: {0}', qici.config.gameName);
};
````
游戏的初始化流程在这里实现了：实例化qc.Game，构造函数接收一个object进行配置。大部分配置属性暂时不去理会，这里着重看下state(值为qici.splashState)  
* Splash State  
这个其实是个空的内置场景，此场景完成一些初始化信息（例如loading动画等）。最重要的是：通过此场景载入入口场景（本例子为HelloWorld）。主流程如下：  
````javascript   
qici.splashState = {
    init: function() {
        window[qici.config.gameInstance].fullScreen();
    },
    preload: function() {
        var game = window[qici.config.gameInstance];
        if (qici.config.loadingPrefab) {
            game.assets.load('__loading_prefab__', qici.config.loadingPrefab);
        }

        var text = game.add.text();
        text.text = 'Initializing, please wait ...';
        text.setAnchor(new qc.Point(0, 0), new qc.Point(1, 1));
        text.left = 0;
        text.right = 0;
        text.top = 0;
        text.bottom = 0;
        text.alignH = qc.UIText.CENTER;
        text.alignV = qc.UIText.MIDDLE;
        text.fontSize = 24;
        text.color = new qc.Color(0xffffff);
        text.strokeThickness = 2;
        text.stroke = new qc.Color(0x000000);
        game._initText_ = text;
        game.updateScale(true);
    },
    create: function() {
        var game = window[qici.config.gameInstance];
        game.state.entity = qici.config.entityScene;
        game.state.list = qici.config.scene;
        var node;
        if (qici.config.loadingPrefab) {
            var prefab = game.assets.find('__loading_prefab__');
            if (prefab) {
                node = game.add.clone(prefab);
                node.ignoreDestroy = true;
                node.visible = false;
            }
        }
        if (game._initText_) {
            if (node) {
                game._initText_.destroyImmediately();
            }
            delete game._initText_;
        }
        game.phaser.time.events.add(1, function() { game.state.load(game.state.entity, true); });
        if (qici.config.frameRate) game.time.frameRate = qici.config.frameRate;
    }
};
````
* 进入主场景后，系统反序列化场景内容并逐一构建场景对象。构建完毕后依次初始化场景节点（通过调用逻辑脚本的awake函数）

# 初始化流程总结
这些初始化流程编辑器已经自动帮你完成：
1. 实例化qc.Game
2. Game启动后，依次调用SplashState场景（空的内置场景）的init、preload和create，并载入入口场景
3. 下载、反序列化入口场景，将场景重新构建后调用awake方法（挂载到对象的逻辑脚本才会调用）

# 继续阅读
[游戏制作与启动](http://engine.zuoyouxi.com/demo/GetStart/StartUp/index.html)
