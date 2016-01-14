var BtnCtr = qc.defineBehaviour('qc.demo.BtnCtr', qc.Behaviour, function() {
}, {
	direction: qc.Serializer.STRING,
	player: qc.Serializer.NODE,
    ground: qc.Serializer.NODE,
    bulletPrefab: qc.Serializer.PREFAB
});

BtnCtr.prototype.onDown = function() {
	var self = this;
    var rigidbody = this.player.getScript('qc.arcade.RigidBody');
    switch (this.direction) {
    case 'left':
    	rigidbody.velocity.x = -200;
    	if (rigidbody.velocity.y === 0)
    		this.player.playAnimation('walk');
    	this.player.scaleX = -1;
    	break;	

    case 'right':	
    	rigidbody.velocity.x = 200;
    	if (rigidbody.velocity.y === 0)
    		this.player.playAnimation('walk');
    	this.player.scaleX = 1;
    	break;

    case 'down':
    	if (rigidbody.velocity.x === 0 && rigidbody.velocity.y === 0)
    		this.player.playAnimation('duck');
    	break;	

    case 'leftdown':	
        rigidbody.velocity.x = -100;
        if (rigidbody.velocity.y === 0)
            this.player.playAnimation('duckwalk');
    	this.player.scaleX = -1;
    	break;	

    case 'rightdown':	
        rigidbody.velocity.x = 100;
        if (rigidbody.velocity.y === 0)
            this.player.playAnimation('duckwalk');
           this.player.scaleX = 1;
    	break;	

    case 'fire':
    	this._timer = this.game.timer.loop(1000, function() {
    		self.fire();
    	});	
    	self.fire();
    	this.player.playAnimation('attack');
    	break;

    case 'jump':
    	rigidbody.velocity.y = -400;
    	this.player.playAnimation('jump');
    	break;	
    }
};

BtnCtr.prototype.onUp = function() {
	var rigidbody = this.player.getScript('qc.arcade.RigidBody');
    switch (this.direction) {
    case 'fire':
    	// stop fire
    	this.player.playAnimation('idle');
    	this.game.timer.remove(this._timer);
    	break;	

    case 'jump': break;	

    default:
    	rigidbody.velocity.x = 0;
    	this.player.playAnimation('idle');
    	break;	
    }
};

BtnCtr.prototype.fire = function() {
	var bullet = this.game.add.clone(this.bulletPrefab, this.player.parent);
    bullet.y = this.player.y;
    bullet.x = this.player.scaleX === -1 ? this.player.x - 100 : this.player.x + 100;
    var rigidbody = bullet.getScript('qc.arcade.RigidBody');
    rigidbody.velocity.x = this.player.scaleX === -1 ? -600: 600;
    rigidbody.addCollide(this.ground);
    
    this.game.timer.add(3000, function() {
        bullet.destroy();
    });
};