/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var DestroySprite = qc.defineBehaviour('qc.demo.DestroySprite', qc.Behaviour, function() {
}, {
});

DestroySprite.prototype.onDestroy = function() {
    alert('Destroy Plane.');
};

DestroySprite.prototype.onClick = function() {
    this.gameObject.destroy();
};
