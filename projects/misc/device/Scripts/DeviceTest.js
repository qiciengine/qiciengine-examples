/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var DeviceTest = qc.defineBehaviour('qc.demo.DeviceTest', qc.Behaviour, function() {
    this.runInEditor = true;
}, {
});

DeviceTest.prototype.awake = function() {
    var content = '', device = this.game.device;

    content += 'desktop=' + device.desktop;
    content += ' \niOS=' + device.iOS;
    content += ' \nandroid=' + device.android;
    content += ' \nwebGL=' + device.webGL;
    content += ' \nvibration=' + device.vibration;
    content += ' \nbrowser=' + device.browser;
    content += ' \nresolution=' + device.resolution;
    content += ' \nfullscreen=' + device.fullscreen;
    content += ' \neditor=' + device.editor;
    content += ' \norientation=' + device.orientation;
    this.gameObject.text = content;
};
