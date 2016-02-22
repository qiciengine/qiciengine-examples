// define a user behaviour
var test = qc.defineBehaviour('qc.engine.test', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
    this._testValue = 0;
    this.testString = '';
    this.testColor = qc.Color.White;
    this.testTexture = null;
}, {
    // fields need to be serialized
    testValue: qc.Serializer.NUMBER,
    testString: qc.Serializer.STRING,
    testColor: qc.Serializer.COLOR,
    testTexture: qc.Serializer.TEXTURE
});

// Called when the script instance is being loaded.
//test.prototype.awake = function() {
//
//};

// Called every frame, if the behaviour is enabled.
//test.prototype.update = function() {
//
//};
Object.defineProperties(test.prototype, {
    testValue: {
        get: function() {
            return this._testValue;
        },
        set: function(v) {
            this._testValue = v;
            console.log(v);
        }
    }
}); 

test.prototype.onClick = function() {
    qc.N('node').Animator.play();    
};

// Add custom action properties
qc.extend.addProperty('qc.Node', 'test.testValue', qc.Serializer.NUMBER);
qc.extend.addProperty('qc.Node', 'test.testString', qc.Serializer.STRING);
qc.extend.addProperty('qc.Node', 'test.testColor', qc.Serializer.COLOR);
qc.extend.addProperty('qc.Node', 'test.testTexture', qc.Serializer.TEXTURE);
qc.extend.addProperty('qc.ParticleSystem', 'quantity', qc.Serializer.NUMBER);