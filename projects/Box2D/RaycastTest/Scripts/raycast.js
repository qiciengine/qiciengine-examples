// define a user behaviour
var queryAABB = qc.defineBehaviour('qc.engine.queryAABB', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
    graphicsNode : qc.Serializer.NODE,
    ballToggle : qc.Serializer.NODE,
    boxToggle : qc.Serializer.NODE,
    nearestToggle : qc.Serializer.NODE
});

// Called when the script instance is being loaded.
queryAABB.prototype.awake = function() {
    var self = this;
    self.points = [];

    self.castBall = self.ballToggle.on;
    self.addListener(self.ballToggle.onValueChange, function() {
        self.castBall = self.ballToggle.on;
    });

    self.castBox = self.boxToggle.on;
    self.addListener(self.boxToggle.onValueChange, function() {
        self.castBox = self.boxToggle.on;
    });

    self.nearest = self.nearestToggle.on;
    self.addListener(self.nearestToggle.onValueChange, function() {
        self.nearest = self.nearestToggle.on;
    });
};

// 删除旧的 points
queryAABB.prototype.deletePoints = function(event) {
    if (!this.points.length) return;
    for (var i = 0; i < this.points.length; i++) {
        this.points[i].destroy();
    }
    this.points = [];
};

// 创建一个 img
queryAABB.prototype.createPoint = function(x, y) {
    var img = this.game.add.image();
	img.texture = this.game.assets.find('__builtin_resource__');
    img.pivotX = 0.5;
	img.pivotY = 0.5;
    img.colorTint = new qc.Color(0xff0000);
	img.width = 8;
    img.height = 8;
	img.x = x;
	img.y = y;

    this.points.push(img);
};

// 拖拽的时候，绘制拖拽框
queryAABB.prototype.onDrag = function(event) {
    var self = this;
    self.deletePoints();

    var source = event.source;
    var startX = source.startX;
    var startY = source.startY;
    var endX = source.x;
    var endY = source.y;

    // 绘制射线
    self.graphicsNode.getScript('qc.engine.drawGraphics').drawLine(startX, startY, endX, endY);

	var result = self.game.box2d.raycast(startX, startY, endX, endY, self.nearest, function(gameObject) {
        var name = gameObject.parent.name;
        if (name === 'box' && self.castBox) return true;
        if (name === 'ball' && self.castBall) return true;
        return false;
    });
    var len = result.length;

	for (var i = 0; i < len; i++) {
        var info = result[i];
        self.createPoint(info.point.x, info.point.y);
    }
};

// 拖拽结束清空
queryAABB.prototype.onDragEnd = function(event) {
    this.deletePoints();
    this.graphicsNode.clear();
};
