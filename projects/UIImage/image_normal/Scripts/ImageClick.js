/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var ImageClick = qc.defineBehaviour('qc.demo.ImageClick', qc.Behaviour, function() {
}, {
});

ImageClick.prototype.onClick = function() {
    alert('Image Click.');
};
