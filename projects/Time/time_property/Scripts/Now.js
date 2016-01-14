/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var Now = qc.defineBehaviour('qc.demo.Now', qc.Behaviour, function() {
}, {
});

Now.prototype.update = function() {
    this.gameObject.text = 'Now: ' + this.game.time.now;
};
