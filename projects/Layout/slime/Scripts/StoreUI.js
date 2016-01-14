/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 商店界面
 */
var StoreUI = qc.defineBehaviour('qc.demo.StoreUI', qc.Behaviour, function() {
    var self = this;

    // 返回界面
    self.backBtn = null;

    // 登记本界面
    window.storeUI = self;
}, {
    // 需要序列化的字段
    backBtn: qc.Serializer.NODE
});

// 界面初始化处理
StoreUI.prototype.awake = function() {
    var self = this;

    // 返回按钮的处理：返回地图界面
    this.addListener(self.backBtn.onClick, function() {
        self.hide();
        window.mapUI.show();
    });
}

// 显示本界面
StoreUI.prototype.show = function() {
    this.gameObject.visible = true;
}

// 隐藏本界面
StoreUI.prototype.hide = function() {
    this.gameObject.visible = false;
}
