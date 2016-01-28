// define a user behaviour
var AddItem = qc.defineBehaviour('qc.engine.AddItem', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
    boxPrefab : qc.Serializer.PREFAB,
    ballPrefab : qc.Serializer.PREFAB
});

// Called when the script instance is being loaded.
AddItem.prototype.onClick = function() {
	var prefab = Math.random() < 0.5 ? this.boxPrefab : this.ballPrefab;
    
    var ob = this.game.add.clone(prefab);
    ob.parent = this.gameObject;
    ob.x = 40 + Math.random() * (640 - 80);
	ob.y = 40;
};

// Called every frame, if the behaviour is enabled.
//AddItem.prototype.update = function() {
//
//};
