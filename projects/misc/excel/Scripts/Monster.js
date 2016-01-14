/**
 * Monster
 * @constructor
 */
var Monster = qc.defineBehaviour('qc.demo.Monster', qc.Behaviour, function() {
}, {
    monsterName: qc.Serializer.STRING,
    icon: qc.Serializer.STRING,
    hp: qc.Serializer.INT,
    duration: qc.Serializer.NUMBER,
    minDamage: qc.Serializer.NUMBER,
    maxDamage: qc.Serializer.NUMBER,
    idleAni: qc.Serializer.STRING
});

Monster.prototype.set = function(data) {
    this.monsterName = data.name;
    this.icon = data.icon;
    this.hp = data.hp;
    this.duration = data.duration;
    this.idleAni = data.idleAni;

    // minDamage&maxDamage
    var arr = data.damage.split('..');
    this.minDamage = arr[0] * 1;
    this.maxDamage = arr[1] * 2;
};

Monster.prototype.toString = function() {
    return 'Name=' + this.monsterName + '; icon=' + this.icon +
            '; hp=' + this.hp + '; duration=' + this.duration +
            '; idleAni=' + this.idleAni + '; minDamage=' + this.minDamage +
            '; maxDamage=' + this.maxDamage + '\n';
};
