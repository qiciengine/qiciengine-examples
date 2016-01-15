var s = qc.Serializer;

// define a user behaviour
var capture = qc.defineBehaviour('qc.engine.capture', qc.Behaviour, function() {
    // need this behaviour schedule in editor
    //this.runInEditor = true;
}, {
    capNode : s.NODE,
	imgNode : s.NODE,
    domNode : s.NODE,
    mask : s.NODE
});

// 节点被点击了，整个 capNode 截屏
capture.prototype.onClick = function() {
    this.capture();
};

// 拖拽开始，显示拖拽区域
capture.prototype.onDragStart = function(event) {
	this.mask.visible = true;
    this.mask.width = 0;
    this.mask.height = 0;
};

// 拖拽中，处理拖拽区域显示
capture.prototype.onDrag = function(event) {
	var source = event.source;
    var startX = source.startX;
    var startY = source.startY;
    var endX = source.x;
    var endY = source.y;

    var wt = this.mask.parent.worldTransform;
    var p1 = wt.applyInverse(new qc.Point(startX, startY));
    var p2 = wt.applyInverse(new qc.Point(endX, endY));

    this.mask.x = Math.min(p1.x, p2.x);
    this.mask.y = Math.min(p1.y, p2.y);
    this.mask.width = Math.abs(p2.x - p1.x);
    this.mask.height = Math.abs(p2.y - p1.y);
};

// 拖拽结束尝试截屏指定区域
capture.prototype.onDragEnd = function(event) {
    // 隐藏 mask 区域
    this.mask.visible = false;

    var source = event.source;
    var startX = source.startX;
    var startY = source.startY;
    var endX = source.x;
    var endY = source.y;

    // 根据世界矩阵，计算相对 capNode 的逻辑坐标
    var wt = this.capNode.worldTransform;
    var p1 = wt.applyInverse(new qc.Point(startX, startY));
    var p2 = wt.applyInverse(new qc.Point(endX, endY));

    var rectLeft = Math.max(Math.min(p1.x, p2.x), 0);
    var rectRight = Math.min(Math.max(p1.x, p2.x), this.capNode.width);
    var rectUp = Math.max(Math.min(p1.y, p2.y), 0);
    var rectDown = Math.min(Math.max(p1.y, p2.y), this.capNode.height);

    var p0 = new qc.Point(0, 0);
    p1 = new qc.Point(rectLeft, rectUp);
    p2 = new qc.Point(rectRight, rectDown);

    if (p2.x > p1.x && p2.y > p1.y)
        // 有效的区域
		this.capture(new qc.Rectangle(p1.x - p0.x, p1.y - p0.y, p2.x - p1.x, p2.y - p1.y));
};

// 截屏的逻辑
capture.prototype.capture = function(bounds) {
    // 1. 截屏到 Image 对象，删除 dom 上旧的 img，将当前图片加入进去
    var div = this.domNode.div;
    while (div.children.length) div.removeChild(div.children[0]);
    var img = this.capNode.snapshotAsImage(bounds, 150, 150);
    div.appendChild(img);
    img.style.width = '100%';
    img.style.height = '100%';

    // 现在已知 ios 的 safari 需要强制更改 div 属性，否则不会显示
    // desktop、安卓或者 Ios 的其他浏览器无这个问题。
    // 强制设置让其显示
    div.style.opacity = '0.999999';

    // 2. 截屏到 atlas 对象上
	this.capNode.snapshotAsAtlas('capture', bounds, 150, 150);
	this.imgNode.texture = null;
	this.imgNode.texture = this.game.assets.find('capture');
};
