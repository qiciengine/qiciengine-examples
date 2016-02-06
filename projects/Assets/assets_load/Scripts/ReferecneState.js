/**
 * @author chenqx
 * copyright 2015 Qcplay All Rights Reserved.
 */
/**
 * 
 */
var ReferenceState = qc.defineBehaviour('qici.demo.ReferenceState', qc.Behaviour, function() {
	// TODO: Constructor
	var self = this;
	self.sound = null;
	self.sprite = null;
	self.font = null;
	self.prefab = null;
	self.excel = null;
	self.text = null;
	self.changeState = null;
	self.prefabAsset = null;
	self.excelAsset = null;
	self.textAsset = null;
}, {
	// TODO: Serializer
	sound : qc.Serializer.NODE,
	sprite : qc.Serializer.NODE,
	font : qc.Serializer.NODE,
	prefab : qc.Serializer.NODE,
	excel : qc.Serializer.NODE,
	text : qc.Serializer.NODE,
	changeState : qc.Serializer.NODE,
	prefabAsset : qc.Serializer.PREFAB,
	excelAsset : qc.Serializer.EXCELASSET,
	textAsset : qc.Serializer.TEXTASSET
});

Object.defineProperties(ReferenceState.prototype,{
	// TODO: define properties
});

ReferenceState.prototype.awake = function() {
	var self = this;
	self.addListener(self.sound.onDown, function() {
		self.sound.find('Sound').play();
	});

	self.addListener(self.sprite.onDown, function() {
		self.sprite.find('Sprite').playAnimation('atk2', 1, false);
	});

	self.addListener(self.font.onDown, function() {

	});

	self.addListener(self.prefab.onDown, function() {
		self.game.add.clone(self.prefabAsset, self.prefab.find('list'));
	});

	self.addListener(self.excel.onDown, function() {
		self.excel.find('UIText').text = "sheet's name:" + self.excelAsset.sheetsName.join(',');
	});

	self.addListener(self.text.onDown, function() {
		self.text.find('UIText').text = "text's content:" + self.textAsset.text;
	});

	self.addListener(self.changeState.onDown, function() {
		self.game.scene.load('CodeLoad');
	});
};	