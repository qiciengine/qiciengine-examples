// 脚本显示扩展
G.extend.inspector('serializeTemplate', function() {
    var self = this;
    var target = self.target;

    // 先调用默认的绘制方法
    self.defaultDraw();

    // 调用自己的绘制
    var gui = qc.editor.gui;

    // 设置布局
    // gui 的布局属于网格布局，其中  40+0.5 的意思是默认占据 40，有空闲区域的时候，
    // 本网格占据的权重是 0.5
    gui.columnWidths = [ self.indent, 20, '60 + 0.5'];

    // 分隔符
    gui.line([
        gui.divider({ }, { colspan: 3 })
    ]);

    // 绘制自定义值
    var title = gui.titleLine(G._('Position[Custom Field]'));
    title.add(gui.line([
        gui.empty(),
        gui.label('x'),
        gui.numberInput({ bind: 'xValue' })
    ]));
    title.add(gui.line([
        gui.empty(),
        gui.label('y'),
        gui.numberInput({ bind: 'yValue' })
    ]));
    title.add(gui.line([
        gui.empty(),
        gui.label('z'),
        gui.numberInput({ bind: 'zValue' })
    ]));

    // 绘制一个按钮，控制显示
    var btn;
    gui.line([
        btn = gui.button('显示texture', {}, { colspan: 3 })
    ]);

    // 按钮的响应事件
    btn.on('click', function() {
        var texture = target.textureValue;
        if (!texture) return;

        var ob = target.game.world.find('UIRoot/showImage');
        ob.visible = true;
        ob.texture = texture;
        ob.rotation = Math.random() * Math.PI;
    });

    // 分隔符
    gui.line([
        gui.divider({ }, { colspan: 3 })
    ]);
});
