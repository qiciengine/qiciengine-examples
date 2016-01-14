# 添加微信支持

## 添加插件
游戏需要使用微信登陆、和分享，所以使用引擎中提供的微信插件进行实现。  
先添加微信插件，并按插件教程搭建微信分享和登陆支持。具体步骤可参见[文档](http://docs.zuoyouxi.com/manual/Plugin/Wechat.html)。
这里直接按该插件[Demo](http://engine.zuoyouxi.com/demo/Plugin/wechat/index.html)的配置进行配置。客户端将WeChat脚本加载在UIRoot上。

## 实现登录的逻辑处理
将上一步生成的db.php放于微信登陆插件中的game目录下，修改微信登陆插件中game/login.php中的代码，获取到用户数据后保存到数据库中。修改如下：  
````php
<?php
	// ....
    // ....
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

//....
//....

// 调用具体的业务逻辑处理， 传入用户参数
after_login($token['openid'], json_decode($line['msg'], true));
?>

````