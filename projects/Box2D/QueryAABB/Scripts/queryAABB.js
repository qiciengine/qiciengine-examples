// define a user behaviour
var queryAABB = qc.defineBehaviour('qc.engine.queryAABB', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
    graphicsNode : qc.Serializer.NODE,
    toggles : qc.Serializer.NODE
});

// Called when the script instance is being loaded.
queryAABB.prototype.awake = function() {
    var self = this;
    self.lastGameObjects = [];

    var toggleGroup = this.toggles.getScript('qc.ToggleGroup');
    self.itemType = toggleGroup.toggle.name;
    this.addListener(toggleGroup.onValueChange, function() {
        self.itemType = toggleGroup.toggle.name;
    });
};

// 恢复 tint 颜色
queryAABB.prototype.tryRestoreTint = function(event) {
    if (!this.lastGameObjects.length) return;
    for (var i = 0; i < this.lastGameObjects.length; i++) {
        this.lastGameObjects[i].colorTint = new qc.Color(0xffffff);
    }
    this.lastGameObjects = [];
};

// 拖拽的时候，绘制拖拽框
queryAABB.prototype.onDrag = function(event) {
    var self = this;
    self.tryRestoreTint();

    var source = event.source;
    var startX = source.startX;
    var startY = source.startY;
    var endX = source.x;
    var endY = source.y;

    var x = Math.min(startX, endX);
    var y = Math.min(startY, endY);
    var width = Math.abs(startX - endX);
    var height = Math.abs(startY - endY);
    this.graphicsNode.getScript('qc.engine.drawGraphics').drawRect(x, y, x + width, y + height);

	var result = this.game.box2d.queryAABB(x, y, width, height, true, function(gameObject) {
        var name = gameObject.parent.name;
        if (name === self.itemType || self.itemType === 'both') return true;
        return false;
    });
    var len = result.length;

    self.lastGameObjects = [];
	for (var i = 0; i < len; i++) {
        var info = result[i];
        info.gameObject.colorTint = new qc.Color(0xCC2255);
        self.lastGameObjects.push(info.gameObject);
    }
};

// 拖拽结束清空
queryAABB.prototype.onDragEnd = function(event) {
    this.tryRestoreTint();
    this.graphicsNode.clear();
};
