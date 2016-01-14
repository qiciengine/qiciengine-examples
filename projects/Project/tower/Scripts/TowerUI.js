/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 塔防示例游戏，总的界面和逻辑控制
 */
var TowerUI = qc.defineBehaviour('qc.demo.TowerUI', qc.Behaviour, function() {
    var self = this;

    // 地图为7 * 12
    self.COLS = 12;
    self.ROWS = 7;

    // 格子的大小为：
    self.SIZE = 80;

    // 总共有几条命?
    self.life = 30;

    // 我有多少金钱
    self.money = 5000;

    // 当前我有多少个萝卜
    self._bonus = 0;

    // 地图数据
    self.map = null;

    // 所有的炮塔
    self.towers = {};

    // 当前第几波怪物
    self.currRound = 0;

    // 当前的怪物列表
    self.monsters = [];

    // 当前是否处于暂停状态
    self.isPause = false;

    // 开始/暂停游戏按钮
    self.startBtn = null;

    // 怪物预制
    self.monsterPrefab = null;

    // 建造的预制
    self.buildPrefab = null;

    // 提示箭头
    self.arrow = null;

    // 萝卜的数量
    self.bonusLabel = null;

    // 第几波怪物
    self.roundTen = null;
    self.roundOne = null;

    // 显示生命
    self.lifeLabel = null;

    // 重点
    self.endFlag = null;

    // 记录全局变量，方便调用
    self.game.log.trace('初始化塔防游戏。');
    window.towerUI = self;
}, {
    // 需要序列化的字段
    map: qc.Serializer.NODE,
    life: qc.Serializer.NUMBER,
    startBtn: qc.Serializer.NODE,
    monsterPrefab: qc.Serializer.PREFAB,
    arrow: qc.Serializer.NODE,
    buildPrefab: qc.Serializer.PREFAB,
    bonusLabel: qc.Serializer.NODE,
    roundTen: qc.Serializer.NODE,
    roundOne: qc.Serializer.NODE,
    lifeLabel: qc.Serializer.NODE,
    endFlag: qc.Serializer.NODE
});

Object.defineProperties(TowerUI.prototype, {
    /**
     * @property {number} fail - 被通过的怪物数量
     */
    fail: {
        get: function() { return this._fail || 0; },
        set: function(v) {
            this._fail = v;
            if (v <= 0) {
                // 游戏失败了
                this.game.log.trace('游戏失败了。');
            }
            this.redraw();
        }
    },

    /**
     * @property {number} bonus - 当前有多少个萝卜
     */
    bonus: {
        get: function() { return this._bonus || 0; },
        set: function(v) {
            this._bonus = v;
            this.redraw();
        }
    }
});

// 初始化处理
TowerUI.prototype.awake = function() {
    var self = this;

    // 开始按钮被点击的处理
    this.addListener(self.startBtn.onClick, function() {
        // 开始游戏，暂停的功能就不做演示了
        self.nextRound();
        self.startBtn.frame = '上底7.png';
    });
    self.redraw();
};

// 被点击的处理，建造炮塔
TowerUI.prototype.onClick = function(e) {
    var self = this;

    // 换算下点击在第几个格子
    var x = e.source.x,
        y = e.source.y;
    var point = self.gameObject.toLocal(new qc.Point(x, y));
    point.x += self.gameObject.width / 2;
    point.y += self.gameObject.height / 2;

    var col = self.game.math.floorTo(point.x / self.SIZE);
    var row = self.game.math.floorTo(point.y / self.SIZE);
    var index = row * self.COLS + col;
    self.game.log.trace('格子{0}被点击了', index);

    // 检查下这格子是不是有数据
    if (self.map.getScript('qc.demo.TowerMapData').data[index]) return;

    // 出现建造按钮
    if (self._buildBtn) {
        self._buildBtn.destroy();
        self._buildBtn = undefined;
    }
    self._buildBtn = self.game.add.clone(self.buildPrefab, self.gameObject);
    self._buildBtn.x = self.getPos(index).x;
    self._buildBtn.y = self.getPos(index).y;
    self._buildBtn.getScript('qc.demo.TowerBuild').appear(index);
};

// 开始一轮
TowerUI.prototype.nextRound = function() {
    var self = this;

    // 怪物的数量
    var count = (self.currRound++) * 2 + 40;
    self.game.log.trace('本轮产出{0}头怪物', count);

    // 生产怪物的逻辑
    var produce = function() {
        // 生成一头怪物
        self.redraw();
        self.game.log.trace('产出一头怪物');
        self.producing = true;
        var monster = self.game.add.clone(self.monsterPrefab, self.gameObject);
        monster.getScript('qc.demo.TowerMonster').appear(self.currRound);
        self.monsters.push(monster);

        if (--count <= 0) {
            self.producing = false;
            return;
        }
        self.game.timer.add(1000, produce);
    };

    // 提示怪物快要开始生成了
    var clue = function() {
        self.arrow.getScript('qc.demo.TowerArrow').play();

        // 3秒后开始生产怪物
        self.game.log.trace('2s后开始产出怪物。');
        self.game.timer.add(2500, produce);
    };

    // 准备生产
    self.game.log.trace('2s后提示本轮开始。');
    self.game.timer.add(1000, clue);
};

// 根据格子换算坐标
TowerUI.prototype.getPos = function(index) {
    var self = this;
    var x0 = -self.gameObject.width / 2,
        y0 = -self.gameObject.height / 2;
    var col = index % self.COLS,
        row = self.game.math.floorTo(index / self.COLS);

    return new qc.Point(x0 + col * self.SIZE + self.SIZE / 2,
        y0 + row * self.SIZE + self.SIZE / 2);
};

// 添加一个炮塔
TowerUI.prototype.addTower = function(index, tower) {
    this.towers[index] = tower;
    this.map.getScript('qc.demo.TowerMapData').data[index] = 2;
};

// 删除一个怪物
TowerUI.prototype.removeMonster = function(monster) {
    var index = this.monsters.indexOf(monster);
    if (index !== -1) this.monsters.splice(index, 1);
    this.game.log.trace('删除一头怪物，剩余：{0}', this.monsters.length);

    // 如果没有怪物了，进入下一波
    if (this.currRound < 15 && !this.producing && this.monsters.length === 0) {
        this.nextRound();
    }
};

// 重绘信息
TowerUI.prototype.redraw = function() {
    var self = this;
    self.bonusLabel.text = '' + self.bonus;
    self.roundTen.text = '' + self.game.math.floorTo(self.currRound / 10);
    self.roundOne.text = '' + (self.currRound % 10);
    self.lifeLabel.text = '' + self.life;

    if (self.life < 10) {
        // 显示萝卜缺一角的图片
        self.endFlag.frame = '吃萝卜.png';
    }
};
