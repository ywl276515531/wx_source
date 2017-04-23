<?php
header("Content-type:text/html;charset=utf-8");
header("Cache-Control: no-cache, must-revalidate");
include_once 'net.php';
tongji($i_loginNum=0,$i_regNum=0,$i_eventNum=0,$i_serviceNum=0,$i_applyNum=0,$i_newsNum=0,$i_projectNum=1,$i_liveNum=0);
$action=isset($_REQUEST['action']) ? $_REQUEST['action'] : 'index';
if ($action=='index') {
	$arr['i_mid']='138';
	$arr['i_page']='1';
	$arr['i_count']='6';
	$arr['i_product_type_id']='0';
	$arr['i_city_id']='99999';
	$arr['i_money_level']='0';
	$arr_money['i_kind']='1';
	$arr_money['i_min']=0;
	$arr_money['i_max']=0;
	$arr_order['i_kind']='1';
	$arr_order['i_rule']='1';
	$arr['s_money_interval']=json_encode($arr_money);
	$arr['s_order']=json_encode($arr_order);
	$result_pro=curl_post($arr);	
	$result_pro=json_decode($result_pro,true);
	$result_pro=json_decode($result_pro['aas_result'],true);

	$arr1['i_mid']='331';
	$arr1['i_page']='1';
	$arr1['i_count']='4';
	$arr1['i_product_type_id']='0';
	$arr1['i_city_id']='99999';
	$arr1['i_money_level']='0';
	$result_per=curl_post($arr1);
	$result_per=json_decode($result_per,true);
	$result_per=json_decode($result_per['aas_result'],true);
	include_once '../pages/finance/finance.html';
}elseif ($action=='morepro') {
	$kind=isset($_REQUEST['kind']) ? $_REQUEST['kind'] : "1";

	$arr1['i_mid']='210';
	$title=curl_post($arr1);
	$title=json_decode($title,true);
	$title=json_decode($title['aas_result'],true);
	array_unshift($title,array('i_id'=>'0','s_title'=>'全部'));

	$arr['i_mid']='138';
	$arr['i_page']='1';
	$arr['i_count']='12';
	$arr['i_product_type_id']=isset($_REQUEST['i_product_type_id']) ? $_REQUEST['i_product_type_id'] : '0';
	$arr['i_city_id']=isset($_REQUEST['i_city_id']) ? $_REQUEST['i_city_id'] : '99999';
	$arr['i_money_level']=isset($_REQUEST['i_money_level']) ? $_REQUEST['i_money_level'] : '0';
	$money_arr['i_kind']='1';
	$money_arr['i_min']=isset($_REQUEST['i_min']) ? $_REQUEST['i_min'] : 0;
	$money_arr['i_max']=isset($_REQUEST['i_max']) ? $_REQUEST['i_max'] :0;
	$order_arr['i_kind']=isset($_REQUEST['i_kind']) ? $_REQUEST['i_kind'] :'1';
	$order_arr['i_rule']=1;
	$arr['s_money_interval']=json_encode($money_arr);
	$arr['s_order']=json_encode($order_arr);
	$data=curl_post($arr);
	$data_result=json_decode($data,true);
	$data=json_decode($data_result['aas_result'],true);
	include_once '../pages/finance/morepro.html';
}elseif ($action=='postpro') {
	$arr['i_mid']='138';
	$arr['i_page']=isset($_REQUEST['i_page']) ? $_REQUEST['i_page'] :'1';
	$arr['i_count']='12';
	$arr['i_product_type_id']=isset($_REQUEST['i_product_type_id']) ? $_REQUEST['i_product_type_id'] : '0';
	$arr['i_city_id']=isset($_REQUEST['i_city_id']) ? $_REQUEST['i_city_id'] : '99999';
	$arr['i_money_level']=isset($_REQUEST['i_money_level']) ? $_REQUEST['i_money_level'] : '0';
	$money_arr['i_kind']='1';
	$money_arr['i_min']=isset($_REQUEST['i_min']) ? $_REQUEST['i_min'] : 0;
	$money_arr['i_max']=isset($_REQUEST['i_max']) ? $_REQUEST['i_max'] :0;
	$order_arr['i_kind']=isset($_REQUEST['i_kind']) ? $_REQUEST['i_kind'] :'1';
	$order_arr['i_rule']=1;
	$arr['s_money_interval']=json_encode($money_arr);
	$arr['s_order']=json_encode($order_arr);
	$data=curl_post($arr);
	$data_result=json_decode($data,true);
	$data=json_decode($data_result['aas_result'],true);
	include_once '../pages/finance/postpro.html';
}elseif ($action=='moreper') {
	$kind=isset($_REQUEST['kind']) ? $_REQUEST['kind'] : "1";
	
	$arr1['i_mid']='210';
	$title=curl_post($arr1);
	$title=json_decode($title,true);
	$title=json_decode($title['aas_result'],true);
	array_unshift($title,array('i_id'=>'0','s_title'=>'全部'));

	$arr['i_mid']='331';
	$arr['i_page']='1';
	$arr['i_count']='12';
	$arr['i_product_type_id']=isset($_REQUEST['i_product_type_id']) ? $_REQUEST['i_product_type_id'] : '0';
	$arr['i_city_id']=isset($_REQUEST['i_city_id']) ? $_REQUEST['i_city_id'] :'99999';
	$arr['i_money_level']=isset($_REQUEST['i_money_level']) ? $_REQUEST['i_money_level'] : '0';
	$data=curl_post($arr);
	$data_result=json_decode($data,true);
	$data=json_decode($data_result['aas_result'],true);
	include_once '../pages/finance/moreper.html';
}elseif ($action=='postper') {
	$arr1['i_mid']='210';
	$title=curl_post($arr1);
	$title=json_decode($title,true);
	$title=json_decode($title['aas_result'],true);
	array_unshift($title,array('i_id'=>'0','s_title'=>'全部'));

	$arr['i_mid']='331';
	$arr['i_page']=isset($_REQUEST['i_page']) ? $_REQUEST['i_page'] : '1';
	$arr['i_count']='12';
	$arr['i_product_type_id']=isset($_REQUEST['i_product_type_id']) ? $_REQUEST['i_product_type_id'] : '0';
	$arr['i_city_id']=isset($_REQUEST['i_city_id']) ? $_REQUEST['i_city_id'] :'99999';
	$arr['i_money_level']=isset($_REQUEST['i_money_level']) ? $_REQUEST['i_money_level'] : '0';
	$data=curl_post($arr);
	$data_result=json_decode($data,true);
	$data=json_decode($data_result['aas_result'],true);
	include_once '../pages/finance/postper.html';
}elseif ($action=='prodetail') {
	$arr1['i_mid']='210';
	$title=curl_post($arr1);
	$title=json_decode($title,true);
	$title=json_decode($title['aas_result'],true);

	$arr['i_mid']='139';
	$arr['i_id']=isset($_REQUEST['i_id']) ? $_REQUEST['i_id'] : '7';
	$data=curl_post($arr);
	$data=json_decode($data,true);
	$data=json_decode($data['aas_result'],true);
	$data=$data[0];
	$addr=_getCity($data['i_city_id']);
	$type_arr=json_decode($data['a_product_type_id']);
	$type='';
	foreach ($title as $val) {
		foreach ($type_arr as $value) {
			if($val['i_id']==$value){
				$type.=$val['s_title'].'-';
			}
		}
	}
	$pro_path=json_decode($data['a_product_path'],true);
	$founder_info=json_decode($data['s_founder_info'],true);
	$type=substr($type,0,strlen($type)-1);
	$dev_level=array('1'=>'概念阶段','2'=>'研发阶段','3'=>'正式发布','4'=>'已有用户','5'=>'已有收入');
	$money_level=array('1'=>'种子轮','2'=>'天使轮','3'=>'A轮','4'=>'B轮','5'=>'C轮','6'=>'C轮以上');
	include_once '../pages/finance/prodetail.html';
}elseif ($action=='perdetail') {
	$arr1['i_mid']='210';
	$title=curl_post($arr1);
	$title=json_decode($title,true);
	$title=json_decode($title['aas_result'],true);

	$arr['i_mid']='332';
	$arr['i_id']=isset($_REQUEST['i_id']) ? $_REQUEST['i_id'] : '16';
	$data=curl_post($arr);
	$data=json_decode($data,true);
	$data=json_decode($data['aas_result'],true);
	$data=$data[0];
	$city=_getCity($data['i_city_id']);
	$type_arr=json_decode($data['a_product_type_id']);
	$type='';
	foreach ($title as $val) {
		foreach ($type_arr as $value) {
			if($val['i_id']==$value){
				$type.=$val['s_title'].'-';
			}
		}
	}
	$type=substr($type,0,strlen($type)-1);
	$money_level=array('1'=>'种子轮','2'=>'天使轮','3'=>'A轮','4'=>'B轮','5'=>'C轮','6'=>'C轮以上');
	include_once '../pages/finance/perdetail.html';
}
?>