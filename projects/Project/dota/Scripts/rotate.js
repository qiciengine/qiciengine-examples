// 旋转 90°
var RotateAdapter = qc.defineBehaviour('qc.dota.RotateAdapter', qc.Behaviour, function() {
    this.runInEditor = true;
}, { });

RotateAdapter.prototype.awake = function() {
    var self = this;
    this.addListener(self.game.device.onOrientationChange, function() {
        if (self.game.device.orientation === qc.Device.LANDSCAPE)
            self.enable = false;
        else
            self.enable = true;
    }, self);
};

RotateAdapter.prototype.onEnable = function() {
    var self = this;
    var gameOb = self.gameObject;
    var scaleAdapter = gameOb.getScript('qc.ScaleAdapter');

    if (scaleAdapter) {
        // 重载 scaleAdapter 的 getTargetSize 方法
        self._rawGetTargetSizeFunc = scaleAdapter.getTargetSize;
        scaleAdapter.getTargetSize = function() {
            var currTarget = this.target || this.gameObject.game.world;
            if (!currTarget || !currTarget.width || !currTarget.height)
                return new qc.Point(0, 0);
            return new qc.Point(currTarget.height, currTarget.width);
        };
    }

    // hack updateWorldTransform
    self._rawUpdateTransformFunc = self.gameObject.phaser.updateTransform;
    self.gameObject.phaser.updateTransform = function() {
        // 是否更新 sin cos 信息
        if (this.rotation !== this.rotationCache) {
            this.rotationCache=this.rotation;
            this._sr=Math.sin(this.rotation);
            this._cr=Math.cos(this.rotation);
        }

        var pt = this.parent.worldTransform;
        var wt = this.worldTransform;

        // temporary matrix variables
        var a, b, c, d, tx, ty;

        // check to see if the rotation is the same as the previous render. This means we only need to use sin and cos when rotation actually changes
        if (this.rotation !== this.rotationCache)
        {
            this.rotationCache = this.rotation;
            this._sr = Math.sin(this.rotation);
            this._cr = Math.cos(this.rotation);
        }

        // get the matrix values of the displayobject based on its transform properties..
        a  =  -this._sr * this.scale.x;
        b  =  this._cr * this.scale.x;
        c  =  -this._cr * this.scale.y;
        d  = -this._sr * this.scale.y;
        tx =  -this.position.y + gameOb.game.world.width;
        ty =  this.position.x;

        // check for pivot.. not often used so geared towards that fact!
        if (this.pivot.x || this.pivot.y)
        {
            tx -= this.pivot.x * a + this.pivot.y * c;
            ty -= this.pivot.x * b + this.pivot.y * d;
        }

        // concat the parent matrix with the objects transform.
        wt.a  = a  * pt.a + b  * pt.c;
        wt.b  = a  * pt.b + b  * pt.d;
        wt.c  = c  * pt.a + d  * pt.c;
        wt.d  = c  * pt.b + d  * pt.d;
        wt.tx = tx * pt.a + ty * pt.c + pt.tx;
        wt.ty = tx * pt.b + ty * pt.d + pt.ty;

        // multiply the alphas..
        this.worldAlpha = this.alpha * this.parent.worldAlpha;

        //  Custom callback?
        if (this.transformCallback)
        {
            this.transformCallback.call(this.transformCallbackContext, wt, pt);
        }

        if(this._cacheAsBitmap)return;

        for(var i=0,j=this.children.length; i<j; i++)
        {
            this.children[i].updateTransform();
        }
    };
};

// 还原 scaleAdapter 的 getTargetSize 方法，还原 updateTransform 方法
RotateAdapter.prototype.onDisable = function() {
    var gameOb = this.gameObject;
    var scaleAdapter = gameOb.getScript('qc.ScaleAdapter');

    if (scaleAdapter && this._rawGetTargetSizeFunc)
        scaleAdapter.getTargetSize = this._rawGetTargetSizeFunc;

    if (this._rawUpdateTransformFunc)
    this.gameObject.phaser.updateTransform = this._rawUpdateTransformFunc;
};
