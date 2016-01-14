/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var FocusChange = qc.defineBehaviour('qc.demo.FocusChange', qc.Behaviour, function() {
    this.inputs = [];
}, {
    inputs: qc.Serializer.NODES
});

FocusChange.prototype.awake = function() {
    // Important!
    this.game.input.keyboard.addKeyCapture(qc.Keyboard.TAB);

    // When Tab Pressed, switch focus.
    this.addListener(this.game.input.onKeyDown, this.onTabPress, this);
};

FocusChange.prototype.onTabPress = function(keyCode) {
    if (keyCode === qc.Keyboard.TAB) {
        var index = this.currIndex;
        if (index === undefined) {
            index = 0;
        }
        else {
            this.inputs[index].isFocused = false;
            index++;
            if (index >= this.inputs.length) index = 0;
        }

        console.log('focus', index);
        this.currIndex = index;
        this.inputs[index].isFocused = true;
    }
};
