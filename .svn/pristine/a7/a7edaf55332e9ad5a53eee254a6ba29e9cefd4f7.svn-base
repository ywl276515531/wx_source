<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/> 
    <title>订单详细信息</title>
<?php 
ini_set('date.timezone','Asia/Shanghai');
session_start();
//error_reporting(E_ERROR);
require_once "../lib/WxPay.Api.php";
require_once "WxPay.JsApiPay.php";
require_once 'log.php';

$order_id=isset($_REQUEST['order_id']) ? $_REQUEST['order_id']:'ttttt111';
$money=isset($_REQUEST['money']) ? $_REQUEST['money']:'1';
$yhj = isset($_REQUEST['yhj'])?$_REQUEST['yhj']:0;
$shopname = isset($_REQUEST['shopname'])?$_REQUEST['shopname']:'微服驿站微信端支付';
$s_session=isset($_SESSION['s_session']) ? $_SESSION['s_session'] : '';
$arr=array('order_id'=>$order_id,'s_session'=>$s_session);
$rand = md5(time() . mt_rand(0,1000));
//var_dump($s_session);
//初始化日志
$logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
$log = Log::Init($logHandler, 15);

//打印输出数组信息
function printf_info($data)
{
    foreach($data as $key=>$value){
        echo "<font color='#00ff55;'>$key</font> : $value <br/>";
    }
}

//①、获取用户openid
$tools = new JsApiPay();
$openId = $tools->GetOpenid();

//②、统一下单
$input = new WxPayUnifiedOrder();
$input->SetBody($shopname);
$input->SetAttach(json_encode($arr));
$input->SetOut_trade_no($rand);
$input->SetTotal_fee($money);
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600*3));
$input->SetGoods_tag($shopname);
$input->SetNotify_url("http://weixin.wfyizhan.com/11/wxPay/pay/notify.php");
$input->SetTrade_type("JSAPI");
$input->SetOpenid($openId);
$order = WxPayApi::unifiedOrder($input);
//printf_info($order);
$jsApiParameters = $tools->GetJsApiParameters($order);

//获取共享收货地址js函数参数
//$editAddress= $tools->GetEditAddressParameters();

//③、在支持成功回调通知中处理成功之后的事宜，见 notify.php
/**
 * 注意：
 * 1、当你的回调地址不可访问的时候，回调通知会失败，可以通过查询订单来确认支付是否成功
 * 2、jsapi支付时需要填入用户openid，WxPay.JsApiPay.php中有获取openid流程 （文档可以参考微信公众平台“网页授权接口”，
 * 参考http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html）
 */
?>
	<script src="jquery-1.9.1.min.js"></script>
	<script src="sha1.js"></script>
    <script type="text/javascript">
	//调用微信JS api 支付
	function jsApiCall()
	{
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',
			<?php echo $jsApiParameters; ?>,
			function(res){
				//alert(res.err_msg);
				if (res.err_msg == "get_brand_wcpay_request:ok") {
					$("#showButton").hide();
					$("#hideButton").show();
					alert('支付成功!');
					window.location="http://weixin.wfyizhan.com/11/grzx.php?act=zhu";
					//alert('支付成功!');
					// var arr={};
					// <?php if($yhj > 0){ ?>
					// arr['i_mid']='110';
					// arr['s_sn']='<?php echo $order_id; ?>';
					// arr['i_money']='<?php echo $money; ?>';
					// arr['i_coupon']='<?php echo $yhj; ?>';
					// <?php }else{ ?>
					// arr['i_mid']='111';
					// arr['s_sn']='<?php echo $order_id; ?>';
					// arr['i_money']='<?php echo $money; ?>';
					// arr['s_platform_sn']='21332321313';
					// arr['i_succee']='1';
					// <?php } ?>
					//sendAjax(arr);
					// var order_id='<?php echo $order_id; ?>';
					// var money='<?php echo $money; ?>';
					// window.location.href="submitData.php?order_id="+order_id+"&money="+money;
				}else{
					alert('支付失败!');
					window.location="http://weixin.wfyizhan.com/11/grzx.php?act=zhu";
				}
			}
		);
	}

	function sendAjax(res){
		//alert('支付成功!');
		var postList=getData(res);
		$.post("http://www.wfyizhan.com/servicephp",postList,function(result){
			//alert(result);
			var obj=JSON.parse(result);
			if(obj.i_sta=='1'){
				$("#showButton").hide();
				$("#hideButton").show();
				alert('支付成功!');
				window.location="http://weixin.wfyizhan.com/11/grzx.php?act=zhu";
			}else{
				alert('支付失败!');
				window.location="http://weixin.wfyizhan.com/11/grzx.php?act=zhu";
			}
		});
	}
	function _sha1(val){
		return (CryptoJS.SHA1(val)).toString(CryptoJS.enc.Hex);
	}
	function getData(res){
			var dataArr={};	
			var str='';		
			dataArr['s_pid']='kcy';							
			dataArr['s_session']='<?php echo $s_session; ?>';
			dataArr['s_token']='7d76f956d07a9843bf53610ddecf294d';	
			for(key in res){
				dataArr[key]=res[key];
			}			
			for(key in dataArr){
				str=str+key+'='+dataArr[key]+'&';
			}
			str=str+'key=sdfsdlfsfisfkcxsf97s9f7s97fs9df';
			var _sha1_str=_sha1(str);
			dataArr['s_sign']=_sha1_str;	
			return dataArr;	
	}	
	function callpay()	
	{
		if (typeof WeixinJSBridge == "undefined"){
		    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		    }else if (document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
		        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		    }
		}else{
		    jsApiCall();
		}
	}	
	</script>	
</head>
<body align="center" style="background: #efeff4">
	<div class="content" style="background:#efedf0;text-align: center; font-size: 16px; padding: 18px 0;" >
		<div name="title" >微服驿站微信端支付</div>
		<div name="money" style="font-size:45px;">￥ <?php echo (float)$money/100; ?>元</div>
		<button id="showButton" type="button" style="border:none;text-decoration: none; width: 91.3%; margin: 0 auto;border-radius: 10px; height: 45px; line-height: 45px; background: #44bf16; display: block; text-align: center; font-size: 16px; margin-top: 14px; color: #fff;" onclick="callpay()">立即支付</button>
		<button id="hideButton" type="button" style="text-decoration: none; width: 91.3%; margin: 0 auto;border-radius: 10px; height: 45px; line-height: 45px; background: #CDC9C9; display: block; text-align: center; font-size: 16px; margin-top: 14px; color: #fff; display:none">立即支付</button>
	</div>	
</body>
</html>