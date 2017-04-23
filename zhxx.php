<?php
/*
 * 综合信息页面
 */
include_once "./init.php";
include_once "./function/fc.php";
include_once "./function/sql.php";
tongji($i_loginNum=0,$i_regNum=0,$i_eventNum=0,$i_serviceNum=0,$i_applyNum=0,$i_newsNum=1,$i_projectNum=0,$i_liveNum=0);
$act = isset($_REQUEST['act']) ? $_REQUEST['act'] : "index";
if($act == "index"){
    $title = "综合信息";
    //新闻分类列表页面
    /*****************获取新闻分类******************/
    $arr['i_mid'] = "119";
    $data = curl_post($arr);
    $data = json_decode($data, true);
    $shuju = json_decode($data['aas_result'], true);
    /*****************获取新闻列表******************/
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : $shuju[0]['id'];//代表新闻分类id
    $arr1['i_mid'] = "118";
    $arr1['i_type'] = check_input($id);
    $arr1['i_page'] = 1;
    $arr1['i_count'] = 5;
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    if($data1['i_sta'] == 1){
        $shuju1 = json_decode($data1['aas_result'], true);
    }
    include_once "./template/news.html";
}elseif($act == "getzhxx"){
    //通过ajax获取数据
    $id = $_GET['myid'];
    $arr1['i_mid'] = "118";
    $arr1['i_type'] = $id;
    $arr1['i_page'] = 1;
    $arr1['i_count'] = 5;
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    if($data1['i_sta'] == 1){
        $shuju1 = json_decode($data1['aas_result'], true);
    }
    include_once "./template/getzhxx.html";
}


elseif($act == "detail"){
    //这个主要用于显示新闻详情页面
    $id = isset($_REQUEST['id']) ? check_input($_REQUEST['id']) : '';//新闻id
    $title = "新闻详情";
    if($id == ""){
        header("location:./zhxx.php");
        exit;
    }
    $arr['i_mid'] = "123";
    $arr['i_id'] = $id;
    $data = curl_post($arr);
    $data = json_decode($data, true);
    if($data['i_sta'] == 1){

        $shuju = json_decode($data['aas_result'], true);
        foreach($shuju as $key=>$v){
            $content = base64_decode($v['s_content']);
//            $content = preg_replace('/".*\/uploads\//', '"http://www.wfyizhan.com/uploads/', $content); //-----删除<style></style>和中间的部分
//            //$content = str_replace("/uploads/","http://www.wfyizhan.com/uploads/",$content);
            $shuju[$key]['s_content'] = trimall($content);//内容
        }
    }else{
        header("location:./zhxx.php");
        exit;
    }
   $shuju[0]['s_pic']=str_replace('..','/kcy/web',$shuju[0]['s_pic']);
    include_once "./template/newsdetail.html";
}elseif($act == "post4"){
    //通过ajax搜索数据
    $arr1['i_mid'] = "118";
    $arr1['i_type'] = $_POST['i_type'];
    $arr1['i_page'] = $_POST['i_page'];
    $arr1['i_count'] = 5;
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    if($data1['i_sta'] == 1){
        $shuju1 = json_decode($data1['aas_result'], true);
        include_once "./template/post4.html";
    }

}
