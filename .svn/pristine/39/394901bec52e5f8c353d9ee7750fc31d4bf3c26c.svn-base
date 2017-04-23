<?php  
session_start();
header("Content-type:text/html;charset=utf-8");
include_once 'net.php';
$action=isset($_REQUEST['action']) ? $_REQUEST['action'] : 'open';
if($action=='open'){	

	$arr['i_mid']='223';
	$data=curl_post($arr);
	$data=json_decode($data,true);
	$data=json_decode($data['as_kindList'],true);
	// var_dump($data);

	$arr2['i_mid']='398';
	$arr2['s_mod']='shop';
	$data2=curl_post($arr2);
	$data2=json_decode($data2,true);
	$data2=json_decode($data2['aas_result'],true);

	$arr3['i_mid']='246';
	$data3=curl_post($arr3);
	$data3=json_decode($data3,true);
	$data3=json_decode($data3['as_shop'],true);
	if ($data3) {
		$data3=$data3[0];
		$qqs=explode('_', $data3['s_qq']);
		$a_types=explode('_', $data3['s_shop_type_name']);
	}
	include_once '../pages/shop/openshop.html';
}elseif ($action=='edit') {

	// $arr1['i_mid']='4';
	// // $arr1['s_password']='huang876320';
	// // $arr1['s_mobile']='17791724153';
	// $arr1['s_password']='123456';
	// $arr1['s_mobile']='13398495573';
	// $data1=curl_post($arr1);
	// $data1=json_decode($data1,true);
	// $_SESSION['s_session']=$data1['s_session'];

	$arr4['i_mid']='246';
	$data4=curl_post($arr4);
	$data4=json_decode($data4,true);
	$data4=json_decode($data4['as_shop'],true);
	if (!$data4) {
		header("Location:shop.php");
		exit;
	}

	$arr['i_mid']='223';
	$data=curl_post($arr);
	$data=json_decode($data,true);
	$data=json_decode($data['as_kindList'],true);
	// var_dump($data);

	$arr2['i_mid']='398';
	$arr2['s_mod']='shop';
	$data2=curl_post($arr2);
	$data2=json_decode($data2,true);
	$data2=json_decode($data2['aas_result'],true);

	$arr3['i_mid']='72';
	$data3=curl_post($arr3);
	$data3=json_decode($data3,true);
	$data3=json_decode($data3['aas_result'],true);
	$types=json_decode($data3['ai_type_ids']);
	$qq=explode('_', $data3['s_qq']);
	include_once '../pages/shop/editshop.html';
}elseif ('test') {
	$a=550;
	$b=$a/100;
	$c=number_format($b,2);
	var_dump($c);
}
?>