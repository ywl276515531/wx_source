<?php
/*
 * 程序首页
 */
include_once "./init.php";
include_once "./function/fc.php";
include_once "./function/sql.php";
tongji($i_loginNum=0,$i_regNum=0,$i_eventNum=0,$i_serviceNum=1,$i_applyNum=0,$i_newsNum=0,$i_projectNum=0,$i_liveNum=0);
$act = isset($_REQUEST['act']) ? $_REQUEST['act'] : "index";
$beforeurl='http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
if($act == "index"){
    $title = "服务超市";
    //获取促销商品
    $arr['i_mid'] = "213";
    $data = curl_post($arr);
    $data = json_decode($data, true);
    if(count($data) > 0){
     $ss = json_decode($data['as_list'], true);
        //要处理一下价格
        $cuxiao = price_del($ss);
    }

    //进行服务大厅数据的处理
    //获取租赁服务
    $arr2['i_mid'] = "211";
    $data2 = curl_post($arr2);
    $data2 = json_decode($data2, true);
    $zlfw = json_decode($data2['aas_region_res'], true);//租赁服务的相关数据
    $fwdt = json_decode($data2['aas_goods_res'], true);//服务大厅的相关数据
    //要处理一下价格
    $fwdt = price_del($fwdt);
    include_once "./template/service_mask.html";
}elseif($act == "detail"){
    /*
     * 获取服务的详细信息
     * i_id代表服务的ID
     */
    $id=check_input($_REQUEST['i_id']);
    $arr['i_mid'] = "75";    
    $arr['i_id'] = $id;//服务商品的ID
    if($arr['i_id'] == ''){
        header("location:./serviceshop.php");
        exit;
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
    $shuju = json_decode($data['aas_result'], true);
    //必须判定一下价格
    $mtime = time();
    if($mtime >= $shuju[0]['i_promote_time_start'] && $mtime <= $shuju[0]['i_promote_time_end']){
        //有促销价
        $shuju[0]['pro_price'] = $shuju[0]['i_promote_price']/100;
    }else{
        $shuju[0]['pro_price'] = "暂无";
    }
    $shuju[0]['shop_price'] = $shuju[0]['i_price']/100;
    $fwxq = base64_decode($shuju[0]['s_note']);//服务详情
    //$fwxq = preg_replace('/".*\/uploads\//', '"http://www.wfyizhan.com/uploads/', $fwxq); //-----删除<style></style>和中间的部分
   // $fwxq = str_replace("/uploads/","http://www.wfyizhan.com/uploads/",$fwxq);
    //需要获取一下店铺信息
    $arr1['i_mid'] = "86";
    $arr1['i_id'] = $shuju[0]['i_sid'];
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    $shop_detail = json_decode($data1['aas_result'], true);//店铺的详细信息
    $userShopId = $shop_detail[0]['i_uid'];//店铺发布者id
    //获取服务评论
    $arr2['i_mid'] = "98";
    $arr2['i_gid'] = $id;
    $arr2['i_page'] = 1;
    $arr2['i_count'] = 4;
    $arr2['i_comment'] = 0;
    $data2 = curl_post($arr2);
    $data2 = json_decode($data2, true);
    $i_counts = $data2['i_counts'];//评论总条数
    $plsl = json_decode($data2['aas_result'], true);//获取评论的相关信息
    //判断用户是否搜藏
    if($_SESSION['uid'] > 0){
        $arr5['i_mid'] = 174;
        $arr5['s_mod'] = "service";
        $arr5['i_id'] = $id;
        $arr5['s_session'] = $_SESSION['s_session'];
        $data5 = curl_post($arr5);
        $data5 = json_decode($data5, true);
        if($data5['i_sta'] == 1){
            $i_favorite_sta = $data5['i_favorite_sta'];//查看自己是否搜藏
        }else{
            $i_favorite_sta = 0;
        }
    }else{
        $i_favorite_sta = 0;
    }

    include_once "./template/service_detail.html";
}elseif($act == "shopdetail"){
    //主要适用于进入店铺
    $id = $_REQUEST['id'];
    //需要获取一下店铺信息
    $arr1['i_mid'] = "86";
    $arr1['i_id'] = $id;
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    $shop_detail = json_decode($data1['aas_result'], true);//店铺的详细信息
    $zhiliang = sprintf("%.2f",$shop_detail['0']['i_score_quality']/100);//质量
    $taidu = sprintf("%.2f",$shop_detail['0']['i_score_service']/100,2);//态度
    $spee = sprintf("%.2f",$shop_detail['0']['i_score_work']/100,2);//工作速度评价
    $s_note = base64_decode($shop_detail['0']['s_note']);
    $s_note = preg_replace('/".*\/uploads\//', '"http://www.wfyizhan.com/uploads/', $s_note); //-----删除<style></style>和中间的部分
    //$s_note = str_replace("/uploads/","http://www.wfyizhan.com/uploads/",$s_note);
    //获取店铺发布的所有服务-87：
    $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
    $arr4['i_mid'] = 87;
    $arr4['i_id'] = $id;
    $arr4['i_type'] = '';
    $arr4['i_page'] = $page;
    $arr4['i_count'] = '8';
    $arr4['i_kind'] = '';
    $arr4['i_orderPrice'] = '';
    $arr4['i_sell'] = '';
    $arr4['i_time'] = '';
    $arr4['i_price_start'] = '';
    $arr4['i_price_end'] = '';
    $arr4['i_promote'] = '0';
    $arr4['s_address'] = '';
    $arr4['i_positive_num'] = '1';
    $data4 = curl_post($arr4);
    $data4 = json_decode($data4,true);
   if($data4['i_sta'] == 1){
       $cp = json_decode($data4['aas_result'],true);
       $mtime = time();
       foreach($cp as $key=>$v){
           //判定价格
           if($mtime >= $v['i_promote_time_start'] && $mtime <= $v['i_promote_time_end']){
               //有促销价
               $cp[$key]['price'] = $v['i_promote_price']/100;
           }else{
               $cp[$key]['price'] = $v['i_price']/100;
           }
       }
   }
    $arr = array("","class='hou frist'","class='hou'","class='frist'","class='hou'","class='hou frist'");
    if($page == 1){
        include_once "./template/home.html";
    }else{
        include_once "./template/post7.html";
    }

}

elseif($act == "buyservice"){
    if(!($_SESSION['uid'] > 0)){
        header("location:./grzx.php?act=index");
    }
//购买什么
    if(isset($_POST['sub'])){
        $arr['i_mid'] = 209;
        $arr['i_id'] = check_input($_POST['id']);
        $arr['s_phone'] = $_SESSION['s_phone'];
        $arr['s_realname'] = $_SESSION['s_nickname'];
        $arr['s_realname'] = $_SESSION['s_nickname'];
        $arr['s_content'] = base64_encode($_POST['s_content']);
        $arr['ads_attach'] = '';
        $arr['s_session'] = $_SESSION['s_session'];
        $pp = curl_post($arr);
        $pp = json_decode($pp,true);
        if($pp['i_sta']=='-1') {
             $_SESSION['beforeurl']=$beforeurl;
             $_SESSION['uid']=0;
             echo '<script type="text/javascript">';
             echo "alert('你的账号在异地登录,请重新登陆,并修改密码！');window.location.href ='./grzx.php'";
             echo '</script>';           
             die();
         }
        $s_sn = $pp['s_sn'];
        $money = $_POST['money'];//单位是元
//        $url = "location:./wxPay/pay/jsapi.php?order_id=".$s_sn."&money=".$money;
//        header($url);
        $shopname = $_POST['shopname'];//商品名称
        $signarr = array("order_id"=>$s_sn,"money"=>$money);
        $newss = encryption($signarr);
        $url = "location:./serviceshop.php?act=choosepay&shopname=".$shopname.$newss;
        header($url);
    }else{
        $id = check_input($_REQUEST['id']);//服务id
        $arr['i_mid'] = "75";
        $arr['i_id'] = $id;//服务商品的ID
        if($arr['i_id'] == ''){
            header("location:./serviceshop.php");
            exit;
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
        $shuju = json_decode($data['aas_result'], true);
        //必须判定一下价格
        $mtime = time();
        if($mtime >= $shuju[0]['i_promote_time_start'] && $mtime <= $shuju[0]['i_promote_time_end']){
            //有促销价
            $shuju[0]['pro_price'] = $shuju[0]['i_promote_price']/100;
        }else{
            $shuju[0]['pro_price'] = $shuju[0]['i_price']/100;
        }
        $shuju[0]['shop_price'] = $shuju[0]['i_price']/100;
        //需要获取一下店铺信息
        $arr1['i_mid'] = "86";
        $arr1['i_id'] = $shuju[0]['i_sid'];
        $data1 = curl_post($arr1);
        $data1 = json_decode($data1, true);
        $shop_detail = json_decode($data1['aas_result'], true);//店铺的详细信息

        include_once "./template/goumai.html";
    }
}elseif($act == 'choosepay'){
    if(!($_SESSION['uid'] > 0)){
        header("location:./grzx.php?act=index");
    }
    if(isset($_POST['sub']) && $_POST['yzm'] == $_SESSION['tjyz']){
        unset($_SESSION['tjyz']);
        $s_sn = $_POST['s_sn'];//订单号
        $is_check = isset($_POST['is_check'])?$_POST['is_check']:0;//是否使用优惠券
        if($is_check == '1'){
            $yhj = isset($_POST['yhj'])?$_POST['yhj']:0;//优惠券
            $yhj = $yhj;
        }else{
            $yhj = 0;//优惠券
        }
        $i_cash = $_POST['money'];
        $i_cash = $i_cash - $yhj;
        $payway = $_POST['payway'];//支付方式,1代表余额支付,2代表微信支付
        if($payway == 1){
            //说明使用余额的方式支付
            $arr3['i_mid'] = 109;
            $arr3['s_sn'] = $s_sn;
            $arr3['i_cash'] = $i_cash;
            $arr3['i_coupon'] = $yhj;
            $arr3['s_session'] = $_SESSION['s_session'];
            $data = curl_post($arr3);
            $data = json_decode($data,true);
            if($data['i_sta'] == 1){
                header("location:./grzx.php?act=zhu");
            }else{
                die($data['s_err']);
            }
        }elseif($payway == 2){
            //使用微信支付
            $url = "location:./wxPay/pay/jsapi.php?order_id=".$s_sn."&money=".$i_cash."&yhj=".$yhj."&shopname=".$_REQUEST['shopname'];
            header($url);
        }
    }else{
        $signarr = array("order_id"=>$_REQUEST['order_id'],"money"=>$_REQUEST['money']);
        $sign = $_REQUEST['sign'];
        $myyz = uncryption($signarr,$sign);
        if(!$myyz){
            header("location:./index.php");
            exit();
        }

        //选择支付方式
        /********************获取用户余额和服务卷余额***************************/
        $arr['i_mid'] = 362;
        $arr['id'] =  $_SESSION['uid'];//用户id
        $data = curl_post($arr);
        $data = json_decode($data, true);
        $s_content = json_decode($data['s_content'], true);
        $i_cash = $s_content['i_cash'];//用户余额(单位分)
        $i_coupon = $s_content['i_coupon']+$s_content['i_coupon2'];//优惠券余额(单位分)
        /**************************获取订单s_sn和订单价格*****************************/
        $s_sn = $_REQUEST['order_id'];
        $money = $_REQUEST['money'];



        $_SESSION['tjyz'] = tjyz();
        $shopname = $_REQUEST['shopname'];
    }

    include_once "./template/choosepay.html";
}



elseif($act == "morepl"){
    //获取一个产品的更多的评论
    $id = isset($_REQUEST['id']) ? check_input($_REQUEST['id']) : '';
    $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : '1';

    if($id == ''){
        header("location:./serviceshop.php");
        exit;
    }
    //获取服务评论
    $arr2['i_mid'] = "98";
    $arr2['i_gid'] = $id;
    $arr2['i_page'] = $page;
    $arr2['i_count'] = 8;
    $arr2['i_comment'] = 0;
    $data2 = curl_post($arr2);
    $data2 = json_decode($data2, true);
    if($data2['i_sta']=='-1') {
        $_SESSION['beforeurl']=$beforeurl;
        $_SESSION['uid']=0;
        echo '<script type="text/javascript">';
        echo "alert('你的账号在异地登录,请重新登陆,并修改密码！');window.location.href ='./grzx.php'";
        echo '</script>';           
        die();
    }
    $i_counts = $data2['i_counts'];//评论总条数
    $plsl = json_decode($data2['aas_result'], true);//获取评论的相关信息
    if($page > 1){
        include_once "./template/mmpingjia.html";
    }else{
        include_once "./template/pingjia.html";
    }

}elseif($act == "morecx") {
    /*
     * 获取更多的促销的产品
     */

    $title = "服务大厅";
    $cx = isset($_GET['cx']) ? $_GET['cx']:0;//是否促销1代表是,0代表全部
    $tt1 = isset($_REQUEST['tt1']) ? $_REQUEST['tt1'] : 1;//（）
    $all_type = isset($_REQUEST['all_type']) ? $_REQUEST['all_type'] : '%';//服务类型
    $di = isset($_REQUEST['di']) ? $_REQUEST['di'] : '';//低价格
    $gao = isset($_REQUEST['gao']) ? $_REQUEST['gao'] : '';//高价格
    $sheng = isset($_REQUEST['province']) ? $_REQUEST['province'] : '0';//省
    $city = isset($_REQUEST['city']) ? $_REQUEST['city'] : '0';//市
    $ss = isset($_REQUEST['ss']) ? $_REQUEST['ss'] : '0';//0代表没有搜索
    $kind = isset($_REQUEST['kind']) ? $_REQUEST['kind'] : '1';//1代表搜索搜索条件收缩
    //查询所有的服务类型
        $arr4['i_mid'] = 85;
        $data4 = curl_post($arr4);
        $data4 = json_decode($data4, true);
        if($data4['i_sta'] == 1){
            $fuwu_type = json_decode($data4['aas_result'], true);
        }
    //获取所有城市的相关信息
    $arr5['i_mid'] = "82";
    $data5 = curl_post($arr5);
    $data5 = json_decode($data5, true);
    if($data5['i_sta'] == "1"){
        $province = json_decode($data5['aas_result'], true);
        $shi = array();
        foreach($province as $key=>$v){
            if($v['level'] == 2 && $v['upid'] == $sheng){
                $shi[] = $v;
            }
        }
        foreach($province as $key=>$v){
            if($v['level'] != 1){
                unset($province[$key]);
            }
        }
    }
        //没有搜索条件
    if($ss == 0){
        $arr1['i_mid'] = "78";
        $arr1['i_type'] = $all_type;
        if($sheng != 0){
            $diqu = $sheng;
            if($city != 0){
                $diqu .= "_".$city;
            }
        }else{
            $diqu = "%";
        }
        $arr1['s_address'] = $diqu;
        $arr1['s_key'] = '';
        $arr1['i_page'] = "1";
        $arr1['i_count'] = "12";
        $arr1['i_promote'] = $cx;
        if($di >= 0){
            $arr1['i_price_start'] = $di*100;
        }else{
            $arr1['i_price_start'] = 0;
        }
        if($gao >= 0){
            $arr1['i_price_end'] = $gao*100;
        }else{
            $arr1['i_price_end'] = 0;
        }

        if($tt1 == 3){
            //升序排列
            $arr1['i_order_price'] = "0";
        }elseif($tt1 == "-3"){
            //降序排列
            $arr1['i_order_price'] = "1";
        }else{
            $arr1['i_order_price'] = "-1";
        }

        if($tt1 == 2){
            //升序排列
            $arr1['i_sell_num'] = "1";
        }elseif($tt1 == "-2"){
            //降序排列
            $arr1['i_sell_num'] = "0";
        }else{
            $arr1['i_sell_num'] = "-1";
        }

        $arr1['i_kind'] = "0";
        if($tt1 == 1 || $tt1 == 5){
            //综合降序
            $arr1['i_time'] = "1";
        }else{
            //综合升序
            $arr1['i_time'] = "0";
        }
        if($tt1 == 4){
            //降序评论
            $arr1['i_positive_num'] = "1";
        }else{
            $arr1['i_positive_num'] = "-1";
        }

        $data1 = curl_post($arr1);
        $data1 = json_decode($data1, true);
        $fwdt = json_decode($data1['aas_result'], true);
        $fwdt = price_del($fwdt);
    }else{
        //需要搜索
        $search = $_POST['search'];
        $arr['i_mid'] = 314;
        $arr['s_scope'] = "service_goods";
        $arr['s_key'] = $search;
        $arr['i_page'] = "1";
        $arr['i_count'] = "100";
        $data1 = curl_post($arr);
        $data1 = json_decode($data1, true);
        if($data1['i_sta'] == 1){
            $fwdt = json_decode($data1['aas_result'], true);//活动的具体数据
            $fwdt = price_del($fwdt);
        }
    }
    $class_my = array(0=>'class="hou frist"',"1"=>"","2"=>"class='hou frist'",3=>"class=hou",4=>"class=frist",5=>'class="hou"');
    include_once "./template/shaiselect.html";
}elseif($act == "getmorecx"){
    //通过ajax获取数据
    $tt1 = isset($_REQUEST['tt1']) ? $_REQUEST['tt1'] : 1;//（0:全部，1:促销，2：其余）
    $all_type = isset($_REQUEST['all_type']) ? $_REQUEST['all_type'] : '%';//服务类型
    $di = isset($_REQUEST['di']) ? $_REQUEST['di'] : '0';//低价格
    $gao = isset($_REQUEST['gao']) ? $_REQUEST['gao'] : '10000000';//高价格
    $sheng = isset($_REQUEST['province']) ? $_REQUEST['province'] : '0';//省
    $city = isset($_REQUEST['city']) ? $_REQUEST['city'] : '0';//市
    $page = $_REQUEST['i_page'];

    $arr1['i_mid'] = "78";
    $arr1['i_type'] = $all_type;
    $arr1['s_key'] = '';
    if($sheng != 0){
        $diqu = $sheng;
        if($city != 0){
            $diqu .= "_".$city;
        }
    }else{
        $diqu = "%";
    }
    $arr1['s_address'] = $diqu;
    $arr1['i_page'] = $page;
    $arr1['i_count'] = "12";
    if($tt1 == 1 ){
        $arr1['i_promote'] = "0";
    }elseif($tt1 == 4){
        $arr1['i_promote'] = "1";
    }else{
        $arr1['i_promote'] = "0";
    }

    $arr1['i_price_start'] = $di*100;
    $arr1['i_price_end'] = $gao*100;
    if($tt1 == 3){
        $arr1['i_order_price'] = "0";
    }else{
        $arr1['i_order_price'] = "-1";
    }

    if($tt1 == 2){
        $arr1['i_sell_num'] = "1";
    }else{
        $arr1['i_sell_num'] = "0";
    }

    $arr1['i_kind'] = "0";
    $arr1['i_time'] = "1";
    $arr1['i_positive_num'] = "1";
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    $fwdt = json_decode($data1['aas_result'], true);
    $fwdt = price_del($fwdt);
    $class_my = array(0=>'class="hou frist"',"1"=>"","2"=>"class='hou frist'",3=>"class=hou",4=>"class=frist",5=>'class="hou"');
    include_once "./template/getmorecx.html";
}

elseif($act == "zlfw"){
    /*
     * 显示租赁服务的相关具体信息
     */
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : "";
    if($id == ''){
        header("location:./serviceshop.php");
        exit;
    }
    $arr['i_mid'] = 180;
    $arr['i_module'] = "%";
    $arr['i_id'] = check_input($id);
    $data = curl_post($arr);
    $data = json_decode($data, true);
    $jdxq = json_decode($data['as_result'], true);
    $jdxq[0]['das_pics'] = json_decode($jdxq[0]['das_pics'], true);
    $jdxq[0]['s_info'] = base64_decode($jdxq[0]['s_info']);
    $s_position = explode(",",$jdxq[0]['s_position']);
    //场地详情
    $arr1['i_mid'] = 192;
    $arr1['i_id'] = $id;
    $arr1['i_page'] = 1;
    $arr1['i_pageSize'] = 100;
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);

    if($data1['i_sta'] == 1){
        $cdxq = json_decode($data1['as_room'], true);
        foreach($cdxq as $key=>$v){
            $cdxq[$key]['s_room'] =  base64_decode($v['s_room']);
            $cdxq[$key]['as_pics'] =  json_decode($v['as_pics'],true);
        }
    }else{
        $cdxq = array();
    }
    //# ["五星级豪华酒店","四星级高档酒店","三星级舒适酒店","经济型酒店","会展/会议中心","商务写字楼","会所/俱乐部","度假村/农家乐","酒吧/KTV","咖啡厅/茶楼","体育场馆"]

    $mytype=array('五星级豪华酒店','四星级高档酒店','三星级舒适酒店','经济型酒店','会展/会议中心',
        '商务写字楼','会所/俱乐部','度假村/农家乐','酒吧/KTV','咖啡厅/茶楼','体育场馆');
    include_once "./template/zulin_detail.html";

}elseif($act == "morezlfw"){
    $is_submit = isset($_REQUEST['is_submit']) ? $_REQUEST['is_submit'] : '';
    if($is_submit == ""){
        $price = '';
        $start_time = '';
        $end_time = '';
        $rs = '';
        $arr['i_mid'] = 178;
        $arr['i_page'] = 1;
        $arr['i_page_size'] = 8;
        $arr['i_number'] = "-1";
        $arr['i_start_time'] = "1";
        $arr['i_end_time'] = "222222222";
        $arr['i_price'] = "-1";
        $data = curl_post($arr);
        $data = json_decode($data, true);
        if($data['i_sta'] == "1"){
            $shuju = json_decode($data['as_region'],true);
        }else{
            $shuju = array();
        }
    }elseif($is_submit == "1"){
        $start_time = isset($_REQUEST['start_time']) ? $_REQUEST['start_time'] : '';//开始时间
        $end_time = isset($_REQUEST['end_time']) ? $_REQUEST['end_time'] : '';//结束时间
        $rs = isset($_REQUEST['rs']) ? $_REQUEST['rs'] : '';//会议人数
        $price = isset($_REQUEST['price']) ? $_REQUEST['price'] : '';//多少钱每天
        $mymy = array("全部",'30人以下','30-60人','60-100人','100-200人','200-300人','300-500人','500人以上','全部','2000元以下/天','2000-4000元/天',
            '4000-6000元/天','6000-8000元/天','8000-10000元/天','10000-20000元/天','20000-40000元/天');
        if($start_time != ''){
            $arr['i_start_time'] = strtotime($start_time);
        }else{
            $arr['i_start_time'] = 1;
        }
        if($end_time != ''){
            $arr['i_end_time'] = strtotime($end_time);
        }else{
            $arr['i_end_time'] = "222222222";
        }
        if($rs == ""){
            $arr['i_number'] = "-1";
        }else{
            if($rs == 0){
                $arr['i_number'] = "-1";
            }elseif($rs == "1"){
                $arr['i_number'] = "0";
            }elseif($rs == 2){
                $arr['i_number'] = "1";
            }elseif($rs == 3){
                $arr['i_number'] = "2";
            }elseif($rs == 4){
                $arr['i_number'] = "3";
            }elseif($rs == 5){
                $arr['i_number'] = "4";
            }elseif($rs == 6){
                $arr['i_number'] = "5";
            }elseif($rs == 7){
                $arr['i_number'] = "6";
            }
        }
        if($price == ''){
            $arr['i_price'] = "-1";
        }else{
            if($price == '8'){
                $arr['i_price'] = "-1";
            }elseif($price == '9'){
                $arr['i_price'] = "0";
            }elseif($price == '10'){
                $arr['i_price'] = "1";
            }elseif($price == '11'){
                $arr['i_price'] = "2";
            }elseif($price == '12'){
                $arr['i_price'] = "3";
            }elseif($price == '13'){
                $arr['i_price'] = "4";
            }elseif($price == '14'){
                $arr['i_price'] = "5";
            }elseif($price == '15'){
                $arr['i_price'] = "6";
            }
        }
        $arr['i_mid'] = 178;
        $arr['i_page'] = 1;
        $arr['i_page_size'] = 8;
        $data = curl_post($arr);
        $data = json_decode($data, true);
        if($data['i_sta'] == "1"){
            $shuju = json_decode($data['as_region'],true);
        }else{
            $shuju = array();
        }
    }

    include_once "./template/zulin_service.html";
}elseif($act == "checktime"){
    //判定时间
    $time = $_POST['time'];
    $xz = strtotime($time);
    $qq = strtotime(date("Y-m-d",time()));
    $qq = $qq+24*60*60+20;
    if($qq > $xz ){
        //说明时间错误
        echo "1";
    }else{
        echo "2222";
    }
}
elseif($act == "postzulin"){
    //加载更多的内容

    $start_time = isset($_REQUEST['start_time']) ? $_REQUEST['start_time'] : '';//开始时间
    $end_time = isset($_REQUEST['end_time']) ? $_REQUEST['end_time'] : '';//结束时间
    $rs = isset($_REQUEST['rs']) ? $_REQUEST['rs'] : '';//会议人数
    $price = isset($_REQUEST['price']) ? $_REQUEST['price'] : '';//多少钱每天
    $mymy = array("全部",'30人以下','30-60人','60-100人','100-200人','200-300人','300-500人','500人以上','全部','2000元以下/天','2000-4000元/天',
        '4000-6000元/天','6000-8000元/天','8000-10000元/天','10000-20000元/天','20000-40000元/天');
    if($start_time != ''){
        $arr['i_start_time'] = strtotime($start_time);
    }else{
        $arr['i_start_time'] = 1;
    }
    if($end_time != ''){
        $arr['i_end_time'] = strtotime($end_time);
    }else{
        $arr['i_end_time'] = "222222222";
    }
    if($rs == ""){
        $arr['i_number'] = "-1";
    }else{
        if($rs == 0){
            $arr['i_number'] = "-1";
        }elseif($rs == "1"){
            $arr['i_number'] = "0";
        }elseif($rs == 2){
            $arr['i_number'] = "1";
        }elseif($rs == 3){
            $arr['i_number'] = "2";
        }elseif($rs == 4){
            $arr['i_number'] = "3";
        }elseif($rs == 5){
            $arr['i_number'] = "4";
        }elseif($rs == 6){
            $arr['i_number'] = "5";
        }elseif($rs == 7){
            $arr['i_number'] = "6";
        }
    }
    if($price == ''){
        $arr['i_price'] = "-1";
    }else{
        if($price == '8'){
            $arr['i_price'] = "-1";
        }elseif($price == '9'){
            $arr['i_price'] = "0";
        }elseif($price == '10'){
            $arr['i_price'] = "1";
        }elseif($price == '11'){
            $arr['i_price'] = "2";
        }elseif($price == '12'){
            $arr['i_price'] = "3";
        }elseif($price == '13'){
            $arr['i_price'] = "4";
        }elseif($price == '14'){
            $arr['i_price'] = "5";
        }elseif($price == '15'){
            $arr['i_price'] = "6";
        }
    }
    $arr['i_mid'] = 178;
    $arr['i_page'] = $_POST['i_page'];
    $arr['i_page_size'] = 8;
    $data = curl_post($arr);
    $data = json_decode($data, true);
    if($data['i_sta'] == "1"){
        $shuju = json_decode($data['as_region'],true);
    }
    include_once "./template/postzulin.html";
}

elseif($act == "huiyi"){
    /*
     * 查看会议室详情
     */
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';//会议室id
    if($id == ''){
        tzym("./serviceshop.php","正在跳转");
    }
    $arr1['i_mid'] = 192;
    $arr1['i_id'] = $_REQUEST['zid'];//酒店id
    $arr1['i_page'] = 1;
    $arr1['i_pageSize'] = 20;
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    if($data1['i_sta'] == 1){
        $cdxq = json_decode($data1['as_room'], true);
        foreach($cdxq as $key=>$v){
            $cdxq[$key]['s_room'] =  base64_decode($v['s_room']);
            $cdxq[$key]['as_pics'] =  json_decode($v['as_pics'],true);
        }
    }else{
        $cdxq = array();
    }
    include_once "./template/yuding.html";
}elseif($act == "zulin_yuding"){
    if(isset($_POST['sub'])){
        $arr['i_mid'] = 175;
        $arr['s_phone'] = $_POST['phone'];
        $arr['s_realname'] = $_POST['name'];
        $arr['i_meeting_room_id'] = $_POST['id'];
        print_r($_POST);
        $time = $_POST['sTime'];
        $app1 = array();
        $app = explode(",",$time);
        foreach ($app as $key => $value) {
            $value = strtotime($value);
           $app1[] = date("Ymd",$value)."0";
        }
        $arr['as_meeting_reserve'] = json_encode($app1);
        $arr1 = array(1,1,1,1,1,1,1,1,1,1,1);
        $arr['ai_idxRegionEquipment'] = json_encode($arr1);
        $arr1 = array(1,1,1,1,1,1,1,1,1,1,1,1);
        $arr['ai_idxEquipment'] = json_encode($arr1);
        $arr['i_meeting_number'] = $_POST['man'];
        $arr['s_note'] = base64_encode($_POST['bz']);
        $arr['s_session'] = $_SESSION['s_session'];
        $data = curl_post($arr);
        $data = json_decode($data,true);
        if($data['i_sta']=='-1') {
              $_SESSION['beforeurl']=$beforeurl;
              $_SESSION['uid']=0;
              echo '<script type="text/javascript">';
              echo "alert('你的账号在异地登录,请重新登陆,并修改密码！');window.location.href ='./grzx.php'";
              echo '</script>';           
              die();
        }
        $s_sn = $data['s_sn'];
        $url = "location:/11/zulin.php?act=zhu";
        header($url);
    }else{
        //钻门用于预定会议室
        $id = $_REQUEST['id'];//会议室id
        $zid = htmlspecialchars($_REQUEST['zid']);//酒店id
        //酒店相关信息
        $arr['i_mid'] = 180;
        $arr['i_module'] = "0";
        $arr['i_id'] =  $zid;
        $data = curl_post($arr);
        $data = json_decode($data, true);
        $jdxq = json_decode($data['as_result'], true);

        //会议室相关信息
        $arr1['i_mid'] = 192;
        $arr1['i_id'] = $zid;//酒店id
        $arr1['i_page'] = 1;
        $arr1['i_pageSize'] = 110;
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
            $cdxq = json_decode($data1['as_room'], true);
            foreach($cdxq as $key=>$v){
                $cdxq[$key]['s_room'] =  base64_decode($v['s_room']);
                $cdxq[$key]['as_pics'] =  json_decode($v['as_pics'],true);
            }
        }
        //获取会议室已经被预定的时间
        $arr3['i_mid'] = 200;
        $arr3['i_id'] = $id;
        $arr3['s_time'] = time();
        $data3 = curl_post($arr3);
        $data3 = json_decode($data3, true);
        //$as_days = json_decode($data3['as_days'], true);
        include_once "./template/zulin_yuding.html";

    }
}elseif($act == "picture"){
    /*
     * 显示会议室相册
     */
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';//会议室id
    if($id == ''){
        tzym("./serviceshop.php","正在跳转");
    }
    $arr1['i_mid'] = 192;
    $arr1['i_id'] = $_REQUEST['zid'];//酒店id
    $arr1['i_page'] = 1;
    $arr1['i_pageSize'] = 100;
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
        $cdxq = json_decode($data1['as_room'], true);
        foreach($cdxq as $key=>$v){
            $cdxq[$key]['s_room'] =  base64_decode($v['s_room']);
            $cdxq[$key]['as_pics'] =  json_decode($v['as_pics'],true);
        }
    }else{
        $cdxq = array();
    }
    include_once "./template/xianchang.html";
}elseif($act == "getcity"){
    //获取城市
    $arr5['i_mid'] = "82";
    $data5 = curl_post($arr5);
    $data5 = json_decode($data5, true);
    if($data5['i_sta'] == "1"){
        $province = json_decode($data5['aas_result'], true);
        foreach($province as $key=>$v){
            if($v['upid'] != $_REQUEST['id']){
                unset($province[$key]);
            }
        }
    }
    include_once "./template/city.html";
}
