<?php
/*
 * 程序首页
 */
include_once "./init.php";
include_once "./function/sql.php";
include_once "./function/fc.php";
$act = isset($_REQUEST['act']) ? $_REQUEST['act'] : "index";
$beforeurl=$qq = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
if(intval($_SESSION['uid'] )<1){
    header("location:./grzx.php?act=index");
    exit;
}
if($act == "index"){
    //收支明细的页面

    $arr['i_mid'] = 462;
    $page = isset($_REQUEST['page'])?$_REQUEST['page']:1;
    $arr['i_page'] = $page;
    $arr['i_count'] = 5;
    $my_now = date("Y-m-d",time());
    $my_before = date("Y-m-d",time()-7*24*60*60);
    $starttime = isset($_REQUEST['starttime'])?htmlspecialchars($_REQUEST['starttime']):$my_before;
    $endtime = isset($_REQUEST['endtime'])?htmlspecialchars($_REQUEST['endtime']):$my_now;
    $arr['s_starttime'] = strtotime($starttime);
    $arr['s_endtime'] = strtotime($endtime)+ 60*60*24;
    $kind = isset($_REQUEST['kind'])?$_REQUEST['kind']:0;
    $arr['i_kind'] = $kind;
    $ordernumber = isset($_REQUEST['ordernumber'])?htmlspecialchars($_REQUEST['ordernumber']):'';
    $arr['s_ordernumber'] = $ordernumber;
    $arr['s_session'] = $_SESSION['s_session'];
    $data = curl_post($arr);
    $data = json_decode($data, true);
    $i_counts = $data['i_counts'];
    if ($data['i_sta']=='-1') {
        $_SESSION['beforeurl']=$beforeurl;
        $_SESSION['uid']=0;
        echo '<script type="text/javascript">';
        echo "alert('你的账号在异地登录,请重新登陆,并修改密码！');window.location.href ='./grzx.php'";
        echo '</script>';           
        die();
    }
    if($data['i_sta'] == '1'){
        $s_moneyCount = json_decode($data['s_moneyCount'],true);//金额统计
        $shuju = json_decode($data['aas_result'],true);//数据集

    }
    $i_page = $data['i_page'];
    $i_pages = $data['i_pages'];
   //获取用户的相关信息
    $arr['i_mid'] = 362;
    $arr['id'] =  $_SESSION['uid'];//用户id
    $data = curl_post($arr);
    $data = json_decode($data, true);
    $s_content = json_decode($data['s_content'], true);
    $i_cash = $s_content['i_cash'];//用户余额(单位分)
    $i_coupon = $s_content['i_coupon'];//优惠券余额(单位分)
    if($page == 1){
        include_once "./template/haha.html";
    }else{
        include_once "./template/post12.html";
    }

}