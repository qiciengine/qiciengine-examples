// define a user behaviour
var Controller = qc.defineBehaviour('qc.engine.Controller', qc.Behaviour, function() {
    // need self behaviour be scheduled in editor
    //self.runInEditor = true;
}, {
    // fields need to be serialized
    enableDebugToggle : qc.Serializer.NODE,
    shapeToggle : qc.Serializer.NODE,
    jointToggle : qc.Serializer.NODE,
    aabbToggle : qc.Serializer.NODE,
    pairToggle : qc.Serializer.NODE,
    centerOfMassToggle : qc.Serializer.NODE
});

// Called when the script instance is being loaded.
Controller.prototype.awake = function() {
    var self = this;
    var world = self.game.box2d;
    var flagToggles = [ self.shapeToggle, self.jointToggle, self.aabbToggle, self.pairToggle, self.centerOfMassToggle ];
    var flagBits = [ DebugDraw.FlagShapeBit, DebugDraw.FlagJointBit, DebugDraw.FlagAabbBit, DebugDraw.FlagPairBit, DebugDraw.FlagCenterOfMassBit ];
    var flagCount = flagToggles.length;
    var i;

    self.enableDebugToggle.on = world.debugDraw;
    self.addListener(self.enableDebugToggle.onValueChange, function() {
        var v = self.enableDebugToggle.on;
        world.debugDraw = v;
        for (i = 0; i < flagCount; i++)
            flagToggles[i].visible = v;
    });

    for (i = 0; i < flagCount; i++) {
        self.bindFlagToToggle(flagToggles[i], flagBits[i]);
    }
};

// 绑定 toggle 到 debug flags 中
Controller.prototype.bindFlagToToggle = function(toggle, bit) {
    var self = this;
    var world = self.game.box2d;

    toggle.on = (world.debugFlags & bit) > 0;
    self.addListener(toggle.onValueChange, function() {
        var v = toggle.on;
        if (v) world.debugFlags |= bit;
        else world.debugFlags &= ~bit;
    });
};
