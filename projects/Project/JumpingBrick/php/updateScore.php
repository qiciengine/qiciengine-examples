<?php
header('Access-Control-Allow-Origin:*');
require_once("db.php");

// 从请求中获取参数
$rid = $_REQUEST["rid"];
$token = $_REQUEST["token"];
$score = $_REQUEST["score"];

if (!isset($rid) || !isset($score)) {
	die(json_encode(array(
        "error" => "参数有误"
    )));
}
// 这里可以使用token进行验证，是否允许调用存储数据库
// 这里不做实现

// 提交分数
$mysqli = DB::getDB();
$update_sql = "update user_info set score = ?, update_time = ? where open_id = ? and score < ?";
$stmt = $mysqli->prepare($update_sql);
if (!$stmt) {
	die(json_encode(array(
        "error" => "数据库连接失败"
    )));
}

$stmt->bind_param("ddsd", $v_score, time(), $v_open_id, $v_score);

$v_open_id = $rid;
$v_score = $score;

$stmt->execute();
if ($stmt->errno) {
	die(json_encode(array(
        "error" => "更新分数失败，错误代码：".$stmt->errno
    )));
}
$stmt->close();
die(json_encode(array(
	"success" => "更新成功"
)));
?>