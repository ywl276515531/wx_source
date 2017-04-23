<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

</body>
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="sha1.js"></script>
<script type="text/javascript">
var postUrl = "http://175.155.13.147:1480/servicephp"; //网关路径
var key = "sdfsdlfsfisfkcxsf97s9f7s97fs9df";//消息签名KEY
	function _sendAjax(){
		postList = {};
		postList["s_pid"] = "kcy";
		postList["s_session"] = "";
		postList["s_token"] = "7d76f956d07a9843bf53610ddecf294d";//客户端访问令牌
		postList["i_mid"] = arguments[0];
		var paramsObj = arguments[1];
		// console.log(paramsObj);
		for(var k in paramsObj){
			postList[k] = paramsObj[k];
		}
		var signSha = "";
		// console.log(postList);
		for(var k in postList){
			if(signSha == ""){
				signSha = signSha + k + "=" + postList[k];
			}else{
				signSha = signSha + "&" + k + "=" + postList[k];
			}
		}
		signSha = signSha + "&key=" + key;
		console.log(signSha);
		postList["s_sign"] = _sha1(signSha);
		console.log(postList);

		$.post(postUrl,postList,function(result){
			// _jsonDecode(result);
			result2 = JSON.parse(result);
			console.log(result2);
		})
	}
	function _sha1(val){
		return (CryptoJS.SHA1(val)).toString(CryptoJS.enc.Hex);
	}
	function _jsonDecode(str){
		return JSON.parse(str);
	}
	_sendAjax("158",{'i_id':'307'})
</script>
</html>