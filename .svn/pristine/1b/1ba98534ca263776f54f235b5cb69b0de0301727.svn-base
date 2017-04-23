<?php

/**
 * @param $tic 1,代表金融服务，2代表直播
 * 主要用于统计金融服务和直播的浏览量
 */
error_reporting(E_ALL & ~E_NOTICE);
include_once '../../function/sql.php';

function sjsj($tic){
	$url = "/11/index.php?act=bktj&tic=$tic&time=".time();
	$ajax =<<<TABLE
	<script>
	var url = '$url';
   var xhr = new XMLHttpRequest();
    xhr.open("get",url);
    xhr.send(null);
	</script>
TABLE;
echo $ajax;
}




function curl_post($acc=array()){
/**
 * 主要用于传递，获取数据
 */
	// $url = "http://www.wfyizhan.com/servicephp";
	$url="http://172.16.2.10/servicephp";
	// $url = "http://175.155.13.147:1480/kcy/servicephp";
//$url = "http://www.wfyizhan.com/servicephp";
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
$arr['s_session'] = isset($_SESSION['s_session'] )? $_SESSION['s_session'] : '';
$arr['s_token'] = "7d76f956d07a9843bf53610ddecf294d";
//把参数传递到里面
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

/*
 * 对城市的数据进行匹配
 */
function pp_cs($arr){
	$arr2['i_mid'] = "82";
	$data2 = curl_post($arr2);
	$data2 = json_decode($data2, true);
	$data2 = json_decode($data2['aas_result'], true);
	$mm = array();
	if(isset($arr['positions'])){
		$mm['positions'] = $arr['positions'];
	}else{
		$mm['positions'] = array();
	}

	$mm['address'] = '';
	foreach($data2 as $key=>$v){
		if($arr['province'] == $v['id']){
			$mm['address'] .= $v['name'];
		}
		if($arr['city'] == $v['id']){
			$mm['address'] .= $v['name'];
		}
	}
	return $mm;
}
function getProvince(){
	$arr2['i_mid'] = "82";
	$data2 = curl_post($arr2);
	$data2 = json_decode($data2, true);
	$data2 = json_decode($data2['aas_result'], true);
	$province=array(array());
	$province[0]['id']='0';
	$province[0]['name']='不限';
	foreach ($data2 as $key => $value) {		
		if($value['level']=='1'){			
			$province[$key+1]['id']=$value['id'];			
			$province[$key+1]['name']=$value['name'];
		}
	}
	return $province;	
}

function getCity($num){	
	$city=array(array());
	$city[0]['id']='0';
	$city[0]['name']='不限';
	if ($num=='0') {
		return $city;
	}
	$arr2['i_mid'] = "82";
	$data2 = curl_post($arr2);
	$data2 = json_decode($data2, true);
	$data2 = json_decode($data2['aas_result'], true);
	foreach ($data2 as $key => $value) {
		if ($value['upid']==$num) {
			$city[$key+1]['id']=$value['id'];
			$city[$key+1]['name']=$value['name'];
		}
	}
	return $city;
}
function _getCity($num){	
	$city='';
	$arr2['i_mid'] = "82";
	$data2 = curl_post($arr2);
	$data2 = json_decode($data2, true);
	$data2 = json_decode($data2['aas_result'], true);
	foreach ($data2 as $key => $value) {
		if ($value['id']==$num) {
			$city=$value['name'];
		}
	}
	return $city;
}
function tongji($i_loginNum=0,$i_regNum=0,$i_eventNum=0,$i_serviceNum=0,$i_applyNum=0,$i_newsNum=0,$i_projectNum=0,$i_liveNum=0){
	$data=array();
	$sql=new model();	
	if($i_loginNum == 1){
		if(isset($_COOKIE['i_loginNum'])){
			$sql->update('i_loginNum');
		}else{
			setcookie("i_loginNum",1,time()+12*60*60);
		}
	}
	if($i_regNum == 1){
		if(isset($_COOKIE['i_regNum'])){
			$sql->update('i_regNum');
		}else{
			setcookie("i_regNum",1,time()+12*60*60);
		}
	}
	if($i_eventNum == 1){
		if(isset($_COOKIE['i_eventNum'])){
			$sql->update('i_eventNum');
		}else{
			setcookie("i_eventNum",1,time()+12*60*60);
		}
	}
	if($i_serviceNum == 1){
		if(isset($_COOKIE['i_serviceNum'])){
			$sql->update('i_serviceNum');
		}else{
			setcookie("i_serviceNum",1,time()+12*60*60);
		}
	}
	if($i_applyNum == 1){
		if(isset($_COOKIE['i_applyNum'])){
			$sql->update('i_applyNum');
		}else{
			setcookie("i_applyNum",1,time()+12*60*60);
		}
	}
	if($i_newsNum == 1){
		if(isset($_COOKIE['i_newsNum'])){
			$sql->update('i_newsNum');
		}else{
			setcookie("i_newsNum",1,time()+12*60*60);
		}
	}
	if($i_projectNum == 1){
		if(isset($_COOKIE['i_projectNum'])){
			$sql->update('i_projectNum');
		}else{
			setcookie("i_projectNum",1,time()+12*60*60);
		}
	}
	if($i_liveNum == 1){
		if(isset($_COOKIE['i_liveNum'])){
			$sql->update('i_liveNum');
		}else{
			setcookie("i_liveNum",1,time()+12*60*60);
		}
	}	
}
?>