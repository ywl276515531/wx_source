<?php
/*
 * 个人中心的租赁的相关信息
 */
include_once "./init.php";
include_once "./function/sql.php";
include_once "./function/fc.php";
$act = isset($_REQUEST['act']) ? $_REQUEST['act'] : "zhu";
$ddzt = array(0=>"等待卖家确认",1=>"等待付款","2"=>"线下付款","3"=>"已付款到平台","4"=>"等待买家确认付款","5"=>"交易完成","99"=>'交易取消');
$note=array("0"=>"取消订单","1"=>"立即付款","2"=>"线下付款","3"=>"等待卖家确认场地","4"=>"确认付款","5"=>"交易完成","99"=>"交易已取消");
if(intval($_SESSION['uid'])<1){
    header("location:./grzx.php?act=index");
    exit;
}
if($act == "zhu"){
    //租赁表首页

    $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
    $title = "我的租赁";
    $arr['i_mid'] = 199;
    $arr['i_page'] = $page;
    $arr['i_page_size'] = 8;
    $arr['i_trade_type'] = 2;
    $arr['i_user_type'] = 2;
    $arr['s_session'] = $_SESSION['s_session'];
    $data = curl_post($arr);
    $data = json_decode($data, true);
        //说明没有错误
        $shuju = json_decode($data['as_orders'], true);
        $shuju = get_pic($shuju);
    if($page == 1){
        include_once "./template/myzulin.html";
    }else{
        include_once "./template/post10.html";
    }

}elseif($act == "detail"){
    /**
     * 显示订单的详细信息
     */
    if(!($_SESSION['uid'] > 0)){
        header("location:./grzx.php?act=index");
    }
    $id = $_REQUEST['id'];
    $title = "租赁详情";
    $arr['i_mid'] = 201;
    $arr['i_id'] = $id;
    $arr['s_session'] = $_SESSION['s_session'];
    $data = curl_post($arr);
    $data = json_decode($data, true);
    if($data['i_sta'] == 1){
        //说明没有错误
        $shuju = json_decode($data['as_order'], true);
        $shuju['as_booking_time'] = json_decode($shuju['as_booking_time']);
       // $shuju['s_note'] = base64_decode($shuju['s_note']);
    }
    $arr1['i_mid'] = 282;
    $arr1['s_session'] = $_SESSION['s_session'];
    $arr1['i_page'] = 1;
    $arr1['i_page_size'] = 1000;
    $arr1['i_user_type'] = 2;
    $arr1['i_sta'] = 0;
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    $data1 = json_decode($data1['as_orders'], true);
    foreach($data1 as $v){
        if($v['i_id'] == $id){
            $s_sell_phone = $v['s_sell_phone'];
        }
    }
    include_once "./template/dd_xq.html";
}else if ($act=="done") {
    $s_sn=$_REQUEST['s_sn'];
    $arr['i_mid']='363';
    $arr['s_sn']=$s_sn;
    $arr['s_session'] = $_SESSION['s_session'];
    $data = curl_post($arr);
    $data = json_decode($data, true);
    if ($data['i_sta']==1) {
        echo "1";
    }else{
        echo $data['s_err'];
    }
}else if ($act=="i_relay_cancel") {
    $i_id=$_REQUEST['i_id'];
    $arr['i_mid']='202';
    $arr['i_id']=$i_id;
    $arr['s_session'] = $_SESSION['s_session'];
    $data = curl_post($arr);
    $data = json_decode($data, true);
    if ($data['i_sta']==1) {
        echo "1";
    }else{
        echo $data['s_err'];
    }
}
