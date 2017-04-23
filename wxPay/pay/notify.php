<?php
session_start();
ini_set('date.timezone','Asia/Shanghai');
error_reporting(E_ERROR);

require_once "../lib/WxPay.Api.php";
require_once '../lib/WxPay.Notify.php';
require_once 'log.php';
require_once 'sql.php';
//初始化日志
$logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
$log = Log::Init($logHandler, 15);
class PayNotifyCallBack extends WxPayNotify
{

	//查询订单
	public function Queryorder($transaction_id)
	{
		$input = new WxPayOrderQuery();
		$input->SetTransaction_id($transaction_id);
		$result = WxPayApi::orderQuery($input);
		Log::DEBUG("query:" . json_encode($result));
		if(array_key_exists("return_code", $result)
			&& array_key_exists("result_code", $result)
			&& $result["return_code"] == "SUCCESS"
			&& $result["result_code"] == "SUCCESS")
		{
			return true;
		}
		return false;
	}
	
	//重写回调处理函数
	public function NotifyProcess($data, &$msg)
	{
		// Log::DEBUG("call back:" . json_encode($data));
		$notfiyOutput = array();
		
		if(!array_key_exists("transaction_id", $data)){
			$msg = "输入参数不正确";
			return false;
		}
		//查询订单，判断订单真实性
		if(!$this->Queryorder($data["transaction_id"])){
			$msg = "订单查询失败";
			return false;
		}
		if ($data['return_code']=='SUCCESS') {
			if ($data['result_code']=='SUCCESS') {
				// Log::DEBUG("传递过来的数据：" . $data['attach']);
				$attach=json_decode($data['attach'],true);
				$order_id=$attach['order_id'];
				$arr['i_mid']='96';
				$arr['i_id']=$order_id;
				$arr['s_session']=$attach['s_session'];
				//可能需要提交的订单信息
				$money=$data['total_fee'];
				$s_platform_sn=$data['transaction_id'];
				$arr1['i_mid']='111';
				$arr1['s_sn']=$order_id;
				$arr1['i_money']=$money;
				$arr1['s_platform_sn']=$s_platform_sn;
				$arr1['s_session']=$attach['s_session'];
				$arr1['i_succee']='1';
				//支付日志需要的参数
				$arr2['i_mid']='403';
				$arr2['s_session']=$attach['s_session'];
				$arr2['i_kind']='4';
				$arr2['i_amount']=$money;
				$arr2['i_charge']='0';
				$arr2['s_sn']=$order_id;
				$arr2['i_status']= '01';
				$arr2['s_order_id']=$s_platform_sn;
				$arr2['i_date']=$data['time_end'];
				$arr2['s_object_name']='通过微信支付付款';
				$arr2['s_pay_date']=date('YmdHis',time());
				$arr2['i_buyid']=0;
				$arr2['i_sellid']=0;
				// //支付成功 111
				$dataM = $this->curl_post($arr1);
				$dataM = json_decode($dataM,true);
				if ($dataM['i_sta']==1) {
					$this->curl_post($arr2);
				}else{
					return false;
				}
				// $data=$this->curl_post($arr);
				// $data=json_decode($data,true);
				// if ($data['i_sta']==1) {
				// 	$data2=json_decode($data['aas_result'],true);
				// 	$arr2['i_buyid']=$data2['i_buy_id'];
				// 	$arr2['i_sellid']=$data2['i_sell_id'];
				// 	Log::DEBUG("服务订单：sellid-----buyid:" . json_encode($data2));
				// 	if ($data2['i_sta']==1) {
				// 		$this->curl_post($arr2);
				// 		return true;
				// 	}else{
				// 		$result=$this->curl_post($arr1);
				// 		$result=json_decode($result,true);
				// 		if ($result['i_sta']==1) {
				// 			$this->curl_post($arr2);
				// 		}
				// 	}
				// }else{
				// 	$arr['i_mid']='201';
				// 	$data=$this->curl_post($arr);
				// 	$data=json_decode($data,true);					
				// 	if ($data['i_sta']==1) {
				// 		$data=json_decode($data['as_order'],true);
				// 		$arr2['i_buyid']=$data['i_buy_id'];
				// 		$arr2['i_sellid']=$data['i_sell_id'];
				// 		Log::DEBUG("活动订单：sellid-----buyid:" . json_encode($data));
				// 		// $arr2['s_pay_date']=$data['i_create_time'];
				// 		if ($data['i_sta']==1) {
				// 			$this->curl_post($arr2);
				// 			return true;
				// 		}else{
				// 			$result=$this->curl_post($arr1);
				// 			$result=json_decode($result,true);
				// 			if ($result['i_sta']==1) {
				// 				$this->curl_post($arr2);
				// 			}
				// 		}
				// 	}
				// }
			}
			
		}
		// $sql=new model();
		// $sql->check_dd(1,$data['transaction_id']);
		return true;
	}

	function curl_post($acc=array()){
			/**
			 * 主要用于传递，获取数据
			 */
				$url = "http://172.16.2.10/servicephp";//正式服
			//$url = "http://175.155.13.147:1480/servicephp";//测试服
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
			$arr = array();
			$arr['s_pid'] = "kcy";
			$arr['s_session'] = '';
			$arr['s_token'] = "7d76f956d07a9843bf53610ddecf294d";
			//把参数传递到里面
			foreach($acc as $key=>$v){
				$arr[$key] = $v;
			}
			$s = '';
				foreach($arr as $key=>$v){
					$s .= "$key=$v&";
				}
				$s = rtrim($s,"&");
				$s .="&key=sdfsdlfsfisfkcxsf97s9f7s97fs9df";
			$s_sign = sha1($s);
			$data = $arr;
			$data['s_sign'] = $s_sign;
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
}

Log::DEBUG("begin notify------");
$notify = new PayNotifyCallBack();
$notify->Handle(false);
