<?php
/*
 * 我的收藏的相关信息的处理
 */
include_once "./init.php";
include_once "./function/sql.php";
include_once "./function/fc.php";
$act = isset($_REQUEST['act']) ? $_REQUEST['act'] : "zhu";
if(intval($_SESSION['uid'] )<1){
    header("location:./grzx.php?act=index");
    exit;
}
if($act == "zhu"){
    //首页
    $pp = isset($_REQUEST['pp']) ? $_REQUEST['pp'] : 1;

    $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
    $arr['i_mid'] = 161;
    $arr['i_page'] = $page;
    $arr['i_count'] = 8;
    $arr['s_session'] = $_SESSION['s_session'];
    if($pp == 1){
        $arr['s_mod'] = "event";
        $title = "活动收藏";
    }elseif($pp == 2){
        $arr['s_mod'] = "SERVICE";
        $title = "服务收藏";
    }
        $data = curl_post($arr);
        $data = json_decode($data, true);
        if($data['i_sta'] == 1){
            //说明获取收藏成功
            $shuju = json_decode($data['aas_result'], true);
        }
    if($page == 1){
        include_once "./template/collect.html";
    }else{
        include_once "./template/post11.html";
    }

}elseif($act == "quxiao"){
    /**
     * 这个方法主要用于取消收藏
     */
    $id = $_REQUEST['id'];//活动id
    $mod = $_REQUEST['mod'];//模块
    $arr['i_mid'] = 172;
    $arr['s_mod'] = $mod;
    $arr['i_row_id'] = $id;
    $arr['s_session'] = $_SESSION['s_session'];
    $data = curl_post($arr);
    $data = json_decode($data, true);
    if($data['i_sta'] == 1){
        $pp = $_REQUEST['pp'];
        $url = "./collect.php?act=zhu&pp=".$pp;

    }else{

    }
}
