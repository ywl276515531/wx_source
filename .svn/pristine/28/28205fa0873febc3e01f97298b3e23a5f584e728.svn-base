<?php
/*
 * 程序首页
 */
include_once "./init.php";
include_once "./function/sql.php";
include_once "./function/fc.php";
$act = isset($_REQUEST['act']) ? $_REQUEST['act'] : "myorder";
$beforeurl=$qq = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];

if(intval($_SESSION['uid'])<1){
    header("location:./grzx.php?act=index");
    exit;
}

if($act == "myorder"){
    //进入我的订单页面
    $state = isset($_REQUEST['state']) ? $_REQUEST['state'] : 1;
    $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
    $arr['i_mid'] = 264;
    $arr['i_page'] = $page;
    $arr['i_count'] = 8;
    $arr['s_session'] = $_SESSION['s_session'];

        if($state == 1){
            $title = "全部订单";
            $arr['i_status'] = 1;
        }elseif($state == 2){
            $title = "已完成订单";
            $arr['i_status'] = 6;
        }elseif($state == 3){
            $title = "待支付订单";
            $arr['i_status'] = 2;
        }elseif($state == 4){
            $title = "已取消订单";
            $arr['i_status'] =7;
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
    if($data['i_sta'] == "1"){
        $shuju = json_decode($data['as_result'],true);
        $nowtime = time() - 24*60*60;
        foreach($shuju as $k=>$v){
            if($v['i_pay_time'] < $nowtime){
                $shuju[$k]['is_quxiao'] = 2;
            }else{
                $shuju[$k]['is_quxiao'] = 1;
            }
        }
    }
    if($page == 1){
        include_once "./template/myorder.html";
    }else{
        include_once "./template/post5.html";
    }


}elseif($act == "order_detail"){
    //显示订单的详情页面
    if(!($_SESSION['uid'] > 0)){
        header("location:./grzx.php?act=index");
    }
    $id = $_REQUEST['id'];
    $arr['i_mid'] = 264;
    $arr['i_page'] = 1;
    $arr['i_count'] = 800;
    $arr['s_session'] = $_SESSION['s_session'];
    $arr['i_status'] = 1;
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
    if($data['i_sta'] == "1"){
        $shuju = json_decode($data['as_result'],true);
        $qq = '';
        foreach($shuju as $v){
            if($v['i_id'] == $id){
                $qq = $v;
            }
        }
        $nowtime = time() - 24*60*60;
        if($qq['i_pay_time'] < $nowtime){
            $qq['is_quxiao'] = 2;
        }else{
            $qq['is_quxiao'] = 1;
        }
    }
    $arr4['i_mid'] = 96;
    $arr4['i_id'] = $qq['i_id'];
    $arr4['s_session'] = $_SESSION['s_session'];
    $ddxq = curl_post($arr4);
    $ddxq = json_decode($ddxq,true);
    $ddxq = json_decode($ddxq['aas_result'],true);
    include_once "./template/orderdetail.html";
}
elseif($act == "myact"){
    if(!($_SESSION['uid'] > 0)){
        header("location:./grzx.php?act=index");
    }
    $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
    $state = isset($_REQUEST['state']) ? htmlspecialchars($_REQUEST['state']) : 1;
    $arr['i_mid'] = 143;
    $arr['i_page'] = $page;
    $arr['i_count'] = 10;
    $arr['i_sta'] = 0;
    if($state == "1"){
        //我发布的活动
        $title = "我的发布";
        $arr['i_sta'] = 0;
        $arr1['i_sta'] = 0;
    }elseif($state == '2'){
        $title = "已经发布";
        $arr['i_sta'] = 0;
        $arr1['i_sta'] = 0;
    }elseif($state == '3'){
        $title = "已结束";
        $arr['i_sta'] = 1;
        $arr1['i_sta'] = 0;
    }elseif($state == '4'){
        $title = "有效票";
        $arr['i_sta'] = 0;
        $arr1['i_sta'] = 0;
    }elseif($state == '5'){
        $title = "等待审核";
        $arr['i_sta'] = 0;
        $arr1['i_sta'] = 1;
    }elseif($state == '6'){
        $title = "已取消";
        $arr['i_sta'] = 0;
        $arr1['i_sta'] = 2;
    }elseif($state == '7'){
        $title = "待付款";
        $arr['i_sta'] = 0;
        $arr1['i_sta'] = 3;
    }
    $arr['i_kind'] = 0;
    $arr['s_session'] = $_SESSION['s_session'];
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
    if($data['i_sta'] == '1'){
        $myfabu = $data['i_FBevent'];//我发布的个数
        $zchdgs = $data['i_KSevent'];//正常活动个数
        $jshdgs = $data['i_JSevent'];//结束活动个数
        $fabu_list = json_decode($data['aas_result'],true);//我发布的东西
        $fabu_list = pd_act($fabu_list);
    }
    //我参与的活动
    $arr1['i_mid'] = 143;
    $arr1['i_page'] = $page;
    $arr1['i_count'] = 10;
    $arr1['i_kind'] = 1;
    // $arr1['i_sta'] = 0;
    $arr1['s_session'] = $_SESSION['s_session'];
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    if($data1['i_sta'] == 1){
        //我的参与
        $myjoin = $data1['i_CYKvote'];
        //有效票
        $yxp = $data1['i_YXvote'];
        //等待审核
        $watsh = $data1['i_SHvote'];
        //待付款
        $dfkM = $data1['i_WFKvote'];
        //已取消
        $qxddM = $data1['i_QXvote'];
        //参加活动的数据集
        $join_list = json_decode($data1['aas_result'],true);

    }
    if($page == 1){
        include_once "./template/myact.html";
    }else{
        include_once "./template/post9.html";
    }

}elseif($act == "myhdxq"){
    if(!($_SESSION['uid'] > 0)){
        header("location:./grzx.php?act=index");
    }
    //获取订单的详细信息
    $id = $_REQUEST['id'];//订单id
    //我参与的活动
    $arr1['i_mid'] = 143;
    $arr1['i_page'] = 1;
    $arr1['i_count'] = 100;
    $arr1['i_kind'] = 1;
    $arr1['i_sta'] = 0;
    $arr1['s_session'] = $_SESSION['s_session'];
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    if($data1['i_sta']=='-1') {
        $_SESSION['beforeurl']=$beforeurl;
        $_SESSION['uid']=0;
        echo '<script type="text/javascript">';
        echo "alert('你的账号在异地登录,请重新登陆,并修改密码！');window.location.href ='./grzx.php'";
        echo '</script>';           
        die();
    }
    if($data1['i_sta'] == 1){
        //参加活动的数据集
        $join_list = json_decode($data1['aas_result'],true);
    }
    $detai = array();
        //有效票
      if(is_array($join_list)){
          foreach($join_list as $v){
              if($v['i_id'] == $id){
                  $detai = $v;
              }
          }

      }
    //获取二维码
    $arr5['i_mid'] = 173;
    $arr5['s_sn'] = $detai['s_sn'];
    $arr5['s_session'] = $_SESSION['s_session'];
    $data5 = curl_post($arr5);
    $data5 = json_decode($data5, true);
    $erweima = json_decode($data5['aas_result'],true);
    
    include_once './template/canyu.html';
}elseif($act == "qxdd"){
    /**
     * 这个方法主要用于取消订单
     */
    if(!($_SESSION['uid'] > 0)){
        header("location:./grzx.php?act=index");
    }
    $arr['i_mid'] = "186";
    $arr['s_sn'] = $_REQUEST['s_sn'];
    $arr['s_session'] = $_SESSION['s_session'];
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
       echo 1;
    }else{
        echo 2;
    }
}elseif($act == "scfk"){
    /**
     * 这个方法主要用于将商城的中专款付过去-----完成订单(结算)
     */
    $arr['i_mid'] = 187;
    $arr['s_sn'] = $_REQUEST['s_sn'];
    $arr['s_session'] = $_SESSION['s_session'];
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
    echo '<script type="text/javascript">';
    echo "window.location.href ='./order.php?act=myorder'";
    echo '</script>';
    // header("./order.php?act=myorder");
    // if($data['i_sta'] == 1){
    // }else{
    //     tzym("./order.php?act=myorder",$data['s_err']);
    // }
}elseif($act == "pjdd"){
    /**
     * 这个方法主要用于评价
     */
    if(!($_SESSION['uid'] > 0)){
        header("location:./grzx.php?act=index");
    }
    if(isset($_POST['sub'])){
       $arr['i_mid'] = 95;
       $arr['i_id'] = $_POST['i_id'];
       $arr['i_quality'] = $_POST['radioOrder'];
       $arr['s_quality_content'] = $_POST['s_quality_content'];
       $arr['i_score_service'] = $_POST['shop_service'];
       $arr['i_score_work'] = $_POST['shop_work'];
       $arr['i_score_quality'] = $_POST['shop_qc'];
        $arr['s_session'] = $_SESSION['s_session'];
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
            echo json_encode(array("stat"=>1));
        }else{
            echo json_encode(array("stat"=>2,"err"=>$data['s_err']));
        }
    }else{
        $i_id = $_REQUEST['i_id'];//订单id
        $title = "服务评价";
        $arr['i_mid'] = 91;
        $arr['i_page'] = 1;
        $arr['i_count'] = 100;
        $arr['s_session'] = $_SESSION['s_session'];
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
        if($data['i_sta'] == '1'){
            $shuju = json_decode($data['aas_result'],true);
            $dd = '';//这个订单的所有数据
            foreach($shuju as $key=>$v){
                if($v['i_id'] == $i_id){
                    $dd = $shuju[$key];
                }
            }
        }
        include_once "./template/mypingjia.html";
    }


}
