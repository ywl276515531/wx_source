<?php

define("ENCRY","peanut");//定义加密字符串
error_reporting(E_ALL & ~E_NOTICE);
/**
 * @param $arr加密变量
 * @return string返回加密变量
 * 定义加密方法
 */
function encryption($arr){
	ksort($arr);
	$str = "";
	$sign = ENCRY;
	foreach($arr as $key=>$v){
		$str .= "&".$key."=".$v;
	}
	$sign .=$str;
	$sign = md5($sign);
	$str .="&sign=".$sign;
	return $str;
}

function uncryption($arr,$sign){
	ksort($arr);
	$str = ENCRY;
	foreach($arr as $key=>$v){
		$str .= "&".$key."=".$v;
	}
	$str = md5($str);
	if($str == $sign){
		return true;
	}else{
		return false;
	}
}

/***************删除空格*****************/

function trimall($str)
{
	$qian="&nbsp;";$hou="";
	return str_replace($qian,$hou,$str);
}

/**
 * @param $i_loginNum  每日登陆次数
 * @param $i_regNum  每日用户注册量
 * @param $i_eventNum 活动交流每日访问量
 * @param $i_serviceNum 服务超市每日访问量
 * @param $i_applyNum 行政服务每日访问量
 * @param $i_newsNum  综合信息每日访问量
 * @param $i_projectNum 金融服务每日访问量
 * @param $i_liveNum  直播版块每日访问量
 * 这个方法主要用于统计每天的访问量,把他保存在statistics.txt文件里面
 */

// function tongji($i_loginNum=0,$i_regNum=0,$i_eventNum=0,$i_serviceNum=0,$i_applyNum=0,$i_newsNum=0,$i_projectNum=0,$i_liveNum=0){
// 	if($i_loginNum == 1){
// 		if($_COOKIE['i_loginNum'] == 1){
// 			return true;
// 		}else{
// 			setcookie("i_loginNum",1,time()+12*60*60);
// 		}
// 	}
// 	if($i_regNum == 1){
// 		if($_COOKIE['i_regNum'] == 1){
// 			return true;
// 		}else{
// 			setcookie("i_regNum",1,time()+12*60*60);
// 		}
// 	}
// 	if($i_eventNum == 1){
// 		if($_COOKIE['i_eventNum'] == 1){
// 			return true;
// 		}else{
// 			setcookie("i_eventNum",1,time()+12*60*60);
// 		}
// 	}
// 	if($i_serviceNum == 1){
// 		if($_COOKIE['i_serviceNum'] == 1){
// 			return true;
// 		}else{
// 			setcookie("i_serviceNum",1,time()+12*60*60);
// 		}
// 	}
// 	if($i_applyNum == 1){
// 		if($_COOKIE['i_applyNum'] == 1){
// 			return true;
// 		}else{
// 			setcookie("i_applyNum",1,time()+12*60*60);
// 		}
// 	}
// 	if($i_newsNum == 1){
// 		if($_COOKIE['i_newsNum'] == 1){
// 			return true;
// 		}else{
// 			setcookie("i_newsNum",1,time()+12*60*60);
// 		}
// 	}
// 	if($i_projectNum == 1){
// 		if($_COOKIE['i_projectNum'] == 1){
// 			return true;
// 		}else{
// 			setcookie("i_projectNum",1,time()+12*60*60);
// 		}
// 	}
// 	if($i_liveNum == 1){
// 		if($_COOKIE['i_liveNum'] == 1){
// 			return true;
// 		}else{
// 			setcookie("i_liveNum",1,time()+12*60*60);
// 		}
// 	}
// 	$sjk = new model();
// 	$shuju = $sjk->test();
// 	if($shuju){
// 		//说明文件名字存在
// 		//判断时间是否超过一天，超过一天就要提交数据并且重置数据
// 		$data = unserialize($shuju['content']);
// 		$endTime = date("Y-m-d",time());
// 		$endTime = strtotime($endTime);//记录的结束时间
// 		$timeDifference = $endTime - $data['startTime'];//时间差
// 		if($timeDifference >= (24*60*60)){
// 			//说明超过了一天
// 			statistics($data);
// 			$sjk->scsj();
// 			tongji($i_loginNum,$i_regNum,$i_eventNum,$i_serviceNum,$i_applyNum,$i_newsNum,$i_projectNum,$i_liveNum);
// 		}else{
// 			//说明小于一天
// 			$data['i_loginNum'] = $i_loginNum + $data['i_loginNum'];
// 			$data['i_regNum'] = $i_regNum + $data['i_regNum'];
// 			$data['i_eventNum'] = $i_eventNum + $data['i_eventNum'];
// 			$data['i_serviceNum'] = $i_serviceNum + $data['i_serviceNum'];
// 			$data['i_applyNum'] = $i_applyNum + $data['i_applyNum'];
// 			$data['i_newsNum'] = $i_newsNum + $data['i_newsNum'];
// 			$data['i_projectNum'] = $i_projectNum + $data['i_projectNum'];
// 			$data['i_liveNum'] = $i_liveNum + $data['i_liveNum'];
// 			$data = serialize($data);
// 			$mysql = "insert into fwb values (1,'$data')";
// 			$sjk->llcx($mysql);
// 		}
// 	}else{
// 		//说明文件名字不存在
// 		$startTime = date("Y-m-d",time());
// 		$startTime = strtotime($startTime);//记录的开始时间
// 		$data = array("startTime"=>$startTime,"i_loginNum"=>$i_loginNum,"i_regNum"=>$i_regNum,"i_eventNum"=>$i_eventNum,
// 			"i_serviceNum"=>$i_serviceNum,"i_applyNum"=>$i_applyNum,"i_newsNum"=>$i_newsNum,"i_projectNum"=>$i_projectNum,"i_liveNum"=>$i_liveNum);
// 		$data = serialize($data);
// 		$mysql = "insert into fwb values (1,'$data')";
// 		$sjk->llcx($mysql);
// 	}
// }
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


/**
 * @param $i_loginNum  每日登陆次数
 * @param $i_regNum  每日用户注册量
 * @param $i_eventNum 活动交流每日访问量
 * @param $i_serviceNum 服务超市每日访问量
 * @param $i_applyNum 行政服务每日访问量
 * @param $i_newsNum  综合信息每日访问量
 * @param $i_projectNum 金融服务每日访问量
 * @param $i_liveNum  直播版块每日访问量
 * 这个方法主要用于提交每天的访问量
 */

function statistics($data1){
	$arr['i_mid'] = 583;
	$arr['i_loginNum'] = $data1['i_loginNum'];
	$arr['i_regNum'] = $data1['i_regNum'];
	$arr['i_eventNum'] = $data1['i_eventNum'];
	$arr['i_serviceNum'] = $data1['i_serviceNum'];
	$arr['i_applyNum'] =  $data1['i_applyNum'];
	$arr['i_newsNum'] = $data1['i_newsNum'] ;
	$arr['i_projectNum'] =  $data1['i_projectNum'];
	$arr['i_liveNum'] = $data1['i_liveNum'];
	$data = curl_post($arr);
}


/**
 * 获取租赁的封面图
 */

function get_pic($arr){
	foreach($arr as $key=>$v){
		$arr1['i_mid'] = 201;
		$arr1['i_id'] = $v['i_id'];
		$arr1['s_session'] = $_SESSION['s_session'];
		$data1 = curl_post($arr1);
		$data1 = json_decode($data1, true);
		if($data1['i_sta'] == 1){
			//说明没有错误
			$shuju = json_decode($data1['as_order'], true);
			$arr[$key]['pic'] = json_decode($shuju['s_room_pics'],true);
		}else{
			$arr[$key]['pic'] = '';
		}
	}
	return $arr;
}

/**
 * @param $arr我发布的活动
 * 主要是来判断我所发布的活动是什么状态
 */
function pd_act($arr){
	foreach($arr as $key=>$v){
		if($v['eTime'] > time()){
			//说明活动正在进行或即将开始
			$arr[$key]['is_now'] = 1;
		}else{
			$arr[$key]['is_now'] = 0;//说明活动已经结束
		}
	}
	return $arr;
}


/**
 * 当用户选择登录的时候的做法
 */
function ss_dl($name,$pasw){
	$url = "http://172.16.2.12:20160/sso/api/rest/login";
	$data['appId'] = "3b0d556d3add420596a9afdd58f1bc10";
	$data['service'] = "http://weixin.wfyizhan.com/11/grzx.php?act=zhu";
	$data['username'] = $name;
	$data['password'] = $pasw;
	$qq = postData1($url,$data);
	$qq = json_decode($qq,true);
	if($qq['code'] == "200"){
		//说明登录成功
		$sso_client_ec=$qq['data']['SSO_CLIENT_EC'];
		$postDatas =array("clientEC" => $sso_client_ec);
		$sso=postData('http://172.16.2.12:20160/sso/api/rest/decode',$postDatas);
		$_SESSION['sso_client_ec'] = $sso_client_ec;
		$sso_info = json_decode($sso, true);
		$_SESSION['appId'] = $sso_info['appId'];
		$_SESSION['keyId'] = $sso_info['keyId'];
		$_SESSION['mail'] = $sso_info['user']['mail'];
		$_SESSION['memberType'] = $sso_info['user']['memberType'];
		$_SESSION['name'] = $sso_info['user']['name'];
		$_SESSION['uid'] = $sso_info['user']['uid'];
		//$SESSION['userId'] = $sso_info['user']['userId'];
		$arr['i_mid'] = 362;
		$arr['id'] =  $_SESSION['uid'];//用户id
		$data = curl_post($arr);
		$data = json_decode($data, true);
		$s_content = json_decode($data['s_content'], true);
		$_SESSION['s_company_title'] = $s_content['s_company_title'];
		$_SESSION['s_nickname'] = $s_content['s_nickname'];//用户名
		$_SESSION['s_face_pic'] = $s_content['s_face_pic'];//用户头像
		$_SESSION['s_phone'] = $s_content['s_phone'];//用户电话
		$_SESSION['s_email'] = $s_content['s_email'];//用户邮箱
		$_SESSION['i_sex'] = $s_content['i_sex'];//用户性别
		$_SESSION['s_qq'] = $s_content['s_qq'];//用户qq
		$mmsql = new model();
		$mmsql->check_dd($name,$pasw);
		$arr['i_mid'] = 4;
		$arr['s_mobile'] = $name;
		$arr['s_password'] = $pasw;
		$data1 = curl_post($arr);
		$data1 = json_decode($data1,true);
		if($data1['i_sta'] == "1"){
			$_SESSION['s_session'] = $data1['s_session'];
		}else{
			$_SESSION['s_session'] = '';
		}
		tongji($i_loginNum=1,$i_regNum=0,$i_eventNum=0,$i_serviceNum=0,$i_applyNum=0,$i_newsNum=0,$i_projectNum=0,$i_liveNum=0);
		echo json_encode(array("stat"=>1));
	}else{
		//说明登录失败
		echo json_encode(array("stat"=>0,"err"=>$qq['msgKey']));
	}
}
/**
 * 规范一下登录注册的流程
 * $name=>用户名,$pasw=>密码,
 * 这个方法主要是帮助数据库当中存在的用户进行登录
 */
function ss_login(){
	$openid = isset($_SESSION['openid'])?$_SESSION['openid']:0;//微信的openid
	$sql = new model();
	$shuju = $sql->yz_login($openid);
	if(is_array($shuju)){
		//说明数据库里面有这个用户的数据
		$name = $shuju['username'];
		$pasw = $shuju['userpasw'];
		$url = "http://172.16.2.12:20160/sso/api/rest/login";
		$data['appId'] = "3b0d556d3add420596a9afdd58f1bc10";
		$data['service'] = "http://weixin.wfyizhan.com/11/grzx.php?act=zhu";
		$data['username'] = $name;
		$data['password'] = $pasw;
		$qq = postData1($url,$data);
		$qq = json_decode($qq,true);
		if($qq['code'] == "200"){
			//说明登录成功,反之则说明账号密码有所改变
			$sso_client_ec=$qq['data']['SSO_CLIENT_EC'];
			$postDatas =array("clientEC" => $sso_client_ec);
			$sso=postData('http://172.16.2.12:20160/sso/api/rest/decode',$postDatas);
			$_SESSION['sso_client_ec'] = $sso_client_ec;
			$sso_info = json_decode($sso, true);
			$_SESSION['appId'] = $sso_info['appId'];
			$_SESSION['keyId'] = $sso_info['keyId'];
			$_SESSION['mail'] = $sso_info['user']['mail'];
			$_SESSION['memberType'] = $sso_info['user']['memberType'];
			$_SESSION['name'] = $sso_info['user']['name'];
			$_SESSION['uid'] = $sso_info['user']['uid'];	
			//$_SESSION['userId'] = isset($sso_info['user']['userId']) ? $sso_info['user']['userId']:" ";
			$arr['i_mid'] = 362;
			$arr['id'] =  $_SESSION['uid'];//用户id
			$data = curl_post($arr);
			$data = json_decode($data, true);
			$s_content = json_decode($data['s_content'], true);
			$_SESSION['s_nickname'] = $s_content['s_nickname'];//用户名
			$_SESSION['s_face_pic'] = $s_content['s_face_pic'];//用户头像
			$_SESSION['s_phone'] = $s_content['s_phone'];//用户电话
			$_SESSION['s_email'] = $s_content['s_email'];//用户邮箱
			$_SESSION['i_sex'] = $s_content['i_sex'];//用户性别
			$_SESSION['s_qq'] = $s_content['s_qq'];//用户qq
			$arr['i_mid'] = 4;
			$arr['s_mobile'] = $name;
			$arr['s_password'] = $pasw;
			$data1 = curl_post($arr);
			$data1 = json_decode($data1,true);
			if($data1['i_sta'] == "1"){
				tongji($i_loginNum=1,$i_regNum=0,$i_eventNum=0,$i_serviceNum=0,$i_applyNum=0,$i_newsNum=0,$i_projectNum=0,$i_liveNum=0);
				$_SESSION['s_session'] = $data1['s_session'];
			}else{
				$_SESSION['s_session'] = '';
			}
		}
	}
}



/*
 * 定义一个跳转页面
 */
function tzym($url,$content){
	include_once "./template/errorpage.html";
	exit;
}

function randstr($kind, $len){
	$randstr = "";
	if($kind == 'i'){
		for($i=0; $i<$len; $i++){
			$randstr = $randstr.chr(mt_rand(48, 57));
		}
	}else if($kind == 's'){
		for($i=0; $i<$len; $i++){
			$randstr = $randstr.chr(mt_rand(97, 122));
		}
	}else if($kind == 'a'){
		for($i=0; $i<$len; $i++){
			// $randstr = $randstr.chr(mt_rand(48, 57));
			// $randstr = $randstr.chr(mt_rand(97, 122));
			$r = mt_rand(88, 123);
			if($r <= 97){
				$randstr = $randstr.chr($r - 40);
			}else{
				$randstr = $randstr.chr($r - 1);
			}
		}
	}
	return $randstr;
}


function timestamp($kind){
	$t = 0;
	if($kind == 'now'){
		$t = time();
	}
	return $t;
}




function tjyz(){
	/*
     * 主要用户实现提交验证
     */
	$app = "qwertyuiopasdfghjklmnbvcxzQWERTYUIOPLKJHGFDSAMNBVCXZ";
	$len = strlen($app)-1;
	$yz = '';
	for($i=1;$i<=11;++$i){
		$w = rand(0,$len);
		$yz .= substr($app,$w,1);
	}
	return $yz;
}

/*
 * 处理搜索结果的价格
 */
function ss_del($arr){
	foreach($arr as $key=>$v){
		$arr[$key]['shop_price'] = $v['i_price']/100;
	}
	return $arr;
}

/*
 * 处理商品的相关价格
 * $arr代表商品数据
 * 价格是以分作单位的
 */
function price_del($arr){
	$mmtime = time();
	foreach($arr as $key=>$v){
		if(count($v) > 0){
			//首先要判断是否促销
			if($v['i_promote_time_start'] <= $mmtime && $mmtime <= $v['i_promote_time_end']){
				$arr[$key]['shop_price'] = $v['i_promote_price']/100;//以促销价,作为商品的价格
			}else{
				$arr[$key]['shop_price'] = $v['i_price']/100;//以正式的价格作为商品的价格
			}
			//计算市场价格
			$arr[$key]['market_price'] = $arr[$key]['shop_price']*1.3;//市场价格
		}else{
			unset($arr[$key]);
		}
	}
	return $arr;
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
	$mm['address'] .= $arr['loctions'];
	return $mm;
}

/**
 * @param array $acc
 * @return mixed
 * 主要用于修改已经过去了多少时间
 */
function time_cha($mytime){
	$cha = time()-$mytime;
	$pd = 365*24*60*60;
	if($cha >= $pd){
		$ff = ceil($cha/$pd)."年前";
		return $ff;
	}
	$pd = 24*60*60;
	if($cha >= $pd){
		$ff = ceil($cha/$pd)."天前";
		return $ff;
	}
	$pd = 60*60;
	if($cha >= $pd){
		$ff = ceil($cha/$pd)."小时前";
		return $ff;
	}
	$pd = 60;
	if($cha >= $pd){
		$ff = ceil($cha/$pd)."分钟前";
		return $ff;
	}

}

function postData($url, $data){
	$data = http_build_query($data);
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_HEADER, 0);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	curl_setopt($curl, CURLOPT_TIMEOUT_MS, 10000);
	$data = curl_exec($curl);

	if($data === false){
		echo 'error:'.curl_error($curl);
	}
	curl_close($curl);
	return $data;
}
function postData1($url, $data){
	$data = http_build_query($data);
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/x-www-form-urlencoded'));
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_HEADER, 0);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	//curl_setopt($curl, CURLOPT_TIMEOUT_MS, 10000);
	$data = curl_exec($curl);
	if($data === false){
		echo 'error:'.curl_error($curl);
	}
	curl_close($curl);
	return $data;
}

function postData2($url, $data){
	$data = http_build_query($data);
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_HEADER, 0);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	//curl_setopt($curl, CURLOPT_TIMEOUT_MS, 10000);
	$data = curl_exec($curl);
	if($data === false){
		echo 'error:'.curl_error($curl);
	}
	curl_close($curl);
	return $data;
}


function curl_post($acc=array()){
/**
 * 主要用于传递，获取数据
 */
	$url = "http://172.16.2.10/servicephp";//正式服
//$url = "http://175.155.13.147:1480/servicephp";//测试服
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
$arr['s_session'] = '';
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

