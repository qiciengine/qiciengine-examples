// define a user behaviour
var addBody = qc.defineBehaviour('qc.engine.addBody', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
    sensitivity : qc.Serializer.NUMBER,
    graphNode : qc.Serializer.NODE
});

// Called when the script instance is being loaded.
addBody.prototype.awake = function() {
    var self = this;
    self.path = [];
    self._bodyCount = 0;

    // 初始化一个 canvas
    var canvas = self._canvas = document.createElement('canvas');
    self._context = canvas.getContext('2d');
};

addBody.prototype.clearGraphic = function() {
    this.graphNode.clear();
    this.graphNode.drawGraphics.setColor(0xffeeff);
    this._clearGraphicTimer = 0;
};

addBody.prototype.onDragStart = function(event) {
    // 确保删除 timer
    if (this._clearGraphicTimer) {
        this.game.timer.remove(this._clearGraphicTimer);
    }
    this.clearGraphic();
};

addBody.prototype.onDrag = function(event) {
    var self = this;
    var path = self.path;

    var source = event.source;
    var x = source.x;
    var y = source.y;
    var lastPoint = path.length ? path[path.length - 1] : null;

    if (!lastPoint ||
        Math.abs(lastPoint.x - x) + Math.abs(lastPoint.y - y) > this.sensitivity) {
        // 加入这个点，更新图形
        path.push(new qc.Point(x, y));

        this.graphNode.drawGraphics.draw(path);
    }

};

addBody.prototype.onDragEnd = function(event) {
    var self = this;
    var path = self.path;
    var rawPath = path;
    var geomUtil = this.game.box2d.geomUtil;

    // 结尾
    this.graphNode.drawGraphics.draw(path, true);

    // 简化路径
    path = geomUtil.RDPsd(path, 3);

    // 判定是否 path 的两条路径中间有相交来判定是否简单多边形
    if (!geomUtil.isSimple(path)) {
        self.path = [];
        self.graphNode.drawGraphics.setColor(0xff0000);
        self.graphNode.drawGraphics.draw(rawPath, true);
        self._clearGraphicTimer = self.game.timer.add(500, function() {
            self.clearGraphic();
        });
        return;
    }

    if (path.length < 3) {
        self.path = [];
        self.graphNode.clear();
        return;
    }

    var i, len;
    var minX = 0xffff, minY = 0xffff;
    var maxX = 0, maxY = 0;
    var x, y;
    var width, height;

    for (i = 0, len = path.length; i < len; i++) {
        x = path[i].x;
        y = path[i].y;
        minX = Math.min(x, minX);
        minY = Math.min(y, minY);
        maxX = Math.max(x, maxX);
        maxY = Math.max(y, maxY);
    }

    // 计算宽高，并将所有点作为相对 minX, minY
    width = maxX - minX;
    height = maxY - minY;
    for (i = 0; i < len; i++) {
        path[i].x -= minX;
        path[i].y -= minY;
    }

    // 分割多边形
    decompPath = geomUtil.decomp(path);

    if (!decompPath.length) {
        // 清空路径
        self.path = [];
        self.graphNode.clear();
        return;
    }

    // 绘制每个图形
    var canvas = self._canvas;
    var context = self._context;
    canvas.width = width;
    canvas.height = height;

    len = decompPath.length;
    for (i = 0; i < len; i++) {
        context.beginPath();
        context.fillStyle = 'rgb(#R, #G, #B)'
            .replace('#R', Math.floor(Math.random() * 255))
            .replace('#G', Math.floor(Math.random() * 255))
            .replace('#B', Math.floor(Math.random() * 255));


        var subPath = decompPath[i];
        for (var j = 0, lenJ = subPath.length; j < lenJ; j++) {
            if (j === 0)
                context.moveTo(subPath[j].x, subPath[j].y);
            else
                context.lineTo(subPath[j].x, subPath[j].y);
        }

        context.closePath();
        context.fill();
    }

    // 抽取这个图片
    var key = 'body' + (++self._bodyCount);
    var img = new Image();
    img.src = canvas.toDataURL();
    img.onload = function() {
        var atlas = qc.AssetUtil.addAtlasFromImage(self.game, key, key, img);

        // 新增一个图片
        var sprite = self.game.add.image();
        sprite.name = key;
        sprite.texture = atlas;
        sprite.x = minX;
        sprite.y = minY;
        sprite.width = width;
        sprite.height = height;

        sprite.addScript('qc.Box2D.Body');

        self.addListener(sprite.body.onBodyCreated, function() {
            sprite.body.type = qc.Box2D.BODY_TYPE.DYNAMIC;
            sprite.body.setPolygonVertices(path);
        });

        // 清空路径
        self.path = [];

        self._clearGraphicTimer = self.game.timer.add(500, function() {
            self.clearGraphic();
        });
    };
};
