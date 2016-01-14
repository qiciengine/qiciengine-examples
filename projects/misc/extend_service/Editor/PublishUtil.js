var beforePublish = function() {
    console.log('************beforePublish');
    
    qc.servicePipe.sendData('receiveData', { message: 'Welcome!' });
};

var afterPublish = function() {
    console.log('************afterPublish');
};

var onReceiveData = function(data) {
	console.log(data);    
};

G.e.on(G.e.BEFORE_PUBLISH, beforePublish);
G.e.on(G.e.AFTER_PUBLISH, afterPublish);
qc.servicePipe.on('MyDemoMessage', onReceiveData);

