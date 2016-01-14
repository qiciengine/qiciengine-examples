/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 初始化入口
 */
var Init = qc.defineBehaviour('qc.demo.Init', qc.Behaviour, function() {

}, {
    // 需要序列化的字段
});

// 初始化处理
Init.prototype.awake = function() {
    // 加载图片字体
    this.game.assets.load('defaultFont', 'Assets/font/desyrel.bin');

    // 存放游戏的全局变量
    if (!this.game.G) this.game.G = {};
}
