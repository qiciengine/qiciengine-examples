/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var AddSprite = qc.defineBehaviour('qc.demo.AddSprite', qc.Behaviour, function() {
}, {
});

AddSprite.prototype.awake = function() {
    var self = this;
    self.game.assets.load('hall', 'Assets/texture/bbg_cave_hall.bin', function(asset) {
        // 创建精灵对象
        var sprite = self.game.add.sprite();
        sprite.texture = asset;
        sprite.resetNativeSize();
    });
};
