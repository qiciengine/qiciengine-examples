/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var InputEvent = qc.defineBehaviour('qc.demo.InputEvent', qc.Behaviour, function() {
}, {
});

InputEvent.prototype.awake = function() {
    var self = this,
        input = self.gameObject;

    this.addListener(input.onValueChange, function() {
        console.log('Value changed.');
    });

    this.addListener(input.onStateChange, function() {
        console.log('State changed.');
    });

    self.timer = self.game.timer.loop(3000, function() {
        if (input.state === qc.UIState.NORMAL) input.state = qc.UIState.DISABLE;
        else input.state = qc.UIState.NORMAL;
    });
};

InputEvent.prototype.onDestroy = function() {
    this.game.timer.remove(this.timer);
};
