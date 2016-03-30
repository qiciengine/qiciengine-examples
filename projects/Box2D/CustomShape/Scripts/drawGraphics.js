var drawGraphics = qc.defineBehaviour('qc.engine.drawGraphics', qc.Behaviour, function() {
}, {
});

// 绘制多边形函数
drawGraphics.prototype.draw = function(path, closePath) {
    var ctx = this.gameObject;
    ctx.clear();

    // 绘制路径
    if (path.length < 2) return;
    ctx.lineStyle(2, this._color, 0.8);

    ctx.moveTo(path[0].x, path[0].y);
    for (var i = 1, len = path.length; i < len; i++)
        ctx.lineTo(path[i].x, path[i].y);

    if (closePath)
        ctx.lineTo(path[0].x, path[0].y);
};

// 设置绘制线条的颜色
drawGraphics.prototype.setColor = function(color) {
    this._color = color;
};
