/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var AddSprite = qc.defineBehaviour('qc.demo.AddSprite', qc.Behaviour, function() {
    this.spriteList = [];
}, {
});

AddSprite.prototype.awake = function() {
    var self = this;
    self.game.assets.load('hall', 'Assets/texture/bbg_cave_hall.bin', function(asset) {
        // 创建精灵对象
        var i = 500;
        while(i--)
        {
        var sprite = self.game.add.sprite(self.gameObject);
        sprite.texture = asset;
        sprite.width = 10;
        sprite.height = 10;
        sprite.x = Math.random(1) * self.game.world.width;
        sprite.y = Math.random(1) * self.game.world.height;
        self.spriteList.push(sprite);
        }
    });
};


AddSprite.prototype.update = function() {
    
    
    for (var i = 0; i < this.spriteList.length; i++)
        {
            this.spriteList[i].rotation += 0.1;
        }
};
