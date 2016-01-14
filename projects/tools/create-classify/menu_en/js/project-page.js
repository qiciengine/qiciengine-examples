/**
 * @author liyk
 * @copyright 2015 Qcplay All Rights Reserved.
 */

// 描述popover http://getbootstrap.com/javascript/#popovers
$('#descPop').popover();

// 分辨率按钮
var lblResolution = $('#resolution')[0];

// 游戏窗口
var gameZone = $('#gameZone')[0];

var footerZone = $('#footerZone')[0];

// 圆形拖拽区域
var dragger = $('#dragger')[0];

// 处理拖拽
var isTouchable = document ? "ontouchend" in document : false,
    lastClientPoint = null,
    lastWidth = null,
    lastHeight = null;

function getTouch(e) {
    var touch = e.touches[0];
    return touch ? touch : e.changedTouches[0];
}

function getClientPoint(event) {
    if (isTouchable) {
        event = getTouch(event);
    }
    return {
        x: event.clientX,
        y: event.clientY
    };
}

function handleDown(event) {
    event.preventDefault();
    lastClientPoint = getClientPoint(event);
    lastWidth = gameWidth;
    lastHeight = gameHeight;
    var masks = document.querySelectorAll('.mask');
    for (var i = 0; i < masks.length; i++) {
        masks[i].style.display = 'block';
    }
}

function handleMove(event) {
    if (event.target === dragger) {
        dragger.style.background = 'rgba(128,128,128,0.8)';
    } else {
        dragger.style.background = 'rgba(128,128,128,0.5)';
    }
    if (lastClientPoint) {
        var clientPoint = getClientPoint(event),
            dx = clientPoint.x - lastClientPoint.x,
            dy = clientPoint.y - lastClientPoint.y;

        gameWidth = lastWidth + Math.round(dx);
        gameHeight = lastHeight + Math.round(dy);

        lblResolution.innerHTML = gameWidth + ' * ' + gameHeight;
        adjustGameSize();
    }
}

function handleUp(event) {
    lastClientPoint = null;
    dragger.style.background = 'rgba(128,128,128,0.5)';
    var masks = document.querySelectorAll('.mask');
    for (var i = 0; i < masks.length; i++) {
        masks[i].style.display = 'none';
    }
}

function getWindowInfo() {
    var win = window;
    var docEl = win.document.documentElement,
        target = (docEl && (docEl.scrollLeft || docEl.scrollTop)) ? docEl : win.document.body;
    return {
        target: target,
        left: target.scrollLeft,
        top: target.scrollTop,
        width: win.innerWidth || target.clientWidth,
        height: win.innerHeight || target.clientHeight
    };
}

var adjustGameSize = function() {
    gameZone.style.width = gameWidth + 'px';
    gameZone.style.height = gameHeight + 'px';

    var rect = gameZone.getBoundingClientRect();
    var windowInfo = getWindowInfo();
    footerZone.style.top = rect.top + windowInfo.top + gameHeight + 10 + 'px';
};

dragger.addEventListener('mousedown', handleDown, false);
dragger.addEventListener('touchstart', handleDown, false);

window.addEventListener('mousemove', handleMove, false);
window.addEventListener('touchmove', handleMove, false);

window.addEventListener('mouseup', handleUp, false);
window.addEventListener('touchend', handleUp, false);

adjustGameSize();