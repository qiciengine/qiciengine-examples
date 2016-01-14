// 脚本显示扩展
G.extend.inspector('qc.demo.TowerMapData', function() {
    var self = this,
        target = self.target;

    // 先调用默认的绘制方法
    self.defaultDraw();

    // 初始化
    var gui = qc.editor.gui, btn;
    gui.line([
        gui.empty(),
        btn = gui.button('初始化', { colspan: 2 })
    ]);
    btn.on('click', function() {
        var o = target.gameObject;
        var i = 0;
        o.children.forEach(function(ob) {
            ob.find('UIText').text = '' + (i++);
            ob.name = '0';
        });
    });

    // 显示或隐藏
    var btn2;
    gui.line([
        gui.empty(),
        btn2 = gui.button('显示/隐藏', { colspan: 2 })
    ]);
    btn2.on('click', function() {
        var o = target.gameObject;
        o.children.forEach(function(ob) {
            ob.visible = !ob.visible;
        });
    });
});
