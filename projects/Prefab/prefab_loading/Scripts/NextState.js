/**
 * @author linyw
 * copyright 2015 Qcplay All Rights Reserved.
 */


var NextScene = qc.defineBehaviour('qc.demo.NextScene', qc.Behaviour, function() {
    this.scene = '';
    this.prefab = null;
}, 
{
    scene: qc.Serializer.STRING,
    prefab: qc.Serializer.PREFAB
});

NextScene.prototype.onClick = function() {
	this.game.scene.load(this.scene, true);   
};
