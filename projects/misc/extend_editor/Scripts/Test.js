var Test = qc.defineBehaviour('qc.demo.Test', qc.Behaviour, function() {
}, {
	birthday: qc.Serializer.STRING
});

// 指定显示的菜单位置
Test.__menu = 'Demo/Test';
