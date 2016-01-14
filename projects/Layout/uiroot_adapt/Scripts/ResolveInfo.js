/**
 * @author chenqx
 * copyright 2015 Qcplay All Rights Reserved.
 */
/**
 * 
 */
var ResolveInfo = qc.defineBehaviour('qici.demo.ResolveInfo', qc.Behaviour, function() {
	
}, {
	
});

Object.defineProperties(ResolveInfo.prototype,{
	
});

ResolveInfo.prototype.awake = function() {
	var self = this;

	self.lastUpdateTime = self.game.time.fixedTime;
};

ResolveInfo.prototype.update = function() {
	var self = this,
		currTime = self.game.time.fixedTime,
		uiroot = self.game.world.find('UIRoot'),
		scaleAdapter = uiroot.getScript('qc.ScaleAdapter');
	if (currTime - self.lastUpdateTime < 500) {
		return;
	}

	self.lastUpdateTime = currTime;
	// 收集信息
	var screenWidth = Math.round(uiroot.width * uiroot.scaleX);
	var screenHeight = Math.round(uiroot.height * uiroot.scaleY);

	// 更新信息
	self.gameObject.text = 'Screen Size: (' + screenWidth + ', ' + screenHeight + ')\n'
		+ 'UIRoot Coordinate: (' + Math.round(uiroot.width * 100) / 100 + ', ' + Math.round(uiroot.height * 100 ) / 100 + ')\n'
		+ 'Reference Resolution: (' + scaleAdapter.referenceResolution.x + ', ' + scaleAdapter.referenceResolution.y + ')';
};
