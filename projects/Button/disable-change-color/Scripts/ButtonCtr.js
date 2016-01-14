var ButtonCtr = qc.defineBehaviour('qc.demo.ButtonCtr', qc.Behaviour, function() {
}, {
});

ButtonCtr.prototype.onClick = function() {
    // Disable the button.
    this.gameObject.state = qc.UIState.DISABLED;
};
