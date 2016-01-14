/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var ChangeSize = qc.defineBehaviour('qc.demo.ChangeSize', qc.Behaviour, function() {
    this.image1 = null;
    this.image2 = null;
    this.image3 = null;
}, {
    image1: qc.Serializer.NODE,
    image2: qc.Serializer.NODE,
    image3: qc.Serializer.NODE
});

ChangeSize.prototype.onClick = function() {
    this.image1.width = this.game.math.random(20, 200);
    this.image1.height = this.game.math.random(20, 200);

    this.image2.width = this.game.math.random(20, 200);
    this.image2.height = this.game.math.random(20, 200);

    this.image3.width = this.game.math.random(20, 200);
    this.image3.height = this.game.math.random(20, 200);
};
