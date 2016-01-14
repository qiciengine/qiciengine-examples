/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 天空跟着滚动
 */
var ScrollSky = qc.defineBehaviour('qc.demo.ScrollSky', qc.Behaviour, function() {
    // 参考的树对象
    this.tree = null;

    // 对象滚动1像素时，远景滚动的距离
    this.distance = 0.05;
}, {
    // 需要序列化的字段
    tree: qc.Serializer.NODE,
    distance: qc.Serializer.NUMBER
});

// 帧调度
ScrollSky.prototype.update = function() {
    var targetDistance = Math.abs(this.tree.anchoredY);
    this.gameObject.anchoredY = -targetDistance * this.distance - 960;
}
