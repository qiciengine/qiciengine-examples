var CheckBox = qc.defineBehaviour('qc.CheckBox', qc.Behaviour, function() {
    var self = this;
    self._toggles = [];
    self.runInEditor = true;
    
    /**
     * @property {qc.Signal} onValueChange
     */
    self.onValueChange = new qc.Signal();
}, {
    toggles: qc.Serializer.NODES
});

CheckBox.__menu = 'UI/CheckBox';

Object.defineProperties(CheckBox.prototype, {
    /**
     * @property {Array} value
     */ 
    value: {
        get: function() {
            var list = [];
            this._toggles.forEach(function(toggle) {
                if (toggle && toggle.on) {
                    list.push(toggle);
                }
            });
            return list;
        }
    },
    
    /**
     * @property {Array} toggles
     */
    toggles: {
        get: function() {
            return this._toggles;
        },
        set: function(v) {
            var self = this;
            self._toggles.forEach(function(toggle) {
                if (toggle) toggle.onValueChange.remove(self._onValueChange, self);
            });
            self._toggles = v || [];
            self._toggles.forEach(function(toggle) {
                if (toggle) toggle.onValueChange.add(self._onValueChange, self);
            });
        }
    }
});

/**
 * Add a toggle to CheckBox
 */ 
CheckBox.prototype.add = function(toggle) {
    if (this._toggles.indexOf(toggle) !== -1) return;
    
    this._toggles.push(toggle);
    toggle.onValueChange.add(this._onValueChange, this);
};

/**
 * Remove a toggle from CheckBox
 */
CheckBox.prototype.remove = function(toggle) {
    var index = this._toggles.indexOf(toggle);
    if (index === -1) return;
    
    this._toggles.splice(index, 1);
    toggle.onValueChange.remove(this._onValueChange, this);
};

CheckBox.prototype._onValueChange = function(toggle) {
    this.onValueChange.dispatch(this.value);  
};