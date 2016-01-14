/**
 * @author chenqx
 * copyright 2015 Qcplay All Rights Reserved.
 */
/**
 * 
 */
var CodeLoadState = qc.defineBehaviour('qici.demo.CodeLoadState', qc.Behaviour, function() {
	// TODO: Constructor
	var self = this;
	self.texture = null;
	self.sound = null;
	self.sprite = null;
	self.font = null;
	self.prefab = null;
	self.excel = null;
	self.text = null;
	self.changeState = null;
}, {
	// TODO: Serializer
	texture : qc.Serializer.NODE,
	sound : qc.Serializer.NODE,
	sprite : qc.Serializer.NODE,
	font : qc.Serializer.NODE,
	prefab : qc.Serializer.NODE,
	excel : qc.Serializer.NODE,
	text : qc.Serializer.NODE,
	changeState : qc.Serializer.NODE,
});

Object.defineProperties(CodeLoadState.prototype,{
	// TODO: define properties
});

CodeLoadState.prototype.awake = function() {
	var self = this;
    
	self.addListener(self.texture.onDown, function() {
		self.game.assets.load('background_texture', 'Assets/texture/sourcesBackground.bin', function() {
			self.game.world.find('UIRoot/node/show').texture = self.game.assets.find('background_texture');
		});
	});
    
	self.addListener(self.sound.onDown, function() {
		self.game.assets.load('sound', 'Assets/audio/newlevel.mp3.bin', function() {
			var soundCtrl = self.sound.find('Sound');
			if (!soundCtrl.audio) {
				soundCtrl.audio = self.game.assets.find('sound');
			}
			soundCtrl.play();
		});
	});

	self.addListener(self.sprite.onDown, function() {
		self.game.assets.load('sprite', 'Assets/sprites/panda.bin', function() {
			var spriteCtrl = self.sprite.find('Sprite');
			if (!spriteCtrl.texture) {
				spriteCtrl.texture = self.game.assets.find('sprite');
			}
			spriteCtrl.playAnimation('atk2', 1, false);
		});
		
	});

	self.addListener(self.font.onDown, function() {
		self.game.assets.load('font', 'Assets/font/HK.bin', function() {
			var textCtrl = self.font.find('UIText');
			if (textCtrl.fontFamily !== qc.UIText.WEBFONT) {
				textCtrl.fontFamily = qc.UIText.WEBFONT;
				textCtrl.font = self.game.assets.find('font');
			}
		});
	});

	self.addListener(self.prefab.onDown, function() {
		self.game.assets.load('prefab', 'Assets/prefabs/prefab.bin', function() {
			self.game.add.clone(self.game.assets.find('prefab'), self.prefab.find('list'));
		});
		
	});

	self.addListener(self.excel.onDown, function() {
		self.game.assets.load('excel', 'Assets/excel/mother.bin', function() {
			var excelAsset = self.game.assets.find('excel');
			self.excel.find('UIText').text = "sheet's name:" + excelAsset.sheetsName.join(',');
		});
		
	});

	self.addListener(self.text.onDown, function() {
		self.game.assets.load('text', 'Assets/excel/mario_map.bin', function() {
			var textAsset = self.game.assets.find('text');
			self.text.find('UIText').text = "text's content:" + textAsset.text;
		});
		
	});

	self.addListener(self.changeState.onDown, function() {
		self.game.state.load('ReferenceLoad');
	});
};	