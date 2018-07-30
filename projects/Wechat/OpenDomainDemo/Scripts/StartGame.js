/**
 * @author chenx, 2018.7.28
 * 游戏启动入口
 */

// 初始化逻辑
qc.initGame = function(game) {
    game.log.trace('Start the subDomain logic.');

    if (!window.__wx)
        return;

    var sharedCanvas = wx.getSharedCanvas();
    wx.onMessage(function(data) {
        var msg = data.msg;
        var para = data.para;
        if (msg === 'update') {
            var context = sharedCanvas.getContext('2d');
            context.drawImage(canvas, para.x, para.y, para.width, para.height, 0, 0, sharedCanvas.width, sharedCanvas.height)
        }
    });
};
