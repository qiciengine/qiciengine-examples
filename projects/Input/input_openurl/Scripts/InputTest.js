/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var InputTest = qc.defineBehaviour('qc.demo.InputTest', qc.Behaviour, function() {
    // 直接使用浏览器事件，防止弹出窗口被浏览器拦截
    this.game.input.nativeMode = false;
}, {
});

InputTest.prototype.onClick = function() {
    window.open('http://www.qiciengine.com')
};
