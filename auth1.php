<?php
session_start();
if(isset($_GET['code'])){
    //获取code
    $code = $_GET['code'];
    include "./curl.php";
    //根据获取的code来获取用户的openid和网页的access_token,不是基础支持的access_token
    $url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx26becdd195c0599b&secret=d40ab8254dedcbd740934480e17b5c97&code={$code}&grant_type=authorization_code";
    $shuju = curl_get($url);
    $arr = json_decode($shuju,true);
    $access_token = $arr['access_token'];//网页端德access_token
    $openid = $arr['openid'];//用户的openid
    //将获取到的用户的openid存到session里面
    $_SESSION['openid'] = $openid;
    if(@$_COOKIE['openid'] != $openid){
        setcookie("openid",$openid,time()+12*60*60);
        setcookie("i_loginNum",0,time()+12*60*60);
        setcookie("i_serviceNum",0,time()+12*60*60);
        setcookie("i_regNum",0,time()+12*60*60);
        setcookie("i_eventNum",0,time()+12*60*60);
        setcookie("i_applyNum",0,time()+12*60*60);
        setcookie("i_newsNum",0,time()+12*60*60);
        setcookie("i_projectNum",0,time()+12*60*60);
        setcookie("i_liveNum",0,time()+12*60*60);
    }
    $url = "location:./index1.php?state=".$_GET['state'];
    header($url);
}else{
    echo "NO CODE";
}
?>