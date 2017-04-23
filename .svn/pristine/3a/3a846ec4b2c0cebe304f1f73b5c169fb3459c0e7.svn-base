<?php
header("Content-type:text/html;charset=utf-8");
function curl_get($url){
//    主要用于curl的get方式的传递
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_REFERER, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}
function curl_post($url,$data){
    //模拟post请求
//网址

//1.初始化
    $ch = curl_init();
//2.设置参数
//设置请求url网址
    curl_setopt($ch,CURLOPT_URL,$url);
//捕获url响应信息不输出
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
//设置请求头信息
    curl_setopt($ch,CURLOPT_HEADER,0);
//设置开启POST请求
    curl_setopt($ch,CURLOPT_POST,1);
//禁止SSL校检
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,false);
//$data代表传送的数据,可以为字符串或者数组
    curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
//3.执行curl
    $output = curl_exec($ch);
//判断是否有错误
    if($output === false){
        echo 'error:'.curl_error($ch);
    }
//4.关闭句柄
    curl_close($ch);

    return $output;

}
function top(){
    /*
     * 主要用于设置微信的菜单
     */
    //获取access_token
    $access_token = get_token();
    $data = <<<HTML
 {
     "button":[
     {
          "type":"view",
          "name":"公司官网",
          "url":"http://www.apple.com/cn//?afid=p238%7C1zhSNX8X2-dc_mtid_18707vxu38484_pcrid_7528694023_&cid=aos-cn-kwb-brand"
      },
      {
           "name":"关于我们",
           "sub_button":[
           {
               "type":"click",
               "name":"企业动态",
               "key":"V1002_GOOD"
            },
            {
               "type":"click",
               "name":"企业新闻",
               "key":"V1003_GOOD"
            },
            {
               "type":"click",
               "name":"企业简介",
               "key":"V1001_GOOD"
            }]
       }]
 }
HTML;

    $url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=".$access_token;
    var_dump(curl_post($url,$data));
}

function unicode($openid){
    /*
     * 这个方法主要用于获取用户的详细信息
     */
    $access_token = get_token();
    $url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token={$access_token}&openid={$openid}&lang=zh_CN";
    $qcc = curl_get($url);
    return $qcc;
}

function get_token(){
  /*
   *这个方法主要用于获取微信的access_token,并将它保存起来
   *如果时间没有过的话还是用老的token
   */
    $filename = "access_token.txt";
    if(file_exists("./".$filename) && (time()-filemtime("./".$filename)<7100)){
      //当缓存的access_token没有过时的时候
      $access_token = file_get_contents("./".$filename);
    }else{
      //说明没有缓存,或者缓存时间已经过期
       $access_token = json_decode(curl_get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd352324f066fc96f&secret=d4624c36b6795d1d99dcf0547af5443d"),true);
       $access_token = $access_token['access_token'];
       file_put_contents($filename, $access_token);
    }
    return $access_token;
}
?>