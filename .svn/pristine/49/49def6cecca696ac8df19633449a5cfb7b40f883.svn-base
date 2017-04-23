<?php
/*
 * 我的消息的相关信息的处理
 */
include_once "./init.php";
include_once "./function/sql.php";
include_once "./function/fc.php";
$act = isset($_REQUEST['act']) ? $_REQUEST['act'] : "zhu";
$beforeurl='http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
if($act == "zhu"){
    //首页
    $pp = isset($_REQUEST['pp']) ? htmlspecialchars($_REQUEST['pp']) : 1;
    $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
    if(!($_SESSION['uid'] > 0)){
        header("location:./grzx.php?act=index");
        exit;
    }

    $arr['i_mid'] = 68;
    $arr['i_page'] = $page;
    $arr['i_count'] = 8;
    $arr['s_session'] = $_SESSION['s_session'];
    if($pp == 1){
        $arr['i_type'] = 0;
        $title = "系统消息";
    }elseif($pp == 2){
        $arr['i_type'] = 1;
        $title = "交易信息";
    }
        $data = curl_post($arr);
        $data = json_decode($data, true);
        if($data['i_sta']=='-1') {
             $_SESSION['beforeurl']=$beforeurl;
             $_SESSION['uid']=0;
             echo '<script type="text/javascript">';
             echo "alert('你的账号在异地登录,请重新登陆,并修改密码！');window.location.href ='./grzx.php'";
             echo '</script>';           
             die();
        }
        if($data['i_sta'] == 1){
            //说明获取消息成功
            $shuju = json_decode($data['aas_ressult'], true);
            foreach($shuju as $key=>$v){
                $aa = base64_decode($v['s_content']);
                // $aa = mb_substr($aa,0,50,"utf-8") ;
                // $aa .= "...";
                $shuju[$key]['s_content'] = strip_tags($aa);
            }
        }
    if($page == 1){
        include_once "./template/mymessage.html";
    }else{
        include_once "./template/post6.html";
    }

}elseif($act == "detail"){
    $pp = isset($_REQUEST['pp']) ? $_REQUEST['pp'] : 1;
    if(!($_SESSION['uid'] > 0)){
        header("location:./grzx.php?act=index");
        exit;
    }
    $arr['i_mid'] = 68;
    $arr['i_page'] = 1;
    $arr['i_count'] = 100;
    $arr['s_session'] = $_SESSION['s_session'];
    if($pp == 1){
        $arr['i_type'] = 0;
    }elseif($pp == 2){
        $arr['i_type'] = 1;
    }
    $title = "消息详情";
    $data = curl_post($arr);
    $data = json_decode($data, true);
    if($data['i_sta']=='-1') {
        $_SESSION['beforeurl']=$beforeurl;
        $_SESSION['uid']=0;
        echo '<script type="text/javascript">';
        echo "alert('你的账号在异地登录,请重新登陆,并修改密码！');window.location.href ='./grzx.php'";
        echo '</script>';           
        die();
    }
    if($data['i_sta'] == 1){
        //说明获取消息成功
        $shuju = json_decode($data['aas_ressult'], true);
        foreach($shuju as $key=>$v){
            if($v['i_id'] == $_REQUEST['id']){
                //取出单个消息,其他消息删除
                $aa = base64_decode($v['s_content']);
                $shuju[$key]['s_content'] = $aa;
            }else{
                unset($shuju[$key]);
            }
        }
    }
    include_once "./template/mess_detail.html";
}
