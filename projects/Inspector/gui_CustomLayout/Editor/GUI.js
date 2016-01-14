// extend editor's inspector
G.extend.inspector('qc.engine.GUI', function() {
    // do user defined draw
    var gui = qc.editor.gui;
    gui.columnWidths = [120, 0.1];
    
    gui.line([
        gui.text('StringInput'),
        gui.stringInput()
    ]);
    
    gui.line([
        gui.text('IntInput'),
        gui.intInput()
    ]);
    
    gui.line([
        gui.text('NumberInput'),
        gui.numberInput()
    ]);
    
    gui.line([
        gui.text('AngleInput'),
        gui.angleInput({bind: 'angle'})
    ]);
    
    gui.line([
        gui.text('SliderInput'),
        gui.sliderInput()
    ]);
    
    var self = this;
    gui.line([
        gui.text('Node'),
		gui.objectInput({objectType: 'node', target: self.target, targetField: 'node', bind: 'node'})
    ]);
    
    gui.line([
        gui.text('CheckBox'),
        gui.checkBox()
    ]);
    
    gui.line([
        gui.text('DropDownList'),
        gui.dropDownList({ 
            // items指定列表项
            items: ['1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995'],
            // value指定默认值
            value: '1988'
        })
    ]);
    
    gui.line([
        gui.text('MultiDropDownList'),
        gui.multiDropDownList({ 
            items: [
                { label: 'C', value: 0 }, 
                { label: 'C++', value: 1 },
                { label: 'Java', value: 2 },
                { label: 'JavaScript', value: 3}
            ],
            value: [1, 2]
        })
    ]);
    
    gui.line([
        gui.text('ColorPicker') ,
        gui.colorPicker()
    ]);
    
    gui.line([
        gui.label('Align'),
        gui.buttonGroup([
            {
                text: 'Left',
                value: 'Left'
            },
            {
                text: 'Center',
                value: 'Center'
            },
            {
                text: 'Right',
                value: 'Right'
            }
        ])
    ]);
    
    gui.line([
       gui.divider(null, { colspan: 2 }) 
    ]);
    
    gui.line([
       gui.empty(),
       gui.button('Button')
    ]);
    
    gui.line([
       gui.label('TextArea', { icon: 'http://bbs.zuoyouxi.com/static/image/common/online_admin.gif'} ),
       gui.textArea()
    ], 100);
});
