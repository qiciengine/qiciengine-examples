/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var RotateItem = qc.defineBehaviour('qc.demo.RotateItem', qc.Behaviour, function() {
}, {
});

RotateItem.prototype.onClick = function() {
    if (this.gameObject.rotation !== 0) this.gameObject.rotation = 0;
    else this.gameObject.rotation = Math.PI / 3;

    // relayout
    this.gameObject.parent.getScript('qc.HorizontalLayout').rebuildTable();
};
