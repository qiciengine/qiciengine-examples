/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 贱贱的提示语
 */
var ClueText = qc.defineBehaviour('qc.demo.ClueText', qc.Behaviour, function() {
    // 提示语内容
    this.clues = [
        '生不下啦',
        '空间不够\n啦！！！',
        '挤死我了',
        '不要再生\n啦！！！',
        '人口不够\n造房子！'
    ];
}, {
    // 需要序列化的字段
});

// 初始化处理
ClueText.prototype.awake = function() {
    this.redraw();
};

// 界面重绘，延迟显示出来
ClueText.prototype.redraw = function() {
    var self = this;
    self.game.timer.add(self.game.math.random(1000, 10000), function() {
        var index = self.game.math.random(0, self.clues.length - 1);
        self.gameObject.visible = true;
        self.gameObject.find('UIText').text = self.clues[index];

        // 设置位置
        var rect = self.gameObject.parent.rect;
        self.gameObject.x = self.game.math.random(80, rect.width - 80);
        self.gameObject.y = self.game.math.random(60, rect.height - 100);

        // 延迟3s关闭
        self.game.timer.add(3000, function() {
            self.redraw();
        });
    });

    self.gameObject.visible = false;
};
