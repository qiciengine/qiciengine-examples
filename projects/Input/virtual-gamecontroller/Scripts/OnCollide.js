/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */
var OnCollide = qc.defineBehaviour('qc.demo.OnCollide', qc.Behaviour, function() {
}, {
});

OnCollide.prototype.onCollide = function(o1, o2) {
    if (this.gameObject.lastAnimationName === 'jump')
        this.gameObject.playAnimation('idle');
};
