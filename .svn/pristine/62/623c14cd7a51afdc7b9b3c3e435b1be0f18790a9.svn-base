<?php
$order_id=$_REQUEST['order_id'];
$money=$_REQUEST['money'];
$data=array();
$data['i_mid']='111';
$data['s_sn']=$order_id;
$data['i_money']=$money;
$data['s_platform_sn']='';
$data['i_succee']='1';
$result=curl_post($data);
//var_dump($result);








function curl_post($acc=array()){
/**
 * 主要用于传递，获取数据
 */
$url = "http://172.16.2.10/servicephp";
//1.初始化
$ch = curl_init();
//2.设置参数
//设置请求url网址
curl_setopt($ch,CURLOPT_URL,$url);
//捕获url响应信息不输出
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
//设置请求头信息
curl_setopt($ch,CURLOPT_HEADER,0);
//设置开启POST请求
curl_setopt($ch,CURLOPT_POST,1);

//禁止SSL校检
curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,false);


//$data代表传送的数据,可以为字符串或者数组
$arr = array();
$arr['s_pid'] = "kcy";
$arr['s_session'] = isset($_SESSION['s_session'])?$_SESSION['s_session'] : '';
$arr['s_token'] = "7d76f956d07a9843bf53610ddecf294d";
//把参数传递到里面
var_dump($arr['s_session']);
foreach($acc as $key=>$v){
	$arr[$key] = $v;
}
$s = '';
	foreach($arr as $key=>$v){
		$s .= "$key=$v&";
	}
	$s = rtrim($s,"&");
	$s .="&key=sdfsdlfsfisfkcxsf97s9f7s97fs9df";
$s_sign = sha1($s);
$data = $arr;
$data['s_sign'] = $s_sign;
curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
//3.执行curl
$output = curl_exec($ch);
//判断是否有错误
if($output === false){
    echo 'error:'.curl_error($ch);
}
//4.关闭句柄
curl_close($ch);

return $output;
}
?>