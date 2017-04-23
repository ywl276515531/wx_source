<?php
/*
活动交流的php页面
 */
header("Content-type: text/html; charset=utf-8");
include_once "./init.php";
include_once "./function/fc.php";
include_once "./function/sql.php";
//统计活动交流每日访问量
tongji($i_loginNum=0,$i_regNum=0,$i_eventNum=1,$i_serviceNum=0,$i_applyNum=0,$i_newsNum=0,$i_projectNum=0,$i_liveNum=0);
$act = isset($_REQUEST['act']) ? $_REQUEST['act'] : "index";
$beforeurl=$qq = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
if ($act == "index") {
    /* 
    访问活动交流页面的首页
     */
    $title = "活动交流";
    $style = array("","class='hou frist'","class='hou'","class='frist'");
    $rr = isset($_REQUEST['rr']) ? $_REQUEST['rr'] : "rmhd";//没写的话就是热门活动

        //当是热门活动的时候
        $arr['i_mid'] = "207";
        $arr['i_page'] = "1";
        $arr['i_count'] = "4";
        $arr['i_typeId'] = "0";
        $arr['i_city'] = "0";
        $arr['i_time'] = "0";
        $arr['i_orderby'] = "1";
        $arr['i_isfree'] = "0";
        $data = curl_post($arr);
        $data = json_decode($data, true);
        if($data['i_sta'] == '1'){
            $hot_list = json_decode($data['aas_result'], true);
        }

        //获取最新活动
        $arr['i_mid'] = "207";
        $arr['i_page'] = "1";
        $arr['i_count'] = "4";
        $arr['i_typeId'] = "0";
        $arr['i_city'] = "0";
        $arr['i_time'] = "0";
        $arr['i_orderby'] = "0";
        $arr['i_isfree'] = "0";
        $data = curl_post($arr);
        $data = json_decode($data, true);
        if($data['i_sta'] == 1){
            $new_list = json_decode($data['aas_result'], true);
        }

        //获取最多参与的活动
        $arr['i_mid'] = "207";
        $arr['i_page'] = "1";
        $arr['i_count'] = "8";
        $arr['i_typeId'] = "0";
        $arr['i_city'] = "0";
        $arr['i_time'] = "0";
        $arr['i_orderby'] = "2";
        $arr['i_isfree'] = "0";
        $data = curl_post($arr);
        $data = json_decode($data, true);
        if($data['i_sta'] == 1){
            $zuiduo_list = json_decode($data['aas_result'], true);
        }
        //获取往期精彩
        $arr['i_mid'] = "157";
        $data = curl_post($arr);
        $data = json_decode($data, true);
        if($data['i_sta'] == 1){
            $wangqi_list = json_decode($data['aas_result'], true);
        }
        //获取更多活动
        $arr1['i_mid'] = "141";
        $arr1['i_page'] = "1";
        $arr1['i_count'] = "4";
        $arr1['i_typeId'] = "0";
        $arr1['i_city'] = "0";
        $arr1['i_time'] = "-1";
        $arr1['i_orderby'] = "0";
        $arr1['i_isfree'] = "0";
        $data1 = curl_post($arr1);
        $data1 = json_decode($data1, true);
        if($data1['i_sta'] == 1){
            $more_list = json_decode($data1['aas_result'], true);//活动的具体数据
        }
        //获取轮播图
        $arr5['i_mid'] = 333;
        $arr5['i_type'] = "event";
        $data5 = curl_post($arr5);
        $data5 = json_decode($data5, true);
        $thumb=array();
        if (array_key_exists('s_content', $data5)) {
             $thumb = json_decode($data5['s_content'],true);
        }
       
    include_once "./template/jiaoliu.html";
}elseif($act == "detail"){
    /**
     * 进入到活动详情页面来了
     * id代表的是活动id
     */    
    $id = htmlspecialchars($_REQUEST['id']);
    $arr['i_mid'] = "158";
    $arr['i_id'] = htmlspecialchars($_REQUEST['id']);//活动id

    $data = curl_post($arr);
    $data = json_decode($data, true);
    //判断用户是否搜藏
    if($_SESSION['uid'] > 0){
        $arr5['i_mid'] = 174;
        $arr5['s_mod'] = "event";
        $arr5['i_id'] = $id;
        $arr5['s_session'] = $_SESSION['s_session'];
        $data5 = curl_post($arr5);
        $data5 = json_decode($data5, true);
        if($data5['i_sta'] == 1){
            $i_favorite_sta = $data5['i_favorite_sta'];//查看自己是否搜藏
        }else if($data5['i_sta']=='-1') {
            $_SESSION['beforeurl']=$beforeurl;
            $_SESSION['uid']=0;
            echo '<script type="text/javascript">';
            echo "alert('你的账号在异地登录,请重新登陆,并修改密码！');window.location.href ='./grzx.php'";
            echo '</script>';           
            die();
        } else{
            $i_favorite_sta = 0;
        }
    }else{
        $i_favorite_sta = 0;
    }
    if($data['i_sta'] == 1){
        $shuju = json_decode($data['aas_result'], true);
        $address = json_decode($shuju[0]['address'],true);
        $explain = base64_decode($shuju[0]['explain']);//活动内容
        $explain = trimall($explain);
        //$explain = preg_replace('/".*\/uploads\//', '"http://www.wfyizhan.com/uploads/', $explain); //-----删除<style></style>和中间的部分
       // $explain = str_replace("/uploads/","http://www.wfyizhan.com/uploads/",$explain);
        //最近参与的活动的相关信息
        $aas_people = json_decode($data['aas_people'], true);
        foreach($aas_people as $key=>$v){
            $cha = time_cha($v['i_update_time']);
            $aas_people[$key]['cha'] = $cha;
        }
    }
    // //获取城市地址
    $address = pp_cs($address);
/*    $address['positions'][0]=htmlspecialchars($address['positions'][0]);
    $address['positions'][1]=htmlspecialchars($address['positions'][1]);*/

    $address['positions'][0]=(float)($address['positions'][0]);
    $address['positions'][1]=(float)($address['positions'][1]);

    //获取活动评论
    $arr1['i_mid'] = "121";
    $arr1['s_kind'] = "event";
    $arr1['i_id'] = htmlspecialchars($_REQUEST['id']);
    $arr1['i_page'] = 1;
    $arr1['i_count'] = 4;
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    if($data1['i_sta'] == 1){
        if($data1){
            $i_counts = $data1['i_counts'];//评论总条数
            $plnr = json_decode($data1['aas_result'], true);//获取具体的评论内容
            if (count($plnr)) {
                foreach ($plnr as $key => $value) {
                    $plnr[$key]['content']=htmlspecialchars($value['content']);                  
                }
            }
        }
    }
    $title = "活动详情";

    //着重来判断是否有立即报名的资格
    $zhige = array();
    if($_SESSION['uid'] > 0){
        //说明已经登录
//        var_dump(date("Y-m-d H:i:s",time()));
        $xztime = time();
        if($xztime >= $shuju[0]['eTime']){
            //判断时间
            $zhige['state'] = '0';
            $zhige['reason'] = '不在活动时间范围内';
        }else{
            //判断是否是自己发布的任务
            if($_SESSION['uid'] == $shuju[0]['uid']){
                //说明这个任务是我自己发布的
                $zhige['state'] = '0';
                $zhige['reason'] = '不能参加自己发布的任务';
            }else{
                //判断一下自己以前是否参加过
                //我参与的活动
                $arr9['i_mid'] = 143;
                $arr9['i_page'] = 1;
                $arr9['i_count'] = 100;
                $arr9['i_kind'] = 1;
                $arr9['i_sta'] = 0;
                $arr9['s_session'] = $_SESSION['s_session'];
                $data9 = curl_post($arr9);
                $data9 = json_decode($data9, true);
                if($data9['i_sta'] == 1){
                    //参加活动的数据集
                    $join_list = json_decode($data9['aas_result'],true);

                }
                $rr = 1;
                foreach($join_list as $key=>$v){
                    if($id == $v['i_event_id']){
                        //说明我参加过这个活动
                        $rr = 1;break;
                    }
                }
                if($rr == 0){
                    $zhige['state'] = '0';
                    $zhige['reason'] = '这个活动已经参加过了';
                }else{
                    //是可以参加的
                    $zhige['state'] = '1';
                    $zhige['reason'] = '可以参加';
                }
            }
        }
    }else{
        //没有登录
        $zhige['state'] = '0';
        $zhige['reason'] = '请你先登录';
    }
    //判断图片是否有相册
    $arr9['i_mid'] = "216";
    $arr9['i_id'] = $id;
    $data9 = curl_post($arr9);
    $data9 = json_decode($data9, true);
    if($data9['i_sta'] == 1){
        $shuju9 = json_decode($data9['aas_result'], true);
        if(count($shuju9) > 0){
            $xiangce = 1;
        }else{
            $xiangce = 0;
        }
    }else{
        $xiangce = 0;
    }
    if(count($aas_people) >= $shuju[0]['limitCount']){
        $zhige['state'] = '0';
        $zhige['reason'] = '人数已满';
    }
    include_once "./template/act_detail.html";
}elseif($act == "hddd"){
    //获取活动地点
    $name = htmlspecialchars($_REQUEST['name']);//地点名称
    $longitude = htmlspecialchars($_REQUEST['longitude']);//经度
    $latitude = htmlspecialchars($_REQUEST['latitude']);//纬度
    include_once "./template/map.html";
}elseif($act == "hdxz"){
    /*
     * 获取活动的相册
     * 要登录了以后才能获取
     */
    $title = "相册列表";
    $id = htmlspecialchars($_REQUEST['id']);//活动ID
    $arr['i_mid'] = "216";
    $arr['i_id'] = $id;
    $data = curl_post($arr);
    $data = json_decode($data, true);

    $url = "./activity.php?act=detail&id=".$id;
    if($data['i_sta'] == 1){
        $shuju = json_decode($data['aas_result'], true);

        if(count($shuju) > 0){
            foreach($shuju as $key=>$v){
                $shuju[$key]['pics'] = $v['pics'][0];
            }
            include_once "./template/xianchanglist.html";
        }else{
            header($url);
        }
    }else{
        header($url);
    }
}elseif($act == "morepl"){
    /*
     * 获取更多的评论
     */
    $title = "更多评论";
    $id = htmlspecialchars($_REQUEST['id']);//活动id
    //获取活动评论
    $arr1['i_mid'] = "121";
    $arr1['s_kind'] = "event";
    $arr1['i_id'] = $id;
    $arr1['i_page'] = 1;
    $arr1['i_count'] = 8;
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    if($data1['i_sta'] == 1){
        $i_counts = $data1['i_counts'];//评论总条数
        $plnr = json_decode($data1['aas_result'], true);//获取具体的评论内容
        if (count($plnr)) {
                foreach ($plnr as $key => $value) {
                    $plnr[$key]['content']=htmlspecialchars($value['content']);                  
                }
            }
    }
    include_once "./template/pinglun.html";
}elseif($act == "morezjcy"){
    /*
     * 最近参与
     */
    $id = htmlspecialchars($_REQUEST['id']);
    $arr['i_mid'] = "158";
    $arr['i_id'] = $_REQUEST['id'];//活动id
    $data = curl_post($arr);
    $data = json_decode($data, true);
    //最近参与的活动的相关信息
    $aas_people = json_decode($data['aas_people'], true);
    foreach($aas_people as $key=>$v){
        $cha = time_cha($v['i_update_time']);
        $aas_people[$key]['cha'] = $cha;
    }
    include_once "./template/canyudetail.html";
}elseif($act== "gdhd"){
    //获取活动分类
    $title = "活动搜索";
    $arr['i_mid'] = "156";
    $data = curl_post($arr);
    $data = json_decode($data, true);
    $hd_type = json_decode($data['aas_result'], true);//活动分类
    $time_type = isset($_REQUEST['time_type']) ? htmlspecialchars($_REQUEST['time_type']) : '-1';//搜索的时间条件
    $ss = isset($_REQUEST['ss']) ? htmlspecialchars($_REQUEST['ss']) : '0';//是否搜索
    $search = isset($_REQUEST['search']) ? htmlspecialchars($_REQUEST['search']) : '';//搜索条件
    $type_id = isset($_REQUEST['type_id']) ? htmlspecialchars($_REQUEST['type_id']) : '-1';//搜索的兴趣条件
    $city_type = isset($_REQUEST['city_type']) ? htmlspecialchars($_REQUEST['city_type']) : '-1';//搜索的城市条件
    $y_type = isset($_REQUEST['y_type']) ? htmlspecialchars($_REQUEST['y_type']) : '0';//0代表最新发布,1热门点击,2最多参与,3只看免费
    if($ss == 0){
        $arr1['i_mid'] = "141";
        $arr1['i_page'] = "1";
        $arr1['i_count'] = "8";
        if($type_id == "-1"){
            $arr1['i_typeId'] = "0";
        }else{
            $arr1['i_typeId'] = $type_id;
        }
        if($city_type == "-1"){
            $arr1['i_city'] = "0";
        }else{
            $arr1['i_city'] = $city_type;
        }
        $arr1['i_time'] = $time_type;
        if($y_type < 3){
            $arr1['i_orderby'] = $y_type;
        }else{
            $arr1['i_orderby'] = "0";
        }
        if($y_type == 3){
            $arr1['i_isfree'] = 1;
        }else{
            $arr1['i_isfree'] = 0;
        }
        $arr1['key'] = "";
        $data1 = curl_post($arr1);
        $data1 = json_decode($data1, true);
        if($data1['i_sta'] == 1){
            $hd_sj = json_decode($data1['aas_result'], true);//活动的具体数据
        }
    }else{
        $arr['i_mid'] = 314;
        $arr['s_scope'] = "event";
        $arr['s_key'] = $search;
        $arr['i_page'] = "1";
        $arr['i_count'] = "100";
        $data1 = curl_post($arr);
        $data1 = json_decode($data1, true);
        if($data1['i_sta'] == 1){
            $hd_sj = json_decode($data1['aas_result'], true);//活动的具体数据
        }
    }
    include_once "./template/moreactivity.html";
}elseif($act == 'list'){
    /**
     * 进行的是活动列表页的显示
     */
    $type = htmlspecialchars($_REQUEST['type']);
    if($type <= 3){
        $arr['i_mid'] = "207";
        $arr['i_page'] = "1";
        $arr['i_count'] = "8";
        $arr['i_typeId'] = "0";
        $arr['i_city'] = "0";
        $arr['i_time'] = "0";
        if($type == "1"){
            //热门活动
            $title = "热门活动列表";
            $arr['i_orderby'] = "1";
        }elseif($type == "2"){
            //最新活动
            $title = "最新活动列表";
            $arr['i_orderby'] = "0";
        }elseif($type == 3){
            //最多参与
            $title = "最多参与列表";
            $arr['i_orderby'] = "2";
        }
        $arr['i_isfree'] = "0";
        $data = curl_post($arr);
        $data = json_decode($data, true);
        if($data['i_sta'] == '1'){
            $list = json_decode($data['aas_result'], true);
        }
    }elseif($type == 4){
        $title = "往期精彩列表";
        $arr['i_mid'] = "157";
        $data = curl_post($arr);
        $data = json_decode($data, true);
        if($data['i_sta'] == 1){
            $list = json_decode($data['aas_result'], true);
            foreach($list as $key=>$v){
                if($key >=8){
                    unset($list[$key]);
                }
            }
            $data['i_page'] = 1;
            $data['i_pages'] = ceil(count($list)/8);

        }
    }
    include_once "./template/activitylist.html";
}elseif($act == 'post1'){
    /**
     * 这个方法主要用于加载列表页
     */
    if($_POST['type'] <= 3){
        $arr['i_mid'] = "207";
        $arr['i_page'] = $_POST['i_page'];
        $arr['i_count'] = "8";
        $arr['i_typeId'] = "0";
        $arr['i_city'] = "0";
        $arr['i_time'] = "0";
        if($_POST['type'] == "1"){
            //热门活动
            $arr['i_orderby'] = "1";
        }elseif($_POST['type'] == 2){
            //最新活动
            $arr['i_orderby'] = "0";
        }elseif($_POST['type'] == 3){
            //最多参与
            $arr['i_orderby'] = "2";
        }
        $arr['i_isfree'] = "0";
        $data = curl_post($arr);
        $data = json_decode($data, true);
        if($data['i_sta'] == '1'){
            $list = json_decode($data['aas_result'], true);
        }
    }elseif($type == 4){
        //往期精彩
        $arr['i_mid'] = "157";
        $data = curl_post($arr);
        $data = json_decode($data, true);
        $i_page = $_POST['i_page'];
        $end = 8*intval($i_page-1);
        $start = $end-7;
        if($data['i_sta'] == 1){
            $list = json_decode($data['aas_result'], true);
            foreach($list as $key=>$v){
                if($key >$end || $key < $start){
                    unset($list[$key]);
                }
            }

        }
    }
    include_once "./template/post1.html";
}elseif($act == "post2"){
    /*
     * 搜索条件页面的筛选,不含搜索框
     */
    $arr1['i_mid'] = "141";
    $arr1['i_page'] = $_POST['i_page'];
    $arr1['i_count'] = "8";
    $arr1['key'] = "";
    if($_POST['hobby'] == "-1"){
        $arr1['i_typeId'] = "0";
    }else{
        $arr1['i_typeId'] = $_POST['hobby'];
    }
   if($_POST['city'] == "-1"){
       $arr1['i_city'] = "0";
   }else{
       $arr1['i_city'] = $_POST['city'];
   }
    if($_POST['time'] == "-1"){
        $arr1['i_time'] = "-1";
    }else{
        $arr1['i_time'] = $_POST['time'];
    }
    if($_POST['ttt'] <= 2){
        $arr1['i_orderby'] = $_POST['ttt'];
    }else{
        $arr1['i_orderby'] = 0;
    }
    if($_POST['ttt'] == 3){
        $arr1['i_isfree'] = "1";
    }else{
        $arr1['i_isfree'] = "0";
    }
    $data = curl_post($arr1);
    $data = json_decode($data, true);
    if($data['i_sta'] == '1'){
        $hd_sj = json_decode($data['aas_result'], true);
    }
    include_once "./template/post2.html";
}elseif($act == 'ss'){
    //执行搜索功能
    $arr['i_mid'] = 314;
    $arr['s_scope'] = "event";
    $arr['s_key'] = "123";
    $arr['i_page'] = "1";
    $arr['i_count'] = "100";
    $data = curl_post($arr);
    $data = json_decode($data, true);
    if($data['i_sta'] == 1){
        $hd_sj = json_decode($data['aas_result'], true);//活动的具体数据
    }
}elseif($act == "is_save"){
    /**
     * 进行收藏功能的实现
     */
    if(!($_SESSION['uid'] > 0)){
        header("./grzx.php?act=index");
    }
    $arr['i_mid'] = 160;
    $arr['s_mod'] = $_REQUEST['s_mod'];
    $arr['i_row_id'] = $_REQUEST['i_row_id'];
    $arr['s_session'] = $_SESSION['s_session'];
    $data = curl_post($arr);
    $data = json_decode($data, true);
    $url = "./activity.php?act=detail&id=".$_REQUEST['i_row_id'];
    if($data['i_sta'] == '1'){
        echo json_encode(array("stat"=>1));
    }elseif ($data['i_sta']=='-1') {
        $_SESSION['beforeurl']=$beforeurl;
        $_SESSION['uid']=0;
        echo '<script type="text/javascript">';
        echo "alert('你的账号在异地登录,请重新登陆,并修改密码！');window.location.href ='./grzx.php'";
        echo '</script>';           
        die();
    }else{
        echo json_encode(array("stat"=>0,"err"=>$data['s_err']));
    }
}elseif($act == "no_save"){
    /**
     * 取消收藏
     */
    if(!($_SESSION['uid'] > 0)){
        header("./grzx.php?act=index");
    }
    $arr['i_mid'] = 172;
    $arr['s_mod'] = $_REQUEST['s_mod'];
    $arr['i_row_id'] = $_REQUEST['i_row_id'];
    $arr['s_session'] = $_SESSION['s_session'];
    $data = curl_post($arr);
    $data = json_decode($data, true);
    $url = "./activity.php?act=detail&id=".$_REQUEST['i_row_id'];
    if($data['i_sta'] == '1'){
        echo json_encode(array("stat"=>1));
    }elseif ($data['i_sta']=='-1') {
        $_SESSION['beforeurl']=$beforeurl;
        $_SESSION['uid']=0;
        echo '<script type="text/javascript">';
        echo "alert('你的账号在异地登录,请重新登陆,并修改密码！');window.location.href ='./grzx.php'";
        echo '</script>';           
        die();
    }else{
        echo json_encode(array("stat"=>0,"err"=>$data['s_err']));
    }
}

elseif($act == "picdetail"){
    /*
     * 获取某一个图片相册的图片
     */
    $title = "图片相册";
    $arr['i_mid'] = 220;
    $arr['i_id'] = $_REQUEST['id'];
    $arr['s_id'] = $_REQUEST['pid'];
    $data = curl_post($arr);
    $data = json_decode($data, true);
    $url = "./activity.php?act=detail&id=".$_REQUEST['id'];
    if($data['i_sta'] == '1'){
        $data['as_pics'] = json_decode($data['as_pics'],true);
        include_once "./template/xianchang1.html";
    }else{
        header($url);
        exit;
    }
}elseif($act == "sendpl"){
    //进行评论
    $title = "进行提问";
    if(!($_SESSION['uid'] > 0)){
        header("./grzx.php?act=index");
        exit;
    }
    if($_SESSION['yzm'] == $_POST['yzm'] && isset($_POST['sub'])){
        unset($_SESSION['yzm']);
        $arr['i_mid'] = 122;
        $arr['s_kind'] = htmlspecialchars($_REQUEST['s_kind']);
        $arr['i_id'] = htmlspecialchars($_REQUEST['i_id']);
        $arr['i_pid'] = htmlspecialchars($_REQUEST['i_pid']);
        $arr['s_content'] = addslashes(htmlspecialchars($_REQUEST['s_content']));
        $arr['s_session'] = $_SESSION['s_session'];
        $data = curl_post($arr);
        $data = json_decode($data, true);
        $url = "location:./activity.php?act=detail&id=".$_REQUEST['i_id'];
        if($data['i_sta'] == '1'){
          header($url);
          exit;
        }elseif ($data['i_sta']=='-1') {
            $_SESSION['beforeurl']=$beforeurl;
            $_SESSION['uid']=0;
            echo '<script type="text/javascript">';
            echo "alert('你的账号在异地登录,请重新登陆,并修改密码！');window.location.href ='./grzx.php'";
            echo '</script>';           
            die();
        } else{
            header($url);
            exit;
        }
    }else{
        $s_kind = $_REQUEST['s_kind'];
        $i_id = $_REQUEST['i_id'];
        $i_pid = $_REQUEST['i_pid'];
        $_SESSION['yzm'] = tjyz();
        include_once "./template/question.html";
    }


}elseif($act == "post3"){
    //获取更多评论
    $id = $_REQUEST['id'];//活动id
    //获取活动评论
    $arr1['i_mid'] = "121";
    $arr1['s_kind'] = "event";
    $arr1['i_id'] = $id;
    $arr1['i_page'] = $_REQUEST['i_page'];
    $arr1['i_count'] = 8;
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    if($data1['i_sta'] == 1){
        $plnr = json_decode($data1['aas_result'], true);//获取具体的评论内容
    }
    include_once "./template/post3.html";
}elseif($act == 'yuding_now'){
    $title = "参加活动";
    //获取活动票信息-167：
    if(!($_SESSION['uid'] > 0)){
        header("./grzx.php?act=index");
        exit;
    }
    $id = check_input($_REQUEST['id']);//活动id
    //这个是他原来的代码，我要来个大改动想艾特是注释掉--开始
    // $arr['i_mid'] = 167;
    // $arr['i_id'] = $id;
    // $data = curl_post($arr);
    // $data = json_decode($data, true);
    // if($data['i_sta'] == 1){
    //     $hdp = json_decode($data['aas_result'], true);
    // }else if ($data['i_sta']=='-1') {
    //         $_SESSION['beforeurl']=$beforeurl;
    //         $_SESSION['uid']=0;
    //         echo '<script type="text/javascript">';
    //         echo "alert('你的账号在异地登录,请重新登陆,并修改密码！');window.location.href ='./grzx.php'";
    //         echo '</script>';           
    //         die();
    // }
    //--结束
    $arr['i_mid'] = 193;
    $arr['i_id'] = $id;
    $arr['s_session'] = $_SESSION['s_session'];
    $data = curl_post($arr);
    $data = json_decode($data, true);
    $jionTime = time();
    if($data['i_sta'] == 1){
        $hdp = json_decode($data['aas_ticket'], true);
        for($i=0;$i<count($hdp);$i++){
            $sTime = $hdp[$i]['i_join_time'];
            $eTime = $hdp[$i]['i_end_time'];
            $hdp[$i]['i_can_join_event'] = 0;
            if($jionTime < $sTime){
                $hdp[$i]['i_can_join_event'] = 1;
            }
            if($jionTime > $eTime){
                $hdp[$i]['i_can_join_event'] = 2;
            }
        }
    }else if ($data['i_sta']=='-1') {
            $_SESSION['beforeurl']=$beforeurl;
            $_SESSION['uid']=0;
            echo '<script type="text/javascript">';
            echo "alert('你的账号在异地登录,请重新登陆,并修改密码123！');window.location.href ='./grzx.php'";
            echo '</script>';           
            die();
    }
    //获取活动的必填项
    $arr1['i_mid'] = "158";
    $arr1['i_id'] = $_REQUEST['id'];//活动id
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    $data1 = json_decode($data1['aas_result'], true);
    $ad_expand = json_decode($data1[0]['ad_expand'], true);
    include_once "./template/piao.html";
}elseif($act == "join_activity"){
    //参加活动后的数据进行提交到这里
    $arr['i_mid'] = 146;
    $arr['i_event_id'] = check_input($_POST['i_event_id']);
    $arr['s_name'] = htmlspecialchars($_POST['realname']);
    $arr['s_phone'] = $_POST['phone'];
//    $arr['s_email'] = $_POST['email'];
    //存储其他的必填项
    $arr1['i_mid'] = "158";
    $arr1['i_id'] =  $_POST['i_event_id'];//活动id
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    $data1 = json_decode($data1['aas_result'], true);
    $shop_name = $data1['0']['title'];//商品名称
    $ad_expand = json_decode($data1[0]['ad_expand'], true);
    $bitian = array();
    if(count($ad_expand) > 0){
        foreach($ad_expand as $v){
            if($v['i_required'] == 1){
                $bb = array();
                $bb['i_id'] = $v['i_id'];
                $bb['s_type'] = $v['s_type'];
                $bb['s_name'] = $v['s_name'];
                $ss = "t_".$v['i_id'];
                if(is_array($_POST[$ss])){
                    $value = '';
                    foreach($_POST[$ss] as $vv){
                        $value .=$vv.",";
                    }
                    $value = rtrim($value,",");
                }elseif($v['s_type'] =='InTime'){
                    $value =strtotime($_POST['ss']);
                }else{
                    $value = $_POST[$ss];
                }
                $bb['ad_sub'] = $value;
                $bitian[] = $bb;
            }
        }
    }
    $bitian = json_encode($bitian);

    $erweima = time().$_SESSION['uid'];
    $erweima1 = '|pricevote|'.time().$_SESSION['uid'];
    if($_POST['buyNumber'] > 1){
        $erweima = time().$_SESSION['uid'].'a0';
        for($i = 1 ;$i<$_POST['buyNumber'];$i++){
            $aa = "a".$i;
            $erweima .=$erweima1.$aa;
        }
    }
    $arr['ad_expand_content'] = $bitian;
    $arr['i_vote_id'] = $_POST['piaozong'];
    $arr['s_vote_sign'] = $erweima;
    $arr['s_session'] = $_SESSION['s_session'];
    $arr['buyNumber'] = $_POST['buyNumber'];
    $cjhd = curl_post($arr);
    $cjhd = json_decode($cjhd,true);

    $s_sn = $cjhd['s_sn'];
    //获取货到票价格
    $arr5['i_mid'] = 167;
    $arr5['i_id'] =$_POST['i_event_id'];
    $data5 = curl_post($arr5);
    $data5 = json_decode($data5, true);
    if($data5['i_sta'] == 1){
        $hdp = json_decode($data5['aas_result'], true);
    }
    $jiage = '';
    foreach($hdp as $v){
        if($v['i_id'] == $_POST['piaozong']){
            $jiage = $v['i_price']/100;
        }
    }
    if($jiage == 0){ 
        header("location:./order.php?act=myact");
        exit;
    }else{
        $jiage = $jiage * $_POST['buyNumber'];
        $signarr = array("order_id"=>$s_sn,"money"=>$jiage);
        $newss = encryption($signarr);
        $url = "location:./serviceshop.php?act=choosepay&shopname=".$shop_name.$newss;
        header($url);
        exit;
    }

}elseif($act == 'hfpl'){
    if(!($_SESSION['uid'] > 0)){
        header("./grzx.php?act=index");
        exit;
    }
    $_SESSION['yzm'] = tjyz();
    $id = $_REQUEST['id'];//被回复人的id
    $hid = $_REQUEST['hid'];
    $arr1['i_mid'] = "121";
    $arr1['s_kind'] = "event";
    $arr1['i_id'] = $hid;//活动id
    $arr1['i_page'] = 1;
    $arr1['i_count'] = 400;
    $data1 = curl_post($arr1);
    $data1 = json_decode($data1, true);
    if($data1['i_sta'] == 1){
        if($data1){
            $i_counts = $data1['i_counts'];//评论总条数
            $plnr = json_decode($data1['aas_result'], true);//获取具体的评论内容
            foreach($plnr as $key=>$v){
                if($v['id'] != $id){
                    unset($plnr[$key]);
                }else{
                    $plnr[$key]['content']=htmlspecialchars($v['content']);
                }
                
            }
        }
    }
    include_once "./template/pinglun_detail.html";
}