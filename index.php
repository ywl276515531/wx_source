<?php
/*
 * 程序首页
 */

include_once "./init.php";
include_once "./function/sql.php";
include_once "./function/fc.php";
$act = isset($_REQUEST['act']) ? $_REQUEST['act'] : "zhuce";
if($act == "index"){
    include_once "./template/index.html";
}elseif($act == "zhuce"){
    ss_login();
    $sta=isset($_GET['state'])? trim($_GET['state']) :'';
    if($sta== "1"){
        //跳转到首页
        header("location:./index.php?act=index");
    }elseif($sta == "2"){
        //个人中心
        header("location:./grzx.php?act=zhu");
    }elseif($sta == "3") {
        //活动交流
        header("location:./activity.php");
    }elseif($sta == "4") {
        //服务超市
        header("location:./serviceshop.php");
    }elseif($sta == "5") {
        //行政服务
        header("location:./xzservice.php");
    }elseif($sta == "6") {
        //我的微服
        header("location:./grzx.php?act=zhu");
    }elseif($sta == "7") {
        //综合信息
        header("location:./zhxx.php");
    }elseif($sta == "8"){
        //金融服务
        header("location:./phpWeb/control/finance.php");
        exit;
    }else{
        header("location:./index.php?act=index");
        exit;
    }
}elseif($act == 'bktj'){
    //这个方法主要用于统计直播和金融的浏览次数
    if($_GET['tic'] == 1){
        //金融服务
        tongji($i_loginNum=0,$i_regNum=0,$i_eventNum=0,$i_serviceNum=0,$i_applyNum=0,$i_newsNum=0,$i_projectNum=1,$i_liveNum=0);
    }elseif($_GET['tic'] == 2){
        //直播
        tongji($i_loginNum=0,$i_regNum=0,$i_eventNum=0,$i_serviceNum=0,$i_applyNum=0,$i_newsNum=0,$i_projectNum=0,$i_liveNum=1);
    }
}
