/**
 * @author linyw
 * copyright 2015 Qcplay All Rights Reserved.
 */


var NextScene = qc.defineBehaviour('qc.demo.NextScene', qc.Behaviour, function() {
    this.scene = '';
}, 
{
    scene: qc.Serializer.STRING
});

NextScene.prototype.onClick = function() {
	this.game.scene.load(this.scene, false);        
};
