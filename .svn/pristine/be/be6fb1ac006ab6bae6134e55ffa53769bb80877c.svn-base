<?php
// ini_set("session.cookie_httponly", 1);
session_start();
if(!isset($_SESSION['openid'])){
    $qq = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    $qq = base64_encode($qq);
    $url = "location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx26becdd195c0599b&redirect_uri=http://weixin.wfyizhan.com/11/auth1.php&response_type=code&scope=snsapi_base&state=".$qq."#wechat_redirect";
    header($url);
}
if(!isset($_SESSION['uid']) || intval($_SESSION['uid'])<0){
    $_SESSION['uid']=0;
}
$money="";
$shopname="";
$i_coupon="";
function check_input($value)
		{
		// 去除斜杠	
		$value = stripslashes($value);		  		
		return exchang($value);
		}
function exchang($str){
   $str = str_replace("and","",$str);
   $str = str_replace("union","",$str);
   $str = str_replace("execute","",$str);
   $str = str_replace("update","",$str);
   $str = str_replace("count","",$str);
   $str = str_replace("chr","",$str);
   $str = str_replace("mid","",$str);
   $str = str_replace("master","",$str);
   $str = str_replace("truncate","",$str);
   $str = str_replace("char","",$str);
   $str = str_replace("declare","",$str);
   $str = str_replace("select","",$str);
   $str = str_replace("create","",$str);
   $str = str_replace("delete","",$str);
   $str = str_replace("insert","",$str);
   $str = str_replace("'","",$str);
   $str = str_replace('"',"",$str);
   $str = str_replace(" ","",$str);
   $str = str_replace("or","",$str);
   $str = str_replace("=","",$str);
   $str = str_replace("%20","",$str);
   return $str;
}
//ËûÍ³¼Æ´úÂë
//$tjdm =<<<TABLE
//<script>
//var _hmt = _hmt || [];
//(function() {
//  var hm = document.createElement("script");
//  hm.src = "https://hm.baidu.com/hm.js?0f41d2f9ae699ac962bfa0a7e485a3ef";
//  var s = document.getElementsByTagName("script")[0];
//  s.parentNode.insertBefore(hm, s);
//})();
//</script>
//TABLE;
//echo $tjdm;
