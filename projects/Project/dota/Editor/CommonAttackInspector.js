// 脚本显示扩展
G.extend.inspector('qc.demo.CommonAttack', function() {
    var self = this,
        target = self.target;

    // 先调用默认的绘制方法
    self.defaultDraw();

    // 调用自己的绘制
    var gui = qc.editor.gui, btn;
    gui.line([
        gui.empty(),
        btn = gui.button('播放', { colspan: 2 })
    ]);
    btn.on('click', function() {
        // 攻击的目标对象
        var m = target.sprite.getScript('qc.demo.Fighter').defensers[0];

        // 播放
        target.play([m], 6);
    });
});
