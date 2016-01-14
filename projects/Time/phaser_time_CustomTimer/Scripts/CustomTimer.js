/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var CustomTimer = qc.defineBehaviour('qc.demo.CustomTimer', qc.Behaviour, function() {
    this.total = 0;
    this.removeBtn = null;
}, {
    removeBtn: qc.Serializer.NODE
});

CustomTimer.prototype.awake = function() {
    var self = this;
    
    // Create a timer.
    var timer = self.timer = self.game.timer.loop(2000, self.updateCounter, self);

    // Remove timer
    this.addListener(self.removeBtn.onClick, function() {
        self.game.timer.remove(timer);
        delete self.timer;
    });
};

CustomTimer.prototype.updateCounter = function() {
    this.total++;
    this.gameObject.text = 'Loop Count: ' + this.total;
};
