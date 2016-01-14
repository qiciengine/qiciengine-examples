/**
 * @author lijh
 * copyright 2015 Qcplay All Rights Reserved.
 */

var TestAdvert = qc.defineBehaviour('qc.engine.TestAdvert', qc.Behaviour, function() {
}, {
    showBannerBtn: qc.Serializer.NODE,
    hideBannerBtn: qc.Serializer.NODE,
    showPopupBtn: qc.Serializer.NODE,
    hidePopupBtn: qc.Serializer.NODE
});

TestAdvert.prototype.onEnable = function() {
    var self = this;

    var bannerAd = self.getScript('qc.Plugins.BannerAd');
    var popupAd = self.getScript('qc.Plugins.PopupAd');

    self.addListener(popupAd.onAccessAd, function() {
        alert('Access Advert');
    });

    self.addListener(self.showBannerBtn.onClick, function() {
        bannerAd.display();
    });

    self.addListener(self.hideBannerBtn.onClick, function() {
        bannerAd.hide();
    });

    self.addListener(self.showPopupBtn.onClick, function() {
        popupAd.display();
    });

    self.addListener(self.hidePopupBtn.onClick, function() {
        popupAd.hide();
    });
};
