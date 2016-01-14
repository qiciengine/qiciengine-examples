var ButtonCtr = qc.defineBehaviour('qc.demo.ButtonCtr', qc.Behaviour, function() {
}, {
});

ButtonCtr.prototype.onDown = function() {
    var ts = this.getScript(qc.TweenScale);
    ts.stop();
    ts.resetToBeginning();
    ts.playForward();
};

ButtonCtr.prototype.onUp = function() {
    var ts = this.getScript(qc.TweenScale);
    ts.stop();
    ts.resetToBeginning(true);
    ts.playReverse();
};
