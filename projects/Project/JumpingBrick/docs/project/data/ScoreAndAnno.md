# 分数上传及排行榜查询

## 实现分数上传
创建一个名为updateScore.php的页面，用来处理分数上传功能。
代码如下：
````php
<?php
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
````

## 获取排行榜信息
创建一个名为getRank.php的页面，用来获取排行榜信息。
代码如下：
````php
<?php

// 查询排行榜
require_once("db.php");

// 从请求中获取参数
$rid = $_REQUEST["rid"];
$token = $_REQUEST["token"];

if (!isset($rid) || !isset($score)) {
	die(json_encode(array(
        "error" => "参数有误"
    )));
}
// 这里可以使用token进行验证，是否允许调用存储数据库
// 这里不做实现

// 查询排行榜
$mysqli = DB::getDB();
$top = array();
$user = array();

// 获取前100的用户数据
$sql = "SELECT open_id as rid, name, score, head_icon FROM user_info where score > 0 ORDER BY score desc, update_time asc limit 100";
$result = $mysqli->query($sql);
if ($result) {
	while ($obj = $result->fetch_object()) {
		array_push($top, $obj);
	}
	$result->close();
}

$sql = "SELECT open_id, name, score, head_icon FROM user_info where open_id = '$rid'";
$result = $mysqli->query($sql);
if ($result) {
	$user = $result->fetch_object();
	$result->close();
}

$ret = array(
	'rankTop' => $top,
	'userData' => $user,
);
echo json_encode($ret);
?>
````