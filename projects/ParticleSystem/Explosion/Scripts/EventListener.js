// define a user behaviour
var EventListener = qc.defineBehaviour('qc.engine.EventListener', qc.Behaviour, function() {
    // need this behaviour be scheduled in editor
    //this.runInEditor = true;
    
    this.onLastFrame = new qc.Signal();
}, {
    // fields need to be serialized
});

// 动画末帧事件
EventListener.prototype.lastFrameEvent = function() {
    if (this.onLastFrame)
        this.onLastFrame.dispatch();
};
