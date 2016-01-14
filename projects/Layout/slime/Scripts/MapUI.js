/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

/**
 * 主地图界面
 */
var MapUI = qc.defineBehaviour('qc.demo.MapUI', qc.Behaviour, function() {
    var self = this;

    // 天赋按钮和商店按钮
    self.talentBtn = null;
    self.storeBtn = null;

    // 登记本界面
    window.mapUI = self;
}, {
    // 需要序列化的字段
    talentBtn: qc.Serializer.NODE,
    storeBtn: qc.Serializer.NODE
});

// 界面初始化处理
MapUI.prototype.awake = function() {
    var self = this;

    // 天赋按钮被点击，显示天赋界面
    this.addListener(self.talentBtn.onClick, function() {
        window.talentUI.show();
        self.hide();
    });

    // 商店按钮被点击，显示商店界面
    this.addListener(self.storeBtn.onClick, function() {
        window.storeUI.show();
        //self.hide();
    });
}

// 显示本界面
MapUI.prototype.show = function() {
    this.gameObject.visible = true;
}

// 隐藏本界面
MapUI.prototype.hide = function() {
    this.gameObject.visible = false;
}
