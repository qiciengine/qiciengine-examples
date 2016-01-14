var UI = qc.defineBehaviour('qc.demo.UI', qc.Behaviour, function() {
}, {
    player: qc.Serializer.NODE
});

UI.prototype.update = function() {
    // follow the player
    var w = this.gameObject.parent.width;
    var x = w/2 - this.player.x;
    if (x < w - this.gameObject.width) {
        x = w - this.gameObject.width;
    }
    else if (x > 0) {
        x = 0;
    }
    this.gameObject.x = x;
};
