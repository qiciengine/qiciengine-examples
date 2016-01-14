var DropTest = qc.defineBehaviour('qc.demo.DropTest', qc.Behaviour, function() {
}, {
    // 需要序列化的字段
});

// 检查拖拽的节点是否可以放进来
DropTest.prototype.isAllowDrop = function(node) {
    // 50%的概率可以放进来
    var r = this.game.math.random(0, 1) === 0;
    console.log(r ? 'Can Drop.' : 'Cannot Drop.');
    return r;
};

// 节点拖拽放下了
DropTest.prototype.onDragDrop = function(e) {
    console.log('***Drop Drag', e);

    // 将此节点放进来
    var node = e.dragging;
    node.parent = this.gameObject;
    node.x = this.gameObject.width * node.pivotX;
    node.y = this.gameObject.height * node.pivotY;

    // 标记下，对象放入了目标容器
    e.result = this.gameObject;
};
