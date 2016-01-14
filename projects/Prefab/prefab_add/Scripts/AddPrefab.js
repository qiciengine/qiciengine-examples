/**
 * @author chenqx
 * copyright 2015 Qcplay All Rights Reserved.
 */
/**
 * 
 */
var AddPrefab = qc.defineBehaviour('qici.demo.AddPrefab', qc.Behaviour, function() {
	var self = this;
	self.prefab = null;
	self.parent = null;
}, {
	prefab : qc.Serializer.PREFAB,
	parent : qc.Serializer.NODE
});

Object.defineProperties(AddPrefab.prototype,{
	
});

AddPrefab.prototype.awake = function() {
	var self = this;
	this.addListener(self.gameObject.onDown, function() {
		if (!self.parent || !self.prefab) {
			return;
		}
		// 复制一个预制到指定节点下
		self.game.add.clone(self.prefab, self.parent);
	});
};