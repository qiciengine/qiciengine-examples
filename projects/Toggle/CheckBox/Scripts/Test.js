var Test = qc.defineBehaviour('qc.engine.Test', qc.Behaviour, function() {
}, {
    checkBox: qc.Serializer.NODE
});

Test.prototype.awake = function() {
    if (!this.checkBox) return;
    var c = this.checkBox.getScript('qc.CheckBox');
    c.toggles.forEach(function(toggle) {
        toggle.on = false;
    });
    
    this.addListener(c.onValueChange, function(v) {
        var content = '';
        v.forEach(function(toggle) {
            content += toggle.name + ';';      
        });
        this.gameObject.text = 'Result:  ' + content;
    }, this);
};
