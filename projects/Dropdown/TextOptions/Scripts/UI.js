var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
	this.index = 0;
}, {
    dropdown1: qc.Serializer.NODE,
    dropdown2: qc.Serializer.NODE,
    text: qc.Serializer.NODE,
    clearBtn: qc.Serializer.NODE
});

UI.prototype.awake = function() {
    var self = this;
    self.addListener(self.dropdown1.onValueChange, function(v) {
        self.text.text = 'Select: ' + self.dropdown1.options[v];
    });
    self.addListener(self.dropdown2.onValueChange, function(v) {
        self.text.text = 'Select: ' + self.dropdown2.options[v];
    });
    
    self.addListener(self.clearBtn.onClick, function() {
        self.dropdown1.clearOptions();
        self.dropdown2.clearOptions();
    });
};

UI.prototype.onClick = function() {
	// Add 2 options
    this.dropdown1.addOptions([ 'New ' + this.index, 'New ' + (this.index + 1)]);
    this.dropdown2.addOptions([ 'New ' + this.index, 'New ' + (this.index + 1)]);
    this.index += 2;
};