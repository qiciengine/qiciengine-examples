/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var Layout = qc.defineBehaviour('qc.demo.Layout', qc.Behaviour, function() {
    this.addBtn = null;
    this.resizeBtn = null;
    this.itemPrefab = null;
}, {
    addBtn: qc.Serializer.NODE,
    resizeBtn: qc.Serializer.NODE,
    itemPrefab: qc.Serializer.PREFAB
});

Layout.prototype.awake = function() {
    this.addListener(this.addBtn.onClick, this.addItem, this);
    this.addListener(this.resizeBtn.onClick, this.resizeItem, this);
};

Layout.prototype.addItem = function() {
    var item = this.game.add.clone(this.itemPrefab, this.gameObject);
};

Layout.prototype.resizeItem = function() {
    var index = this.game.math.random(0, this.gameObject.children.length - 1);
    var item = this.gameObject.getChildAt(index);
    item.height = item.width = this.game.math.random(50, 200);

    // relayout
    this.getScript('qc.HorizontalLayout').rebuildTable();
    console.log('Nothing happened!');
};
