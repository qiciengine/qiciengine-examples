    var LoadingUI = qc.defineBehaviour('qc.demo.LoadingUI', qc.Behaviour, function() {
        this.clue = null;
    }, 
    {
        clue: qc.Serializer.NODE
    });

    LoadingUI.prototype.awake = function() {
        var self = this;
        this.addListener(self.game.state.onStartLoad, function(state) {
            console.log('LoadingUI onStartLoad', state);
            self.show();
        });
        this.addListener(self.game.state.onEndLoad, function(state) {      
            console.log('LoadingUI onEndLoad', state);
            if (self.gameObject.visible) { 
                self.hide();                 
            }
        });
    };

    LoadingUI.prototype.update = function() {
        var self = this,
            loaded = self.game.assets.loaded,
            total = self.game.assets.total;
        self.clue.text = 'Hardly Loading: ' + loaded + '/' + total;

        var parent = self.gameObject.parent;
        parent.setChildIndex(this.gameObject, parent.children.length - 1);
    };

    LoadingUI.prototype.show = function() {
        
        this.gameObject.alpha = 1;
        this.gameObject.visible = true;
    };

    LoadingUI.prototype.hide = function() {
        var self = this, tweenAlpha = self.gameObject.getScript('qc.TweenAlpha');
        self.gameObject.alpha = 1;
        tweenAlpha.from = 1;
        tweenAlpha.to = 0;
        tweenAlpha.stop();
        tweenAlpha.resetToBeginning();         
        tweenAlpha.onFinished.addOnce(function() {            
            self.gameObject.visible = false;
        });
        tweenAlpha.playForward();
    };


