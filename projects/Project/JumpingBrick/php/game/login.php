<?php
/**
 * 微信登录的处理
 */
header('Access-Control-Allow-Origin:*');
require_once('include/SnsNetwork.php');
require_once('include/log.php');
require_once('config.php');

 // 修改登陆后的处理部分
require_once('db.php');

// 登录成功后的游戏逻辑处理，有的话请自行补充
function after_login($openid, $userInfo) {
    // TODO：业务逻辑自行补充
    // 获取数据库连接
    $mysqli = DB::getDB();

    if ($mysqli->connect_error) {
        die(json_encode(array(
            "error" => "数据库连接失败"
        )));
    }

    $insert_update = "insert into user_info (open_id, name, head_icon, score) values (?, ?, ?, 0) on duplicate key update name = VALUES(name), head_icon = VALUES(head_icon)";
    $stmt = $mysqli->prepare($insert_update);
    if (!$stmt) {
        die(json_encode(array(
            "error" => "数据库连接失败"
        )));
    }

    $stmt->bind_param("sss", $v_open_id, $v_name, $v_head_icon);

    $v_open_id = $open_id;
    $v_name = $user_info["nickname"];
    $v_head_icon = $user_info["headimgurl"];

    $stmt->execute();
    if ($stmt->errno) {
        die(json_encode(array(
            "error" => "注册用户失败，错误代码：".$stmt->errno
        )));
    }
    $stmt->close();
}

// 以下处理code换取token的逻辑
$code = $_REQUEST['code'];
if (!$code) {
    echo json_encode(array(
        "error" => "请指定code"
    ));
    die();
}

$appid = APPID;
$secret = APP_SECRET;
if ($_REQUEST['web']) {
    $appid = APPID_PC;
    $secret = APP_SECRET_PC;
}
$params = "appid=$appid&secret=$secret&code=$code&grant_type=authorization_code";
$line = SnsNetwork::makeRequest('https://api.weixin.qq.com/sns/oauth2/access_token', $params, '', 'get', 'https');
if (!$line['result']) {
    // 访问失败了
    echo json_encode(array(
        "error" => "访问失败"
    ));
    die();
}

$token = json_decode($line['msg'], true);
if ($token['errmsg']) {
    // 换取code失败
    echo json_encode(array(
        "error" => $token['errmsg']
    ));
    die();
}

// 成功获取到了，记录到session中
session_start();
$token['expires'] = time() + $token['expires_in'] - 15 * 60;
$_SESSION['access_token'] = $token;

// 拉取用户信息
$access_token = $token['access_token'];
$openid = $token['openid'];
$params = "access_token=$access_token&openid=$openid&lang=zh_CN";
$line = SnsNetwork::makeRequest('https://api.weixin.qq.com/sns/userinfo', $params, '', 'get', 'https');

echo json_encode(array(
    "openid" => $token['openid'],
    "unionid" => $token['unionid'],
    "userinfo" => json_decode($line['msg'], true)
));

// 调用具体的业务逻辑处理， 传入用户参数
after_login($token['openid'], json_decode($line['msg'], true));
?>