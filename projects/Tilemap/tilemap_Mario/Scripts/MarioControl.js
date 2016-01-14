/**
 * Created by qcplay on 9/10/15.
 */

var MarioControl = qc.defineBehaviour('qc.mario.MarioControl', qc.Behaviour, function() {
    var self = this;
    // mario node
    self.mario = null;

    self.map = null;

    /**
     * 马里奥的状态
     * @type {number}
     */
    self.state = MarioControl.MINI;

    /**
     * 马里奥的移动速度
     * @type {number}
     */
    self.velocity = 0;

    /**
     * 当前的加速度
     * @type {number}
     */
    self.acceleration = 0;

    /**
     * 普通模式下加速度设定
     * @type {number}
     */
    self.normalAcceleration = 256;

    /**
     * 加速模式下加速度设定
     * @type {number}
     */
    self.highAcceleration = 512;

    /**
     * 转向的加速度
     * @type {number}
     */
    self.stopAcceleration = 512;

    /**
     * 跳跃时转向的加速度
     * @type {number}
     */
    self.jumpStopAcceleration = 1024;

    /**
     * 普通模式下的限速
     * @type {number}
     */
    self.normalVelocity = 96;

    /**
     * 加速模式下的限速
     * @type {number}
     */
    self.highVelocity = 160;

    /**
     * 跳跃加速度
     * @type {number}
     */
    self.jumpAcceleration = 1024;

    /**
     * 跳跃时的最大速度
     * @type {number}
     */
    self.jumpVelocity = -256;

    /**
     * 跳跃的最小速度保持时间
     * @type {number}
     */
    self.minJumpTime = 0.1;
    /**
     * 跳跃的最大速度保持时间
     * @type {number}
     */
    self.maxJumpTime = 0.2;

    /**
     * 跳跃速度
     * @type {number}
     */
    self.yVelocity = 0;

    /**
     * 起跳时间
     * @type {number}
     */
    self.jumpTime = 0;

    // 配置操作按键
    self.leftKey = qc.Keyboard.A;

    self.rightKey = qc.Keyboard.D;

    self.upKey = qc.Keyboard.W;

    self.downKey = qc.Keyboard.S;

    self.aKey = qc.Keyboard.K;

    self.bKey = qc.Keyboard.J;

    self.taKey = qc.Keyboard.I;

    self.tbKey = qc.Keyboard.U;

    self.resetKey = qc.Keyboard.R;

    self.transfiguration = qc.Keyboard.T;

    self.upNode = null;
    self.downNode = null;
    self.leftNode = null;
    self.rightNode = null;

    self.tfNode = null;
    self.tjNode = null;
    self.fNode = null;
    self.jNode = null;

    self.resetNode = null;
    self.transNode = null;

    self.upBtn = false;
    self.downBtn = false;
    self.leftBtn = false;
    self.rightBtn = false;
    self.tfireBtn = false;
    self.tjumpBtn = false;
    self.fireBtn = false;
    self.jumpBtn = false;

    /**
     * 最后响应的键值
     * @type {number}
     * @private
     */
    self._lastKey = 0;

    // 监控键盘状态
    this.addListener(this.game.input.onKeyDown, self.processKeyDown, self);
    this.addListener(this.game.input.onKeyUp, self.processKeyUp, self);
}, {
    mario : qc.Serializer.NODE,
    map :  qc.Serializer.NODE,
    upNode : qc.Serializer.NODE,
    downNode : qc.Serializer.NODE,
    leftNode : qc.Serializer.NODE,
    rightNode : qc.Serializer.NODE,
    tfNode : qc.Serializer.NODE,
    tjNode : qc.Serializer.NODE,
    fNode : qc.Serializer.NODE,
    jNode : qc.Serializer.NODE,
    resetNode : qc.Serializer.NODE,
    transNode : qc.Serializer.NODE
});


MarioControl.prototype.awake = function () {
    // 绑定模拟按键事件
    var self = this;
    if (self.upNode) {
        this.addListener(self.upNode.onDown, function() {
            self.upBtn = true;
        });
        this.addListener(self.upNode.onUp, function() {
            self.upBtn = false;
        });
    }
    if (self.downNode) {
        this.addListener(self.downNode.onDown, function() {
            self.downBtn = true;
        });
        this.addListener(self.downNode.onUp, function() {
            self.downBtn = false;
        });
    }
    if (self.leftNode) {
        this.addListener(self.leftNode.onDown, function() {
            self.leftBtn = true;
            self._lastKey = self.leftKey
        });
        this.addListener(self.leftNode.onUp, function() {
            self.leftBtn = false;
            if (self.leftKey === self._lastKey) {
                self._lastKey = 0;
            }
        });
    }
    if (self.rightNode) {
        this.addListener(self.rightNode.onDown, function() {
            self.rightBtn = true;
            self._lastKey = self.rightKey
        });
        this.addListener(self.rightNode.onUp, function() {
            self.rightBtn = false;
            if (self.rightKey === self._lastKey) {
                self._lastKey = 0;
            }
        });
    }
    if (self.tfNode) {
        this.addListener(self.tfNode.onDown, function() {
            self.tfireBtn = true;
        });
        this.addListener(self.tfNode.onUp, function() {
            self.tfireBtn = false;
        });
    }
    if (self.tjNode) {
        this.addListener(self.tjNode.onDown, function() {
            self.tjumpBtn = true;
        });
        this.addListener(self.tjNode.onUp, function() {
            self.tjumpBtn = false;
        });
    }
    if (self.fNode) {
        this.addListener(self.fNode.onDown, function() {
            self.fireBtn = true;
        });
        this.addListener(self.fNode.onUp, function() {
            self.fireBtn = true;
        });
    }
    if (self.jNode) {
        this.addListener(self.jNode.onDown, function() {
            self.jumpBtn = true;
        });
        this.addListener(self.jNode.onUp, function() {
            self.jumpBtn = false;
        });
    }
    if (self.resetNode) {
        this.addListener(self.resetNode.onDown, function() {
            self.reset();
        })
    }
    if (self.transNode) {
        this.addListener(self.transNode.onDown, function() {
            self.state = 1 - self.state;
        })
    }
};

MarioControl.prototype.update = function() {
    var self = this;
    if (self.map && self.mario && !self.collide) {
        self.collide = new qc.mario.CollideControl(self.game, self.mario, self.map);
    }
    var deltaTime = self.game.time.deltaTime;
    var currTime = self.game.time.fixedTime - deltaTime;
    while (deltaTime > 0) {
        var delta = Math.min(100, deltaTime);
        currTime += delta;
        deltaTime -= delta;
        if (self.mario.die) {
            self._stepDie(currTime * 0.001, delta * 0.001);
        }
        else {
            self._stepRun(currTime * 0.001, delta * 0.001);
        }

    }
};

/**
 * 调整屏幕位置，让马里奥尽量居中
 * @private
 */
MarioControl.prototype._adjustScreen = function() {
    var self = this,
        mario = self.mario,
        map = self.map;
    // 控制马里奥尽量在屏幕中间，
    var mapWidth = map.tileWidth * map.mapWidth;
    var gameWidth = self.game.width / self.gameObject.getWorldScale().x;
    var marioX = mario.x;
    var scrollX = gameWidth / 2 - marioX;
    scrollX = self.game.math.clamp(scrollX, gameWidth - mapWidth, map.scrollX);
    map.scrollX = scrollX;
};

/**
 * 根据当前状态，播放动画
 */
MarioControl.prototype._animationControl = function(currTime) {
    var self = this,
        mario = self.mario,
        isMini = self.state === MarioControl.MINI,
        highMode = self.game.input.isKeyDown(self.bKey) || self.game.input.isKeyDown(self.tbKey) || self.fireBtn || self.tfireBtn;;
    if (mario.die) {
        mario.playAnimation(isMini ? 'mini_role_die' : 'role_die', 1, true);
        mario.resetNativeSize();
    }
    else if (self.jumpTime > 0) {
        // 跳跃状态下只处理跳跃动作
        var jumpAnimation = isMini ? 'mini_role_jump' : 'role_jump';
        if (mario.phaser.animations.currentAnim.name !== jumpAnimation) {
            mario.playAnimation(jumpAnimation, 1, false);
            mario.resetNativeSize();
            mario.phaser.animations.currentAnim.delay =  20;
        }
    }
    else if (self.acceleration !== 0 || self.velocity !== 0) {
        // 有速度或者加速度的情况下播放跑动动画
        if (self.acceleration * self.velocity < 0) {
            // 转向中
            mario.playAnimation(isMini ? 'mini_role_turn' : 'role_turn', 1, true);
            mario.scaleX = self.velocity < 0 ? -1 : 1;
            mario.phaser.animations.currentAnim.delay =  (highMode ? 50 : 100);
        }
        else {
            // 正常移动
            mario.playAnimation(isMini ? 'mini_role_run' : 'role_run', 1, true);
            mario.scaleX = self.velocity > 0 ? 1 : -1;
            mario.phaser.animations.currentAnim.delay =  (highMode ? 50 : 100);
        }
    }
    else {
        // 播放待机动作
        mario.playAnimation(isMini ? 'mini_role_idle' : 'role_idle', 1, true);
        mario.resetNativeSize();
        mario.phaser.animations.currentAnim.delay = (highMode ? 50 : 100);
    }
};

/**
 * 处理死亡逻辑
 * @param currTime
 * @param deltaTime
 * @private
 */
MarioControl.prototype._stepDie = function(currTime, deltaTime) {
    var self = this,
        mario = self.mario;

    var lastV = self.yVelocity + self.jumpAcceleration * deltaTime;
    lastV = self.game.math.clamp(lastV, self.jumpVelocity, -self.jumpVelocity);
    var t = (lastV - self.yVelocity) / self.jumpAcceleration;
    var offY = t * self.yVelocity + t * t * self.jumpAcceleration * 0.5 + lastV * (deltaTime - t);
    self.yVelocity = lastV;
    mario.y += offY;
    if (mario.y > 300) {
        self.reset();
    }
};

/**
 * 计算无阻挡的情况下X轴移动距离
 * @param currTime
 * @param deltaTime
 * @param limitVelocity
 * @returns {number}
 * @private
 */
MarioControl.prototype._calcXAxisDistance = function (currTime, deltaTime, limitVelocity){
    var self = this;
    var distance = 0;
    // 计算x轴位移，并控制动画
    if (self.acceleration !== 0 || self.velocity !== 0) {
        var turnAcceleration = self.jumpTime ? self.jumpStopAcceleration : self.stopAcceleration;
        if (self.acceleration === 0) {
            // 停止加速
            var acc = self.velocity > 0 ? -turnAcceleration : turnAcceleration;
            var endV = 0;
        }
        else if (Math.abs(self.velocity) > limitVelocity) {
            // 高速状态到普通状态切换
            var acc = self.velocity > 0 ? -turnAcceleration : turnAcceleration;
            var endV = self.velocity > 0 ? limitVelocity : -limitVelocity;
        }
        else {
            var acc = self.acceleration;
            var endV = self.acceleration > 0 ? limitVelocity : -limitVelocity;
        }
        var lastV = self.velocity + acc * deltaTime;
        lastV = self.game.math.clamp(lastV, Math.min(endV, self.velocity), Math.max(endV, self.velocity))
        var t = (lastV - self.velocity) / acc;
        distance = self.velocity * t + acc * t * t * 0.5 + lastV * (deltaTime - t);
        self.velocity = lastV;
    }
    return distance;
};

/**
 * 计算无阻挡情况下Y轴移动距离
 * @param currTime
 * @param deltaTime
 * @param limitJumpTime
 * @private
 */
MarioControl.prototype._calcYAxisDistance = function (currTime, deltaTime, limitJumpTime) {
    var self = this;
    var distance = 0;
    // 计算y轴位移
    if (self.jumpTime) {
        var time = Math.min(deltaTime, currTime - self.jumpTime);
        var keepTime = Math.min(time, Math.max(0, self.jumpTime + limitJumpTime - currTime - deltaTime));
        var accTime = time - keepTime;
        if (keepTime > 0) {
            self.yVelocity = self.jumpVelocity;
        }
    }
    else  {
        // 默认向下掉落
        var keepTime = 0;
        var accTime = deltaTime;
    }
    var lastV = self.yVelocity + self.jumpAcceleration * accTime;
    lastV = self.game.math.clamp(lastV, self.jumpVelocity, -self.jumpVelocity);
    var t = (lastV - self.yVelocity) / self.jumpAcceleration;
    distance = keepTime * self.jumpVelocity + t * self.yVelocity + t * t * self.jumpAcceleration * 0.5 + lastV * (accTime - t);
    self.yVelocity = lastV;
    return distance;
};

/**
 * 移动计算
 * @param currTime
 * @param deltaTime
 * @private
 */
MarioControl.prototype._stepRun = function(currTime, deltaTime) {
    var self = this,
        mario = self.mario,
        isMini = self.state === MarioControl.MINI;
    var highMode = self.game.input.isKeyDown(self.bKey) || self.game.input.isKeyDown(self.tbKey) || self.fireBtn || self.tfireBtn;
    var limitVelocity = highMode ? self.highVelocity : self.normalVelocity;

    // 更新加速度
    self.acceleration = 0;
    if (self._lastKey === self.leftKey || (self._lastKey === 0 && self.game.input.isKeyDown(self.leftKey)) || self.leftBtn) {
        self.acceleration = highMode ? -self.highAcceleration : -self.normalAcceleration;
    }
    else if (self._lastKey === self.rightKey || (self._lastKey === 0 && self.game.input.isKeyDown(self.rightKey)) || self.rightBtn) {
        self.acceleration = highMode ? self.highAcceleration : self.normalAcceleration;
    }

    // 计算跳跃
    if (self.game.input.isKeyDown(self.aKey) || self.jumpBtn) {
        if (self.canJump(isMini) && !self.aKeyEffect) {
            self.aKeyEffect = true;
            self.jumpTime = currTime;
        }
        var limitJumpTime = self.maxJumpTime;
    }
    else if(self.game.input.isKeyDown(self.taKey) || self.tjumpBtn) {
        if (self.canJump(isMini)) {
            self.jumpTime = currTime;
        }
        var limitJumpTime = self.minJumpTime;
    }
    else {
        self.aKeyEffect = false;
        var limitJumpTime = self.minJumpTime;
    }

    // 无阻挡时的偏移
    var offset = {
        x: self._calcXAxisDistance(currTime, deltaTime, limitVelocity),
        y: self._calcYAxisDistance(currTime, deltaTime, limitJumpTime),
        die: false
    };

    // 碰撞检测
    var ret;
    var count = 0;
    while (ret = self.collide.testCollide(offset, isMini)) {
        // 防止死循环计数
        count++;
        switch (ret) {
            case qc.mario.CollideControl.CLEAR_JUMP:
                self.jumpTime = 0;
                self.yVelocity = 0;
                break;
            case qc.mario.CollideControl.CLEAR_Y_V:
                (self.yVelocity < 0) && (self.yVelocity = 0);
                self.jumpTime = 1;
                break;
        }
        if (offset.die || (offset.x === 0 && offset.y === 0) || count > 5)
            break;
    }
    if (offset.die) {
        // 处理死亡
        mario.die = true;
        self.yVelocity = self.jumpVelocity;
    }
    else {
        mario.x += offset.x;
        mario.y += offset.y;
    }
    // 播放动画
    self._animationControl(currTime);
    // 调整显示位置
    self._adjustScreen();
};

/**
 * 重置
 */
MarioControl.prototype.reset = function() {
    var self = this,
        mario = self.mario,
        map = self.map;
    mario.x = 32;
    mario.y = 224;
    mario.die = false;
    map.scrollX = 0;
    map.scrollY = 0;
};

// 处理按键按下
MarioControl.prototype.processKeyDown = function(keyCode) {
    var self = this,
        mario = self.mario,
        isMini = self.state === MarioControl.MINI;
    if (keyCode === self.leftKey) {
        self._lastKey = keyCode;
    }
    else if (keyCode === self.rightKey) {
        self._lastKey = keyCode;
    }
    else if (keyCode === self.resetKey) {
        self.reset();
    }
    else if (keyCode === self.transfiguration) {
        self.state = 1 - self.state;
    }
};

// 处理按键弹起
MarioControl.prototype.processKeyUp = function(keyCode) {
    var self = this,
        mario = self.mario;
    if (keyCode === self._lastKey) {
        self._lastKey = 0;
    }
};

// 是否能跳跃的计算
MarioControl.prototype.canJump = function() {
    // 不在跳跃中，并无法向下移动时可以跳跃
    return !this.jumpTime && this.collide.canJump();
};

MarioControl.MINI = 0;
MarioControl.BIG = 1;