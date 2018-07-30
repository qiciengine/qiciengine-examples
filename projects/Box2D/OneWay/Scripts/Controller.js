// define a user behaviour
var Controller = qc.defineBehaviour('qc.engine.Controller', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
    box : qc.Serializer.NODE,
    oneWayFloor : qc.Serializer.NODE,
    toggleGroup : qc.Serializer.NODE
});

// Called when the script instance is being loaded.
Controller.prototype.awake = function() {
    var self = this;
    self.addListener(self.toggleGroup.ToggleGroup.onValueChange, function(group, toggle) {
        var direction = 0;
        if (toggle.name === 'LEFT') direction = qc.Box2D.OneWayPlatform.LEFT;
        else if (toggle.name === 'RIGHT') direction = qc.Box2D.OneWayPlatform.RIGHT;

        self.changePlatformDirection(direction);
    });
};

// Called every frame, if the behaviour is enabled.
Controller.prototype.update = function() {
    var self = this;
    var input = self.game.input;

    if (input.isKeyDown(qc.Keyboard.LEFT)) {
        self.box.body.linearVelocity =
            new qc.Point(-5, self.box.body.linearVelocity.y);
    }
    else if (input.isKeyDown(qc.Keyboard.RIGHT))  {
        self.box.body.linearVelocity =
            new qc.Point(5, self.box.body.linearVelocity.y);
    }
    else {
        if (self.box.body.linearVelocity.x !== 0)
            self.box.body.linearVelocity = new qc.Point(0, self.box.body.linearVelocity.y);
    }
};

// 设置穿越方向
Controller.prototype.changePlatformDirection = function(direction) {
    var self = this;
    self.oneWayFloor.OneWayPlatform.direction = direction;
};
