// define a user behaviour
var DebugDraw = qc.defineBehaviour('qc.engine.DebugDraw', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    this.runInEditor = true;
}, {
    // fields need to be serialized
    spriteNode : qc.Serializer.NODE,
    slider : qc.Serializer.NODE,
    text :qc.Serializer.NODE,
    maxEpsilon : qc.Serializer.NUMBER
});

// Called when the script instance is being loaded.
DebugDraw.prototype.awake = function() {
    var self = this;
    self.addListener(self.slider.onValueChange, self.resetEpsilon, self);
    self.resetEpsilon();
};

DebugDraw.prototype.resetEpsilon = function() {
    this.epsilon = Math.floor(this.slider.value * this.maxEpsilon * 10) / 10;
    this.text.text = 'epsilon:' + this.epsilon;

    // 计算图形的动态
    // if (this.epsilon === this.lastEpsilon)
       // return;
    this.lastEpsilon = this.epsilon;

    var sprites = this.spriteNode.children;
    var i, len;
    var path;
    var geomUtil = this.game.box2d.geomUtil;

    this.paths = [];
    for (i = 0, len = sprites.length; i < len; i++) {
        path = geomUtil.marchingSquares(sprites[i]);
        path = geomUtil.RDPsd(path, this.epsilon);
        path = geomUtil.decomp(path);

        this.paths.push({
            sprite : sprites[i],
            path : path
        });
    }
};

// Called every frame, if the behaviour is enabled.
DebugDraw.prototype.update = function() {
    var self = this;
    if (!self._initCanvas()) return;

    self.resetEpsilon();

    var context = self._context;
    var canvas = self._canvas;

    // 清空之前的 debug draw 信息
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 开始绘制工作
    context.save();
    context.scale(this.game.resolution, this.game.resolution);

    var paths = this.paths;
    var i, len;
    var j, lenJ;
    for (i = 0, len = paths.length; i < len; i++) {
        for (j = 0, lenJ = paths[i].path.length; j < lenJ; j++) {
            self.drawPath(context, paths[i].sprite, paths[i].path[j]);
        }
    }

    // 结束绘制工作
    context.restore();
};

// 绘制路径
DebugDraw.prototype.drawPath = function(context, sprite, path) {
    var worldPosition = sprite.getWorldPosition();
    var worldScale = sprite.getWorldScale();

    context.beginPath();

    var i, len;
    var scaleX = worldScale.x * sprite.width / sprite.phaser.texture.crop.width;
    var scaleY = worldScale.y * sprite.height / sprite.phaser.texture.crop.height;

    for (i = 0, len = path.length; i <= len; i++) {
        context.arc(worldPosition.x + path[i === len ? 0 : i][0] * scaleX,
                    worldPosition.y + path[i === len ? 0 : i][1] * scaleY,
                    2, 0, 2 * Math.PI, false);
    }

    context.stroke();
};

/**
 * 创建 debug 用的 canvas
 */
DebugDraw.prototype._initCanvas = function() {
    var self = this;

    // 找到游戏 canvas 对象
    var gameCanvas = self.game.canvas;
    if (!gameCanvas)
        return false;

    var canvas = self._canvas;
    if (!canvas) {
        // 尝试创建 canvas
        canvas = self._canvas = document.createElement('canvas');
        self._context = self._canvas.getContext('2d');
        gameCanvas.parentNode.insertBefore(self._canvas, gameCanvas);
        canvas.style.left = canvas.style.top = '0px';
        canvas.style.position = 'absolute';
    }

    // 调整为游戏画布大小
    if (canvas.style.width !== gameCanvas.style.width ||
        canvas.style.height !== gameCanvas.style.height ||
        canvas.width !== gameCanvas.width ||
        canvas.height !== gameCanvas.height) {
        canvas.width = gameCanvas.width;
        canvas.height = gameCanvas.height;
        canvas.style.width = gameCanvas.style.width;
        canvas.style.height = gameCanvas.style.height;
    }

    // 调整 margin
    [ 'marginLeft', 'marginLRight', 'marginTop', 'marginBottom' ].forEach(function(key) {
        if (canvas.style[key] !== gameCanvas.style[key])
            canvas.style[key] = gameCanvas.style[key];
    });
    return true;
};


