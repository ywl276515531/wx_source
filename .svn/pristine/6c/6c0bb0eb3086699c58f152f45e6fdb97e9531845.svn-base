<?php
header("Content-type:text/html;charset=utf-8");
include_once 'net.php';
$action=isset($_REQUEST['action']) ? $_REQUEST['action'] : 'index';
if ($action=='index') {
	$arr['i_mid']='323';
	$data=curl_post($arr);
	$data=json_decode($data,true);
	$joblist=json_decode($data['as_job'],true);
	$personlist=json_decode($data['as_person'],true);
	$jobcount=count($joblist)<=3 ? count($joblist) : 3;
	$personcount=count($personlist)<=3 ? count($personlist) : 3;
	include_once '../pages/recruit/recruit.html';
}elseif ($action=='detail') {
	$id=$_REQUEST['id'];
	$arr['i_mid']='308';
	$arr['i_id']=$id;
	$data=curl_post($arr);
	$data=json_decode($data,true);
	$data=json_decode($data['as_result'],true);
	$data=$data[0];
	if ($data['i_money_end']==0) {
		$money='面议';
	}else{
		$start=$data['i_money_start']/100000;
		$end=$data['i_money_end']/100000;
		$money=$start.'k~'.$end.'k';
	}
	$addr=explode('_', $data['s_address']);
	$addr_arr['province']=$addr[0];
	$addr_arr['city']=$addr[1];
	$addr=pp_cs($addr_arr);	
	$require=$data['as_edu']['s_edu'].' | '.$data['as_year']['s_year'].'工作经验 | '.$data['as_style']['s_sty'].' | 招聘'.$data['i_num'].'人';
	$point='职位亮点：'.$data['s_note'];
	$e_mail=$data['s_email'];
	$phone=$data['s_phone'];
	$jobdetail=base64_decode($data['s_content']);
	include_once '../pages/recruit/jobdetail.html';
}elseif ($action=='perdetail') {
	$arr['i_mid']='318';
	$arr['i_id']=$_REQUEST['id'];
	$data=curl_post($arr);
	$data=json_decode($data,true);
	$data=json_decode($data['obj_result'],true);
	$commonnews=$data['s_name'].'|'.$data['as_sex']['s_sex'].'|';
	$now=str_replace('-', '', date('Y'));
	$old=$now-substr($data['s_birth'],0,4);
	$commonnews.=$old;
	$workexp=base64_decode($data['s_exp']);
	$intr=base64_decode($data['s_content']);
	$time=explode('_', $data['s_edu_time']);
	$time[0]=substr($time[0], 0,4).'/'.substr($time[0], 4,6);
	$time[1]=substr($time[1], 0,4).'/'.substr($time[1], 4,6);
	$time=$time[0].'-'.$time[1];
	$eduexp=$time.'就读于'.$data['s_school'].'|'.$data['s_major'].'|'.$data['as_edu']['s_edu'];
	$addr=explode('_', $data['s_live_address']);
	$addr_arr['province']=$addr[0];
	$addr_arr['city']=$addr[1];
	$liveaddr=pp_cs($addr_arr);
	$liveaddr=$liveaddr['address'];
	$addr=explode('_', $data['s_birth_address']);
	$addr_arr['province']=$addr[0];
	$addr_arr['city']=$addr[1];
	$birthaddr=pp_cs($addr_arr);
	$birthaddr=$birthaddr['address'];
	$other=$data['as_year']['s_year'].'|现居 '.$liveaddr.'|户口所在地 '.$birthaddr;
	$addr=explode('_', $data['s_address']);
	$addr_arr['province']=$addr[0];
	$addr_arr['city']=$addr[1];
	$addr=pp_cs($addr_arr);
	$s_m=$data['i_money_start']/100000;
	$e_m=$data['i_money_end']/100000;
	$m_m='希望月薪'.$s_m.'k~'.$e_m.'k';
	$job=$data['as_style']['s_sty'].'|'.$data['s_job'].'|期望在'.$addr['address'].'工作|'.$m_m.'|目前状态:'.$data['as_user_sta']['s_sta'];
	include_once '../pages/recruit/persondetail.html';
}elseif ($action=='morejob') {
	$kind=isset($_REQUEST['kind']) ? $_REQUEST['kind'] : "1";

	$arr['i_mid']='315';
	$arr['i_page']=isset($_REQUEST['i_page']) ? $_REQUEST['i_page'] : '1';
	$arr['i_count']='8';
	$arr['i_exp']=isset($_REQUEST['i_exp']) ? $_REQUEST['i_exp'] :'0';
	$arr['i_edu']=isset($_REQUEST['i_edu']) ? $_REQUEST['i_edu'] : '0';
	$arr['i_kind']=isset($_REQUEST['i_kind']) ? $_REQUEST['i_kind'] :'0';
	$type_order['i_type']=isset($_REQUEST['i_type']) ? $_REQUEST['i_type']:'1';
	$type_order['i_order']='2';
	$arr['as_order']=json_encode($type_order);
	$arr['i_money']=isset($_REQUEST['i_money']) ? $_REQUEST['i_money'] :'0';
	$arr['i_style']=isset($_REQUEST['i_style']) ? $_REQUEST['i_style']:'0';
	$arr['s_address']=isset($_REQUEST['s_address']) ? $_REQUEST['s_address']:'0';	
	$data=curl_post($arr);
	$data_result=json_decode($data,true);
	$data=json_decode($data_result['as_JobList'],true);	
	$province=getProvince();
	if (strpos($arr['s_address'], '_')) {
		$num=explode('_', $arr['s_address']);
		$city=getCity($num[0]);
	}else if($arr['s_address']>0){
		$city=getCity($arr['s_address']);
	}else{
		$city=getCity(0);
	}
	include_once '../pages/recruit/morejob.html';
}elseif ($action=='postjob') {
	$arr['i_mid']='315';
	$arr['i_page']=isset($_REQUEST['i_page']) ? $_REQUEST['i_page'] : '2';
	$arr['i_count']='8';
	$arr['i_exp']=isset($_REQUEST['i_exp']) ? $_REQUEST['i_exp'] :'0';
	$arr['i_edu']=isset($_REQUEST['i_edu']) ? $_REQUEST['i_edu'] : '0';
	$arr['i_kind']=isset($_REQUEST['i_kind']) ? $_REQUEST['i_kind'] :'0';
	$type_order['i_type']=isset($_REQUEST['i_type']) ? $_REQUEST['i_type']:'1';
	$type_order['i_order']='2';
	$arr['as_order']=json_encode($type_order);
	$arr['i_money']=isset($_REQUEST['i_money']) ? $_REQUEST['i_money'] :'0';
	$arr['i_style']=isset($_REQUEST['i_style']) ? $_REQUEST['i_style']:'0';
	$arr['s_address']=isset($_REQUEST['s_address']) ? $_REQUEST['s_address']:'0';	
	$data=curl_post($arr);
	$data_result=json_decode($data,true);
	$data=json_decode($data_result['as_JobList'],true);	
	include_once '../pages/recruit/postjob.html';
}elseif ($action=='moreperson') {
	$kind=isset($_REQUEST['kind']) ? $_REQUEST['kind'] : "1";
	
	$arr['i_mid']='321';
	$arr['i_page']=isset($_REQUEST['i_page']) ? $_REQUEST['i_page'] : '1';
	$arr['i_count']='8';
	$arr['i_exp']=isset($_REQUEST['i_exp']) ? $_REQUEST['i_exp'] :'0';
	$arr['i_edu']=isset($_REQUEST['i_edu']) ? $_REQUEST['i_edu'] : '0';	
	$type_order['i_type']=isset($_REQUEST['i_type']) ? $_REQUEST['i_type']:'1';
	$type_order['i_order']='2';
	$arr['as_order']=json_encode($type_order);
	$arr['i_money']=isset($_REQUEST['i_money']) ? $_REQUEST['i_money'] :'0';
	$arr['i_style']=isset($_REQUEST['i_style']) ? $_REQUEST['i_style']:'0';
	$arr['s_address']=isset($_REQUEST['s_address']) ? $_REQUEST['s_address']:'0';	
	$data=curl_post($arr);
	$data_result=json_decode($data,true);
	$data=json_decode($data_result['as_PersonList'],true);	
	$province=getProvince();
	if (strpos($arr['s_address'], '_')) {
		$num=explode('_', $arr['s_address']);
		$city=getCity($num[0]);
	}else if($arr['s_address']>0){
		$city=getCity($arr['s_address']);
	}else{
		$city=getCity(0);
	}
	include_once '../pages/recruit/moreperson.html';
}elseif ($action=='postperson') {
	$arr['i_mid']='321';
	$arr['i_page']=isset($_REQUEST['i_page']) ? $_REQUEST['i_page'] : '1';
	$arr['i_count']='8';
	$arr['i_exp']=isset($_REQUEST['i_exp']) ? $_REQUEST['i_exp'] :'0';
	$arr['i_edu']=isset($_REQUEST['i_edu']) ? $_REQUEST['i_edu'] : '0';	
	$type_order['i_type']=isset($_REQUEST['i_type']) ? $_REQUEST['i_type']:'1';
	$type_order['i_order']='2';
	$arr['as_order']=json_encode($type_order);
	$arr['i_money']=isset($_REQUEST['i_money']) ? $_REQUEST['i_money'] :'0';
	$arr['i_style']=isset($_REQUEST['i_style']) ? $_REQUEST['i_style']:'0';
	$arr['s_address']=isset($_REQUEST['s_address']) ? $_REQUEST['s_address']:'0';	
	$data=curl_post($arr);
	$data_result=json_decode($data,true);
	$data=json_decode($data_result['as_PersonList'],true);	
	include_once '../pages/recruit/postperson.html';
}
?>