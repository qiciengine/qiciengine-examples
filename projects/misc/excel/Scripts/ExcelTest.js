var ExcelTest = qc.defineBehaviour('qc.demo.ExcelTest', qc.Behaviour, function() {
    this.data = null;
    this.monsterData = null;
}, {
    data: qc.Serializer.NODE,
    monsterData: qc.Serializer.NODE
});

ExcelTest.prototype.awake = function() {
    var self = this;
    self.game.assets.load('config', 'Assets/excel/config.bin', function(data) {
        console.log('Excel file downloaded.', data);
        self.read();
    });
};

// 读取演示
ExcelTest.prototype.read = function() {
    // 获取下载的内容
    var data = this.game.assets.find('config');

    console.log('sheets列表', data.sheetsName);

    // key为sheets名称，value为数据表(类型qc.ExcelSheet)
    console.log('所有的数据', data.sheets);

    // 读取monsters表
    this.readMonsters(data.findSheet('Monsters'));

    // read sheet:misc
    this.readMisc(data.findSheet('misc'));
};

ExcelTest.prototype.readMonsters = function(monsters) {
    var self = this;
    console.log('columns', monsters.columns);

    var content = '';
    monsters.rows.forEach(function(row) {
        var o = self.game.add.node(self.gameObject.find('monsters'));
        var monster = o.addScript('qc.demo.Monster');
        monster.set(row);
        monster.name = row.name;

        content += monster.toString();
    });
    this.monsterData.text = content;
};

ExcelTest.prototype.readMisc = function(datas) {
    var content = '';
    datas.rows.forEach(function(row) {
        console.log(row);
        content += 'Date:' + row.value;
        content += '\nnumber:' + row.number;
        content += '\nstring:' + row.string;
    });
    this.data.text = content;
};
