/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 天赋树的逻辑处理
 */
var Tree = qc.defineBehaviour('qc.demo.Tree', qc.Behaviour, function() {
}, {
});

// 初始化处理
Tree.prototype.awake = function() {
    // 初始时滚动到最下方
    this.gameObject.setNormalizedPosition(1, 1);
}
