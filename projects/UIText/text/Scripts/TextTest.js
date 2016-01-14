/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var TextTest = qc.defineBehaviour('qc.demo.TextTest', qc.Behaviour, function() {
}, {
});

TextTest.prototype.onClick = function() {
    // Create UIText
    var t = this.game.add.text(this.gameObject.parent);
    t.anchoredX = this.gameObject.anchoredX;
    t.anchoredY = this.gameObject.anchoredY + 50;
    t.autoSize = true;
    t.alignH = qc.UIText.LEFT;
    t.alignV = qc.UIText.MIDDLE;
    t.fontSize = 22;
    t.color = new qc.Color(0xFFCCCCCC);
    t.text = '[#ffffff]Hello.[-]Qici Engine.';
    t.lineSpacing = 5;

    // 渐变效果
    t.gradient = true;
    t.startColor = new qc.Color(0xffffffff);
    t.endColor = new qc.Color(0xFFFF00FF);

    // 描边效果
    t.stroke = new qc.Color(0xffffffff);
    t.strokeThickness = 2;

    // 阴影
    t.enableShadow = true;
    t.shadowBlur = 0.5;
    t.shadowColor = new qc.Color(0xffa0a0a0);
    t.shadowOffsetX = 1;
    t.shadowOffsetY = 1;

    // 外发光
    t.enableGlow = true;
    t.glowColor = qc.Color.red;
    t.glowBlur = 0.5;
};
