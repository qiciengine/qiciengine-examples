// define a user behaviour
var RichTextHandle = qc.defineBehaviour('qc.engine.RichTextHandle', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
}, {
    // fields need to be serialized
});

RichTextHandle.prototype.onMyClick = function(msg) {
	alert(msg);
};
