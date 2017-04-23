<?php
/*
 * 主要用于处理行政服务的相关选项
 */
include_once "./init.php";
include_once "./function/fc.php";
include_once "./function/sql.php";
tongji($i_loginNum=0,$i_regNum=0,$i_eventNum=0,$i_serviceNum=0,$i_applyNum=1,$i_newsNum=0,$i_projectNum=0,$i_liveNum=0);
$act = isset($_REQUEST['act']) ? $_REQUEST['act'] : "index";
if($act == 'index'){
    /*
     * 行政服务的主页
     */
    $title="行政服务";
    $arr['i_mid'] = "265";
    $data = curl_post($arr);
    $data = json_decode($data, true);
    $shuju = json_decode($data['aas_result'], true);
    //首页政务展示
    $arr1['i_mid'] = "271";
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    if($data1['i_sta'] == '1'){
        //说明数据取出成功
        $syzwzs = json_decode($data1['aas_nresult'], true);
    }else{
        $syzwzs = array();
    }
    //首页热门业务
    $arr2['i_mid'] = 273;
    $data2 = curl_post($arr2);
    $data2 = json_decode($data2, true);
    if($data2['i_sta'] == '1'){
        //说明数据取出成功
        $syrmyw = json_decode($data2['aas_result'], true);
    }else{
        $syrmyw = array();
    }
    //首页办事对象
    $arr3['i_mid'] = 272;
    $data3 = curl_post($arr3);
    $data3 = json_decode($data3, true);
    if($data3['i_sta'] == '1'){
        //说明数据取出成功
        $grbs = json_decode($data3['aas_presult'], true);
        $qybs = json_decode($data3['aas_cresult'], true);
    }else{
        $grbs = array();
        $qybs = array();
    }
    //首页公告
    $arr4['i_mid'] = 267;
    $data4 = curl_post($arr4);
    $data4 = json_decode($data4, true);
    if($data4['i_sta'] == '1'){
        //说明数据取出成功
        $sygg = json_decode($data4['aas_result'], true);
    }else{
        $sygg = array();
    }
    include_once "./template/service.html";
}
/**
 * 主要用于显示二级列表页面
 * id代表业务id
 */
elseif($act == "second"){
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : 0;
    if($id == ""){
        header("./xzservice.php?act=index");
        exit;
    }
    $arr['i_mid'] = "265";
    $data = curl_post($arr);
    $data = json_decode($data, true);
    if($data['i_sta'] == "1"){
        $shuju = json_decode($data['aas_result'], true);
    }else{
        $shuju = array();
    }
    $title = "部门列表";
    //获取部门简介
    $arr2['i_mid'] = 291;
    $arr2['i_id'] = $id;
    $data2 = curl_post($arr2);
    $data2 = json_decode($data2, true);
    if($data2['i_sta'] == 1){
        $bumenjj = json_decode($data2['aas_result'], true);//部门简介
        $s_note = base64_decode($bumenjj[0]['s_note']);
    }
    $color = array("style='background:#ef7b7c'","style='background:#66ccff'","style='background:#a4e28f'",
        "style='background:#eec130'","style='background:#ef7b7c'","style='background:#27c4ef'","style='background:#a391fd'");
    include_once "./template/myservice.html";
}
elseif($act == "detail"){
    /*
     * 获取材料的详细信息
     */
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';//材料id
    $title = "行政服务-服务详情";
    if($id == ""){
        header("location:./xzservice.php");
        exit;
    }
//    if(!($_SESSION['uid'] > 0)){
//        tzym("./xzservice.php?act=index","请先登录");
//    }
    $arr['i_mid'] = "292";
    $arr['i_id'] = $id;
   // $arr['s_session'] = $_SESSION['s_session'];
    $data = curl_post($arr);
    $data = json_decode($data, true);

    if($data['i_sta'] == 1){
        $bumen_name = json_decode($data['aas_bresult'], true);//部门名称
        $yewuji = json_decode($data['aas_bresult'], true);//业务数据集
        $s_introduce = base64_decode($yewuji[0]['s_introduce']);//详细介绍
        $sxcl = json_decode($data['aas_rresult'], true);//应交材料
        foreach($sxcl as $key=>$v){
            $sxcl[$key]['s_payable'] = base64_decode($v['s_payable']);
            $sxcl[$key]['s_note'] = base64_decode($v['s_note']);
        }
    }
    include_once "./template/yewu.html";
}elseif($act == 'geturl'){
    //调用页面的接口
    $id = $_REQUEST['id'];
    $url = "http://weixin.wfyizhan.com/11/xzservice.php?act=detail&id=".$id;
    echo $url;
}