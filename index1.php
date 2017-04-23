<?php
/*
 * 程序首页
 */
session_start();
include_once "./function/sql.php";
include_once "./function/fc.php";
    ss_login();
    $str="weixin.wfyizhan.com"
    $state = $_GET['state'];
    $state = base64_decode($state);
    if (strpos($state, $str)) {
    	$url = "location:".$state;
    	header($url);
    }    
?>

