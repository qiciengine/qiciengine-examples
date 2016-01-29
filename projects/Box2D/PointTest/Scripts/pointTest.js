// define a user behaviour
var pointTest = qc.defineBehaviour('qc.engine.pointTest', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
    ballToggle : qc.Serializer.NODE,
    boxToggle : qc.Serializer.NODE
});

// Called when the script instance is being loaded.
pointTest.prototype.awake = function() {
    var self = this;
    self.lastGameObjects = [];

    self.castBall = self.ballToggle.on;
    self.addListener(self.ballToggle.onValueChange, function() {
        self.castBall = self.ballToggle.on;
    });

    self.castBox = self.boxToggle.on;
    self.addListener(self.boxToggle.onValueChange, function() {
        self.castBox = self.boxToggle.on;
    });
};

// 恢复 tint 颜色
pointTest.prototype.tryRestoreTint = function(event) {
    if (!this.lastGameObjects.length) return;
    for (var i = 0; i < this.lastGameObjects.length; i++) {
        this.lastGameObjects[i].colorTint = new qc.Color(0xffffff);
    }
    this.lastGameObjects = [];
};

// 点击时进行测试
pointTest.prototype.onClick = function(event) {
    var self = this;
    self.tryRestoreTint();

    var source = event.source;
    var x = source.x;
    var y = source.y;

	var result = this.game.box2d.queryFixtureAtPoint(x, y, true, function(gameObject) {
        var name = gameObject.parent.name;
        if (name === 'box' && self.castBox) return true;
        if (name === 'ball' && self.castBall) return true;
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
