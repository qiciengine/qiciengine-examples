// 脚本显示扩展
G.extend.inspector('qc.demo.TowerArrow', function() {
    var self = this,
        target = self.target;

    // 先调用默认的绘制方法
    self.defaultDraw();

    // 初始化
    var gui = qc.editor.gui, btn;
    gui.line([
        gui.empty(),
        btn = gui.button('播放动画', { colspan: 2 })
    ]);
    btn.on('click', function() {
        target.play();
    });
});
