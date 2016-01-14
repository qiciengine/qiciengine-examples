/**
 * @author wudm
 * copyright 2015 Qcplay All Rights Reserved.
 */

// 测试跟 GS 的连接请求
var baseUri = 'http://192.168.0.31:8900/test/';
function list() {
    $.getJSON(baseUri + 'list', function(data) {
        console.log('list', data);
        dataModel.clear();
        data.users.forEach(function(name) {
            createData(name);
        });
    });
}

function query(name) {
    $.getJSON(baseUri + 'query/' + name, function(data) {
        console.log('query', data);
        panel.content = '<p>Name: ' + name + '</p><p>score: ' + data.value + '</p><p>msg: ' + data.msg + '</p>';
    });
}

function add(name, score, callback) {
    $.getJSON(baseUri + 'add?name=' + name + '&score=' + score, callback);
}

function del(name, callback) {
    $.post(baseUri + 'delete', {name : name}, callback);
}
