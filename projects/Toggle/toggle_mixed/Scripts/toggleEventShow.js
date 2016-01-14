var toggleEventShow = qc.defineBehaviour('qc.toggleEventShow', qc.Behaviour, function() {

});

toggleEventShow.prototype.awake = function() {
    var ob = this.gameObject;
    var game = ob.game;
    var self = this;

    self._text = game.world.find('UIRoot/showEvent');
    self._single = game.world.find('UIRoot/singleToggle');
    self._group = game.world.find('UIRoot/toggleGroup').getScript('qc.ToggleGroup');

    self._eventList = [];

    var addToEvents = function(msg) { 
        self._eventList.push(msg); 

        if (self._eventList.length > 5) 
            self._eventList = self._eventList.slice(-5);

        self._text.text = 'Event:\n' + self._eventList.join('\n'); 
    };

    this.addListener(self._single.onValueChange, function() {
        addToEvents('singleToggle has been clicked, current ' + (self._single.on ? 'on' : 'off'));
    });

    this.addListener(self._group.onValueChange, function(group, v, on) {
        addToEvents('toggleGroup has been clicked, ' +
            self._group.toggles.indexOf(v) + ' is ' + 
        	(on ? 'on' : 'off'));
    });


};
