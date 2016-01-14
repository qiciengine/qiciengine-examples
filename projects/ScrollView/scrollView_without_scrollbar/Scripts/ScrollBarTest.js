/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var ScrollBarTest = qc.defineBehaviour('qc.demo.ScrollBarTest', qc.Behaviour, function() {
    this.label = null;
    this.posbtn = null;
    this.horizontalBtn = null;
}, {
    label: qc.Serializer.NODE,
    posbtn: qc.Serializer.NODE,
    horizontalBtn: qc.Serializer.NODE
});

ScrollBarTest.prototype.awake = function() {
    var self = this;
    this.addListener(self.gameObject.onValueChange, function(v) {
        console.log('Value Change.', v);
        self.label.text = 'ScrollPos:' + self.gameObject.verticalNormalizedPosition.toFixed(2);
    });

    this.addListener(self.posbtn.onClick, function() {
        self.gameObject.verticalNormalizedPosition = Math.random();
    });

    this.addListener(self.horizontalBtn.onClick, function() {
        if (!self.horizontalBtn.canHorizontal)
        {
            self.gameObject.canHorizontal = true;
        	self.horizontalBtn.text.text = 'Stop Horizontal';
            self.horizontalBtn.canHorizontal = true;
        }
        else
        {
        	self.gameObject.canHorizontal = false;
        	self.horizontalBtn.text.text = 'Horizontal Scroll';
            self.horizontalBtn.canHorizontal = false;
        }  
    });
};
