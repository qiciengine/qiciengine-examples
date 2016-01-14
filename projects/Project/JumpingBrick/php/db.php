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