# 数据库创建及连接

## 创建数据库
这里选用MySQL作为存储用的数据。需要一张用户表，用来存储玩家的ID，名称，头像，历史最高分信息。
使用如下脚本创建一个数据库。
````sql
/**
 * 创建数据库
 */
CREATE DATABASE `JumpingBrick` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

/**
 * 创建用户分数表
 */
CREATE TABLE `user_info` (
  `open_id` varchar(64) COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `head_icon` varchar(512) COLLATE utf8_bin DEFAULT NULL,
  `score` int(11) DEFAULT '0',
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`open_id`),
  KEY `score_time` (`score`,`update_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

````

## php连接脚本
这里使用php实现一个简易的服务器端，对数据库进行操作，记录、查询数据库数据。将数据库配置单独为一个php。
例如：db.php。  

````php
<?php
/**
 * MySQL数据库配置
 */
class DB {
	private static $sqlConfig = array (
		"host"=>"127.0.0.1",
		"port"=>3306,
		"user"=>"root",
		"password"=>"root",
		"database"=>"JumpingBrick"
	);

	public static function getDB() {
		return new mysqli(
			DB::$sqlConfig["host"], 
			DB::$sqlConfig["user"], 
			DB::$sqlConfig["password"], 
			DB::$sqlConfig["database"], 
			DB::$sqlConfig["port"]);
	}
}
?>
````