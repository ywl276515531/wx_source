<?php
/*
 * 程序首页 
 */
include_once "./init.php";
include_once "./function/sql.php";
include_once "./function/fc.php";
$beforeurl='http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
$act = isset($_REQUEST['act']) ? $_REQUEST['act'] : "index";
if($act == "index"){
    if($_SESSION['uid'] > 0){
        header("location:./grzx.php?act=zhu");
        exit;
    }

    if(isset($_POST['sub'])){
        $username = check_input($_POST['username']);
        $password = check_input($_POST['password']);
        ss_dl($username,$password);
    }else{
        if(isset($_SESSION['beforeurl'])){
            $tzdz = $_SESSION['beforeurl'];
            unset($_SESSION['beforeurl']);
        }else{
            $tzdz = '';
        }
        //说明没有提交
        $title = "登录中心";
        $_SESSION['yzm'] = tjyz();
        include_once "./template/login.html";
    }

}
elseif($act === "forgetpasw"){
    //实现重置密码的功能
    if(isset($_POST['sub'])){
    $arr['i_mid'] = 3;
    $arr['s_mobile'] = $_POST['phone'];
    $arr['s_code'] = $_POST['code'];
    $arr['s_password'] = $_POST['pasw1'];
        $data = curl_post($arr);
        $data = json_decode($data, true);
        if($data['i_sta'] == 1){
            echo json_encode(array("stat"=>1));
        }else{
            if($data['s_err'] == 3){
                $hh = "验证码过期";
            }elseif($data['s_err'] == 1){
                $hh = "验证码已经过期";
            }elseif($data['s_err'] == 2){
                $hh = "验证码输入错误";
            }else{
                $hh = $data['s_err'];
            }
            echo json_encode(array("stat"=>0,"err"=>$hh));
        }
    }
    else{
        $title = "重置密码";
        include_once "./template/forgetpsw.html";
    }

}

elseif($act == "reg"){
    /*
     * 这是一个注册页面
     */
    $title = "注册申请";
        include_once "./template/reg.html";

}elseif($act == "message_yz"){
    /*
     * 这个是短信接口专门用于获取短信的相关信息
     */
    // if (isset($_COOKIE['getMessage'])) {
    //     die;
    // }
    // setcookie('getMessage',1,time()+60);
    $arr['s_mobile'] = $_POST['phone'];//手机号码
    $arr['i_type'] = $_POST['i_type'];//	类型0:注册，1:找回密码,2：子账号注册，3：修改自己密码.
    $arr['i_mid'] = "1";
    if(isset($_SESSION['s_session']) && !empty($_SESSION['s_session'])){
        $arr['s_session'] = $_POST['s_session'];
    }
    $data = curl_post($arr);
    echo "1";
}elseif($act == "zhu"){
    //个人主页,用户登录以后才可以进入
    if(!($_SESSION['uid'] > 0)){
        header("location:./grzx.php?act=index");
    }
    $title = "个人中心";
    $arr4['i_mid']='246';
    $arr4['s_session']=$_SESSION['s_session'];
    $data4=curl_post($arr4);
   /* print_r($arr4);
    echo '##############';
    print_r($data4);
    echo '#################';*/
    $data4=json_decode($data4,true);
    /*print_r($data4);
    echo '#################';*/
    $data4=json_decode($data4['as_shop'],true);
    //print_r($data4);
    include_once "./template/myinfo.html";
}elseif($act == "bottom"){
    /*
     * 显示个人中心的页面底部
     */
    include_once "./template/bottom.html";
}elseif($act == "grzx"){
    /*
     * 进入个人资料页面
     */
    if(!($_SESSION['uid'] > 0)){
        header("location:./grzx.php?act=index");
    }
    $title = "个人资料";
    include_once "./template/ownziliao.html";
}
/**
 * 这个方法主要用于修改用户的个人信息
 */
elseif($act == "xiugai"){
    $mm = $_REQUEST['mm'];//修改类型
    $va = $_REQUEST['va'];//修改内容
    $arr['i_mid'] = "60";
    $arr['s_pic'] = $_SESSION['s_face_pic'];
    if($mm == 1){
        //修改用户名
        $arr['s_nickname'] = $va;
    }else{
        $arr['s_nickname'] = $_SESSION['s_nickname'];
    }
    if($mm == 3){
        //修改邮箱
        $arr['s_email'] = $va;
    }else{
        $arr['s_email'] = $_SESSION['s_email'];
    }
    if($mm == 5){
        //修改qq
        $arr['i_qq'] = $va;
    }else{
        $arr['i_qq'] = $_SESSION['s_qq'];
    }
    if($mm == 6){
        //修改性别
        $arr['i_sex'] = intval($va);
    }else{
        $arr['i_sex'] = $_SESSION['i_sex'];
    }
    $arr['s_session'] = $_SESSION['s_session'];
    // $arr['i_sex'] = 0;
    $data = curl_post($arr);
    $data = json_decode($data, true);
    if($data['i_sta'] == "1"){
        //说明修改成功
        if($mm == 1){
            //修改用户名
            $_SESSION['s_nickname'] = $va;
        }
        if($mm == 3){
            //修改邮箱
            $_SESSION['s_email'] = $va;
            $arr1['i_mid'] = 61;
            $arr1['s_email'] = $va;
            $arr1['s_session'] = $_SESSION['s_session'];
            $data1 = curl_post($arr1);
            $data1 = json_decode($data1, true);
        }
        if($mm == 5){
            //修改qq
            $_SESSION['s_qq'] = $va;

        }
        if($mm == 6){
            //修改性别
            $_SESSION['i_sex'] = $va;
        }
    }else{
       echo "数据填写有误";
    }


}elseif($act == "safeset"){
    /**
     * 这个方法主要用于进行安全设置
     */
    if(!($_SESSION['uid'] > 0)){
        header("location:./grzx.php?act=index");
    }
    if(isset($_POST['sub'])){
        
        $arr['i_mid'] = 58;
        $arr['s_phone'] = $_SESSION['s_phone'];//手机号码
        $arr['s_code'] = $_POST['code'];//验证码
        $arr['s_old_password'] = base64_encode('0000000000');//旧密码
        $arr['s_new_password'] = $_POST['pasw'];//新密码
        $arr['s_session'] = $_SESSION['s_session'];
        $shuju = curl_post($arr);
        $shuju = json_decode($shuju,true);
        if($shuju['i_sta'] == "1"){
            //说明修改成功
            echo json_encode(array("stat"=>1));

        }else{
            //说明修改失败
            echo json_encode(array("stat"=>0,"err"=>$shuju['s_err']));

        }
    }else{
        //说明没有提交
        $title = "安全设置";
        $_SESSION['yzm'] =  $_SESSION['yzm'] = tjyz();
        include_once "./template/safeset.html";
    }

}elseif($act == "dibu"){
    include_once "./template/daohang.html";
}elseif($act == "reg_code"){
    //获取注册的验证码
    $arr['i_mid'] = 2;
    $arr['s_code'] = $_POST['s_code'];
    $arr['s_mobile'] = $_POST['s_mobile'];
    $arr['s_password'] = $_POST['s_password'];
    $arr['i_kind'] = $_POST['i_kind'];
    $shuju = curl_post($arr);
    $shuju = json_decode($shuju,true);
    if($shuju['i_sta'] == "1"){
        //说明注册成功
        $arr = array("stat"=>1,"err"=>"注册成功");
        tongji($i_loginNum=0,$i_regNum=1,$i_eventNum=0,$i_serviceNum=0,$i_applyNum=0,$i_newsNum=0,$i_projectNum=0,$i_liveNum=0);
        echo json_encode($arr);
    }else{
        //说明修改失败
        $arr = array("stat"=>0,"err"=>$shuju['s_err']);
        echo json_encode($arr);
    }
}elseif($act == "nobangding"){
    /**
     * 实现取消绑定的功能
     */
        $sql = new model();
        $sql->nobang();
        $openid = $_SESSION['openid'];
        session_unset();
    $_SESSION['openid'] = $openid;
        header("location:./index.php");

}
