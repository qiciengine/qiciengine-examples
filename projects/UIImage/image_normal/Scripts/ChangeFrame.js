/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var ChangeFrame = qc.defineBehaviour('qc.demo.ChangeFrame', qc.Behaviour, function() {
    this.image = null;
}, {
    image: qc.Serializer.NODE
});

ChangeFrame.prototype.onClick = function() {
    if (this.image.frame === 'icon.png')
        this.image.frame = 'icon_slime.png';
    else
        this.image.frame = 'icon.png';
    this.image.resetNativeSize();
};
