<?php
header('Access-Control-Allow-Origin:*');
// 查询排行榜
require_once("db.php");

// 从请求中获取参数
$rid = $_REQUEST["rid"];
$token = $_REQUEST["token"];
$score = $_REQUEST["score"];

// if (!isset($rid) || !isset($score)) {
// 	die(json_encode(array(
//         "error" => "参数有误"
//     )));
// }
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