/*****************************
* 此文档中的所有val, class或function，都请使用_开头
*/

var _cfgPostWaitTime = 5000; // send post wait max time (ms)
var _currentPostTime = -1; // current post start time (timesamp), if no post = -1
var _returnID = ''; // for _resultPost switch logic
var _mid = -1; // for ajax mid;
var _region_obj = null;
var _link_url = "http://www.wfyizhan.com";   //正式服链接地址
//var _link_url = "http://175.155.13.147:1480";   //测试服链接地址

function _checkPhone(val){
	if(!(/^1[3|4|5|7|8]\d{9}$/.test(val))){
		return false;
	}
	return true;
}

// kind: default/primary/success/info/warning/danger/important/special
function _alert(kind, info){
	var typeKind = '';
	if(kind == 'danger'){
		typeKind = 'danger';
		if(info.indexOf("session")>-1){
			info = "账号异常,请重新登陆！"
		}
	}else if(kind == 'success'){
		typeKind = 'success';
	}
	var msg = $.zui.messager.show(info, {placement: 'center', type: typeKind, icon: 'info', time: 2000});
}

function _getver(){
	return "?v=" + (new Date()).getTime();
}

// get/set local cache val
// get: key; set: key, val
function _localval(){
	if(arguments.length == 1){
		var key = _pname + '#' + arguments[0];
		return _localStorageRead('web', 'val', key);
	}else if(arguments.length == 2){
		var key = _pname + '#' + arguments[0];
		var val = arguments[1];
		// localvalues is null, create it
		if(!_checkval(_localStorageRead('web', 'val', 'localvalues'))){
			_localStorageSave('web', 'obj', 'localvalues', []);
		}
		// add local value
		_localStorageSave('web', 'val', key, val);
		// add local value name
		var list = _localStorageRead('web', 'obj', 'localvalues');
		if(list.indexOf(key) == -1){
			list.push(key);
			_localStorageSave('web', 'obj', 'localvalues', list);
		}
	}
}

// check val
function _checkval(val){
	if(val == '' || val == null || val == undefined){
		return false;
	}
	return true;
}

// jsonEncode
function _jsonEncode(obj){
	return JSON.stringify(obj);
}

// jsonDecode
function _jsonDecode(str){
	var tempStr = "";
	if(str!=""){
		tempStr = JSON.parse(str);
	}
	return tempStr;
}

// 写入localStorage
// kind:val/obj
function _localStorageSave(prx, kind, key, value){
	if(localStorage){
		var skey = _stringformat('%s%s%s', prx, '#', key);
		if(kind == 'val'){
			localStorage[skey] = value;
		}else if(kind == 'obj'){
			localStorage[skey] = _jsonEncode(value);
		}
	}else{
		log('当前浏览器不支持本地存储,请使用更高版本的Chrome/Firefox/Safari/IE浏览器...');
	}
}

// 读取localStorage
// kind:val/obj
function _localStorageRead(prx, kind, key){
	if(localStorage){
		var skey = _stringformat('%s%s%s', prx, '#', key);
		if(kind == 'val'){
			return localStorage[skey];
		}else if(kind == 'obj'){
			return _jsonDecode(localStorage[skey]);
		}
	}else{
		log('当前浏览器不支持本地存储,请使用更高版本的Chrome/Firefox/Safari/IE浏览器...');
	}
}

// 删除localStorage
function _localStorageDel(prx, key){
	if(localStorage){
		var skey = _stringformat('%s%s%s', prx, spt, key);
		localStorage.removeItem(skey);
	}else{
		log('当前浏览器不支持本地存储,请使用更高版本的Chrome/Firefox/Safari/IE浏览器...');
	}
}

// string format
function _stringformat() {
	var args = arguments,
	string = args[0],
	i = 1;
	return string.replace(/%((%)|s|d)/g, function (m) {
		// m is the matched format, e.g. %s, %d
		var val = null;
		if (m[2]) {
			val = m[2];
		} else {
			val = args[i];
			// A switch statement so that the formatter can be extended. Default is %s
			switch (m) {
				case '%d':
					val = parseFloat(val);
					if (isNaN(val)) {
						val = 0;
					}
					break;
			}
			i++;
		}
		return val;
	});
}

var _tempReturnID = "";
// post data
// param(str): returnID(用于_returnPost处理), mid, param1, param2, ..., paramN
function _sendAjax(){
	_returnID = arguments[0];
	if(_returnID!=_tempReturnID){
		_tempReturnID = _returnID;
		var mid = arguments[1];
		_mid = mid;
		var paramIdx = 2;
		paramsObj = arguments[2];
		//console.log(_returnID+"  "+_mid);
		if(arguments.length >= paramIdx){
			var session = "";
			session = _ajaxSession;
			// if(_checkval(_localval('session'))){
			// 	session = _localval('session');
			// }
			var postDatas = {};
			postDatas['s_pid'] = 'kcy';
			postDatas['i_mid'] = mid;
			postDatas['s_session'] = session;
			postDatas['s_token'] = _access_token;
			for (var key in paramsObj) {
	            postDatas[key] = paramsObj[key];
	        }
			var signSrc = '';
			for(var k in postDatas){
				if (signSrc == '') {
					signSrc = signSrc + k + '=' + postDatas[k];
				} else {
					signSrc = signSrc + '&' + k + '=' + postDatas[k];
				}
			}
			signSrc = signSrc + '&key=' + _sha1_key;
			postDatas['s_sign'] = _sha1(signSrc);
			if (!Date.now) {
			    Date.now = function() { return new Date().getTime(); };
			}
			_currentPostTime = Date.now();
			$.post(_url_service, postDatas, function(result){
				_returnPost(_jsonDecode(result));
				_tempReturnID = "";
			});
		}else{
			if(_debug){
				console.log('错误，POST参数数量不能少于3，参数形式为：pagename, kind(ajax/session), mid, param1, param2, ..., paramN');
			}
		}
	}	
}

// post data
// param(str): returnID(用于_returnPost处理), mid, param1, param2, ..., paramN, url
function _sendForm(){
	_returnID = arguments[0];
	var mid = arguments[1];
	_mid = mid;
	var paramIdx = 2;
	paramsObj = arguments[2];
	var url = arguments[3];
	//console.log(_returnID+"  "+_mid);
	if(arguments.length >= paramIdx){
		var session = "";
		session = _ajaxSession;
		// if(_checkval(_localval('session'))){
		// 	session = _localval('session');
		// }
		var postDatas = {};
		postDatas['s_pid'] = 'kcy';
		postDatas['i_mid'] = mid;
		postDatas['s_session'] = session;
		postDatas['s_token'] = _access_token;
		var temp_form_1 = "";
		for (var key in paramsObj) {
            postDatas[key] = paramsObj[key];
            temp_form_1 += '    <input type="hidden" name="'+key+'" value="'+paramsObj[key]+'">';
        }
		var signSrc = '';
		for(var k in postDatas){
			if (signSrc == '') {
				signSrc = signSrc + k + '=' + postDatas[k];
			} else {
				signSrc = signSrc + '&' + k + '=' + postDatas[k];
			}
		}
		signSrc = signSrc + '&key=' + _sha1_key;
		postDatas['s_sign'] = _sha1(signSrc);

		var formstr = '';
		formstr += '<form id="ajaxFormSend" action="' + url + '" method="post" target="_blank">';		
		formstr += '    <input type="hidden" name="s_pid" value="kcy">';
		formstr += '    <input type="hidden" name="i_mid" value="' + mid + '">';
		formstr += '    <input type="hidden" name="s_session" value="' + session + '">';
		formstr += '    <input type="hidden" name="s_token" value="' + _access_token + '">';
		formstr += '    <input type="hidden" name="s_sign" value="' + _sha1(signSrc) + '">';
                //formstr = formstr + '    <input type="hidden" name="cash" value="' + Number($("#pay_price").text())*100 + '">';
                //formstr = formstr + '    <input type="hidden" name="coupon" value="' + goods_price - (Number($("#pay_price").text())*100) + '">';
        formstr += temp_form_1;
        formstr += '    <input type="hidden" name="action" value="cashinali">';
        formstr += '<input type="submit" class="submitokbtn alisubmit" value="确认提交" style="display:none" />';
        formstr += '</form>';
        $('#formAjaxDiv').html(formstr);
		if (!Date.now) {
		    Date.now = function() { return new Date().getTime(); };
		}
		_currentPostTime = Date.now();

		$('#ajaxFormSend').submit();  
		

		

		// $.post(url, postDatas, function(result){
		// 	// _returnPost(_jsonDecode(result))
		// 	// console.log(result);
		// });
	}else{
		if(_debug){
			console.log('错误，POST参数数量不能少于3，参数形式为：pagename, kind(ajax/session), mid, param1, param2, ..., paramN');
		}
	}
}

// post data
// param(str): returnID(用于_returnPost处理), pagename, paramsDict
// paramsDict(dict): {keyKV,param1KV,param2KV,...}
function _sendSession(){
	_returnID = arguments[0];
	var pagename = arguments[1];
	var paramsDict = arguments[2];
	var mid = '0';
	var postList = [];
	if(arguments.length >= 3){
		var session = ''
		if(_checkval(_localval('session'))){
			session = _localval('session');
		}
		postList.push('kcy', mid, _access_token, session, pagename, paramsDict);
		var postParams = _jsonEncode(postList);
		var postDatas = {};
		postDatas['pid'] = 'kcy';
		postDatas['mid'] = mid;
		postDatas['params'] = postParams;
		postDatas['sign'] = _sha1('kcy&' + mid + '&' + postParams + '&' + _sha1_key);
		_currentPostTime = Date.now();
		$.post(_url_session, postDatas, function(result){
			// 回调处理(刷新当前页面或调用一个定义仔前端页面中的统一的js操作函数)
			_returnPost(_jsonDecode(result))
		});
	}else{
		if(_debug){
			console.log('错误，POST参数数量不能少于3，参数形式为：pagename, kind(ajax/session), mid, param1, param2, ..., paramN');
		}
	}
}

// post return do (请在页面中重定义该函数)
function _returnPost(result){
}

// get querystring
function _getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}

// 使用角色数据初始化页面(该函数会在载入角色数据后调用)
function _initPage() {
}

function _sha1(val){
	return (CryptoJS.SHA1(val)).toString(CryptoJS.enc.Hex);
}

/******************************
* dialog login & reg function
*/

//公用弹框
var commalertfun= function ($div,type,icon,placements,title,msg,time,isclose,event){

	var init=function(){
		loadHtml();
		$(".close").click(function(){
		   clearTimeout(colseAlert);
           colseAlert();
        });
		setTimeout(colseAlert,time);

	}

	function loadHtml(){
        var html="";
		html='<div class="alert" id="commalert">';
		if(isclose)
           html+='<a href="#" class="close" data-dismiss="alert"> &times;</a>';
		html += '<span class="glyphicon _iconfont" style="font-size:14px; margin-right:10px; top:3px;"></span><strong></strong><span class="msg"></span>'
		html+='</div>';
		$div.html(html);
		var type=type?type:"alert-warning";
		var title=title?title:"温馨提示！";
		var time=time?time:2000;
		var placement=placements ? placements:"";
		$div.find("#commalert").addClass(type);
		if(icon){
			$div.find("#commalert .glyphicon").addClass("glyphicon-"+icon);
			}
		$div.find("#commalert strong").html(title);
		$div.find("#commalert .msg").html(msg);
		var width=$div.width()/2;
	    if(placement=="top"){
			 var marginleft="-"+width+"px";
			 $div.css({
				 "top":"10px",
				 "left":50+"%",
				 "margin-left":marginleft
				 })


		}else if(placement=="bottom"){
			  var marginleft="-"+width+"px";
			   $div.css({
				 "bottom":"10px",
				 "left":50+"%",
				 "margin-left":marginleft
				 })
		}else if(placement=="topLeft"){
			  var top="10px";
			  var left="10px";
			   $div.css({
				 "top":top,
				 "left":left,
				 })

		}else if(placement=="topright"){
				   var top="10px";
			       var right="10px";
			 $div.css({
				 "top":top,
				 "right":right,
				 })

		}else if(placement=="bottomLeft"){
			  var bottom="10px";
			  var left="10px";
			  var marginleft=0;
			  $div.css({
				 "bottom":0,
				 "left":left,

				 })


		}else if(placement=="bottomright"){
				   var bottom="10px";
			       var right="10px";

				   $div.css({
				 "bottom":bottom,
				 "right":right,

				 })

		}else{
			  var pagetop=event.pageY;
		      var left=event.pageX;
			  var marginleft="-"+width+"px";
			  var scrollTop=$(document).scrollTop();
			  var top=pagetop-scrollTop+50;
			   $div.css({
				 "top":top,
				 "left":left,
				 "margin-left":marginleft
				 })


			}
	}
	function colseAlert(){
		   $("#commalert").alert('close');
		}

	init();
}

// 邮箱验证
function checkEmail(str){
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if(re.test(str)){
        return true;
    }else{
        return false;
    }
}
// 验证手机号码
function checkPhone(tel){
	//console.log(tel);
	var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	if (reg.test(tel)) {
	    return true;
	}else{
	    return false;
	}
}
// 手机号码中间4位转星
function _userPhoneStar(phone){
	var str = "";
	var str2 = "";
	if(phone!=""){
		if(checkPhone(phone)){
			str = phone;
			str2 = str.substr(0,3)+"****"+str.substr(7);
		}else{
			str2 = phone;
		}
	}
	return str2;
}
// 检查是否数字
function checkNum(a)
{
	var bol = false;
	if(a.toString()!=""){
		var reg = /^[0-9]*$/;
	    if(reg.test(a)){
	    	bol = true;
	    }
	}
	return bol;
	// if(!isNaN(a)&&a!=""){
	//    return true;
	// }else{
	//    return false;
	// }   
    // var reg = /^[0-9]*$/;
    // if(reg.test(a)){
    // 	return true;
    // }else{
    // 	return false;
    // }
}
// 时间戳转换
// timeStr时间戳
// format格式化标准 -- yyyy-MM-dd hh:mm:ss
function formatTimer(timeStr,format){
	var now = new Date(parseInt(timeStr) * 1000);
	var date = {
              "M+": now.getMonth() + 1,
              "d+": now.getDate(),
              "h+": now.getHours(),
              "m+": now.getMinutes(),
              "s+": now.getSeconds(),
              "q+": Math.floor((now.getMonth() + 3) / 3),
              "S+": now.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (now.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
       for (var k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
    return format;
}

/******************************
* 表单创建与验证
*/

// 表单元件用户输入检查用数据
// {comID:checkFuncName}
var _FormComChecks = {};

// 正则表达式库
var _regs = {
	"mobile": {"reg": "^1[0-9]{10}$","msg": "请填写正确的手机号码"}, // 手机号码
	"subDomain": {"reg": "^[a-z][a-z0-9]{5,10}$","msg": "二级域名由5-10位小写英文字母和数字组成,以字母开头)"}, // 二级域名(5-10个小写英文字母和数字,字母开头)
	"money": {"reg": "^[0-9]+$","msg": "现金以元为单位，不包含小数点"}, // 金钱(正整数)
	"code": {"reg": "^[0-9]{6}$","msg": "手机验证码由6位数字组成"}, // 手机验证码(6位数字)
	"password": {"reg": "^[a-zA-Z0-9_]{6,16}$","msg": "密码只能由6-16位英文字母和数字组成,英文字母区分大小写"}, // 密码
	"null": {"reg": "\\S","msg": "不能为空"},
	"int": {"reg": "^[0-9]*$","msg": "请填写数字"},
	"float": {"reg": "^(-?\d+)(\.\d+)?$","msg": "请填写浮点数"}
}

// 表单数据验证
function _validate(key, val){
	var reg = new RegExp(_regs[key]['reg']);
	if(!reg.test(val)){
		return false;
	}else{
		return true;
	}
}

// 图标
function _iconCom(iconName, size, color) {
	var styleStr = '';
	if (size != '') {
		styleStr = styleStr + 'font-size: ' + size + ';';
	}
	if (color != '') {
		styleStr = styleStr + 'color: ' + color + ';';
	}
	return '<i class="icon icon-' + iconName + '" style="' + styleStr + '"></i>';
}

// 文本输入框
function _inputCom(cid, placeholder) {
	var num= arguments[2] || 200;
	return '<input type="text" maxlength="' + num + '" name="' + cid + '" id="' + cid + '" class="_formcom form-control" placeholder="' + placeholder + '" style="border-radius: 0px;" />';
}

// 密码输入框
function _passCom(cid) {
	var num= arguments[1] || 200;
	return '<input type="password" maxlength="' + num + '" name="' + cid + '" id="' + cid + '" class="_formcom form-control" style="border-radius: 0px;" />';
}

// 按钮
// @size: l-lg/s-sm/m-mini/b-block
// @color: m-main/p-primary/s-success/i-info/w-warning/d-danger
function _btnCom(cid, label, size, color) {

	var sizeStr = '';
	if (size == 'l') {
		sizeStr = 'btn-lg';
	} else if (size == 's') {
		sizeStr = 'btn-sm';
	} else if (size == 'm') {
		sizeStr = 'btn-mini';
	} else if (size == 'b') {
		sizeStr = 'btn-block';
	}

	var colorStr = '';
	var styleStr = '';
	if (color == 'p') {
		colorStr = 'btn-primary';
	} else if (color == 's') {
		colorStr = 'btn-success';
	} else if (color == 'i') {
		colorStr = 'btn-info';
	} else if (color == 'w') {
		colorStr = 'btn-warning';
	} else if (color == 'd') {
		colorStr = 'btn-danger';
	} else if (color == 'm') {
		colorStr = 'btn-primary';
		styleStr = 'background-color: #00B8EE;border-color: #00B8EE;';
	}

	str = '<button id="' + cid + '" name="' + cid + '" class="btn _formcom ' + sizeStr + ' ' + colorStr + '" type="button" style="' + styleStr + '">' + label + '</button>';
	return str;
}

// 列表
// @datas: [[文本标签, 数值, 是否选中(0否1是)]]
function _selectCom(cid, datas) {
	var str = '';
	var label = '';
	var value = '';
	var isChecked = '';
	str = str + '<select id="' + cid + '" name="' + cid + '" class="form-control">';
	for (var i=0; i<datas.length; i++) {
		label = datas[i][0];
		value = datas[i][1];
		isChecked = datas[i][2];
		checkedStr = '';
		if (isChecked == '1') {
			checkedStr = ' selected="selected" ';
		}
		str = str + '<option value="' + value + '" ' + checkedStr + '>' + label + '</option>';
	}
	str = str + '</select>';
	return str;
}

// 复选按钮组
// @datas: [[文本标签, 数值, 是否选中(0否1是)]]
function _checkboxGroupCom(cid, datas) {
	var str = '';
	var label = '';
	var value = '';
	var isChecked = '';
	for (var i=0; i<datas.length; i++) {
		label = datas[i][0];
		value = datas[i][1];
		isChecked = datas[i][2];
		checkedStr = '';
		if (isChecked == '1') {
			checkedStr = ' checked ';
		}
		str = str + '<label class="_formcom checkbox-inline"> <input type="checkbox" id="' + cid + '" name="' + cid + '" class="' + cid + '_ra" value="' + value + '" ' + checkedStr + '> ' + label + ' </label>';
	}
	return str;
}

// 单选按钮组
// @datas: [[文本标签, 数值, 是否选中(0否1是)]]
function _radioGroupCom(cid, datas) {
	var str = '';
	var label = '';
	var value = '';
	var isChecked = '';
	for (var i=0; i<datas.length; i++) {
		label = datas[i][0];
		value = datas[i][1];
		isChecked = datas[i][2];
		checkedStr = '';
		if (isChecked == '1') {
			checkedStr = ' checked ';
		}
		str = str + '<label class="_formcom radio-inline"> <input type="radio" id="' + cid + '" name="' + cid + '" class="' + cid + '_ra" value="' + value + '" ' + checkedStr + '> ' + label + ' </label>';
	}
	return str;
}

// 红色的"*"必填标识
_star = '<span class="_formLabelStar">*</span>';

// 占位空格
var _space1 = ['d.1', ''];
var _space2 = ['d.2', ''];
var _space3 = ['d.3', ''];
var _space4 = ['d.4', ''];
var _space5 = ['d.5', ''];
var _space6 = ['d.6', ''];
var _space7 = ['d.7', ''];
var _space8 = ['d.8', ''];
var _space9 = ['d.9', ''];
var _space10 = ['d.10', ''];
var _space11 = ['d.11', ''];
var _space12 = ['d.12', ''];

// 空行
var _br = [['d.1', '']];

// 错误提示
function _checkInitFormErr(dataForm, i, j) {
	if (dataForm[i][j].length < 2) {
		console.log('表单第' + (i + 1) + '行，第' + (j + 1) + '个单元数据错误：', dataForm[i][j]);
	} else {
		var kca = dataForm[i][j][0].split('.');
		if (kca.length < 2) {
			console.log('表单第' + (i + 1) + '行，第' + (j + 1) + '个单元数据错误：', dataForm[i][j]);
		}
	}
}

// 初始化表单
function _initForm(formRoot, dataForm) {
	var row = '';
	var kind = '';
	var col = '';
	var align = '';
	var content = '';
	var itemStart = '';
	var item = '';
	var itemEnd = '';
	var extList = []; // mainID, cmd, param1, .., paramN
	for (var i=0; i<dataForm.length; i++) {
		row = '<div class="form-group">';
		for (var j=0; j<dataForm[i].length; j++) {
			_checkInitFormErr(dataForm, i, j);

			// 表格基本设置
			var kca = dataForm[i][j][0].split('.');
			var kind = kca[0];
			var col = kca[1];
			var styleAlign = '';
			if (kca.length == 3) {
				if (kca[2] == 'l') {
					styleAlign = 'text-align:left;';
				} else if (kca[2] == 'r') {
					styleAlign = 'text-align:right;';
				} else if (kca[2] == 'c') {
					styleAlign = 'text-align:center;';
				}
			}

			// 内容
			var content = dataForm[i][j][1];

			// 扩展参数
			var mainID = '';
			var divID = '';
			var errDiv = '';
			if (dataForm[i][j].length == 3) {
				var list = dataForm[i][j][2];
				mainID = dataForm[i][j][2][0];
				for (var k=1; k<list.length; k++) {
					var params = list[k].split('-');
					var cmd = params[0];
					switch (cmd) {
						case 'check': // 校验：check-校验正则式key
							_FormComChecks[mainID] = params[1];
							divID = 'id="' + mainID + '_div" name="' + mainID + '_div"';
							errDiv = '<div id="' + mainID + '_err" name="' + mainID + '_err" class="help-block alert alert-warning" style="padding:10px;display:none"></div>';
							break;
						case 'class': // 添加样式Class：class-样式class名称
							extList.push([mainID, cmd, params[1]]);
							break;
						case 'css': // 添加样式：css-样式名-数值
							extList.push([mainID, cmd, params[1], params[2]]);
							break;
						case 'attr': // 修改属性：attr-属性-数值
							extList.push([mainID, cmd, params[1], params[2]]);
							break;
						case 'val': // 设置默认数值：val-数值
							extList.push([mainID, cmd, params[1]]);
							break;
					}
				}
			}

			// 创建表格
			if (kind == 'dl') {
				itemStart = '<div class="col-md-' + col + ' control-label" style="' + styleAlign + '">';
				itemEnd = '</div>';
			} else if (kind == 'l') {
				itemStart = '<label class="col-md-' + col + ' control-label" style="' + styleAlign + '">';
				itemEnd = '</label>';
			} else if (kind == 'd') {
				itemStart = '<div ' + divID + ' class="col-md-' + col + '" style="' + styleAlign + '">';
				itemEnd = '</div>';
			}
			row = row + itemStart + content + errDiv + itemEnd;
		}
		row = row + '</div>';
		formRoot.append($(row));
	}
	// 在全部表单对象插入结束后，开始设置扩展属性
	for (var i=0; i<extList.length; i++) {
		var mainID = extList[i][0];
		var cmd = extList[i][1];
		var param1 = extList[i][2];
		switch (cmd) {
			case 'class': // 添加样式Class：class-样式class名称
				var param2 = extList[i][3];
				$('#' + mainID).addClass(param1, param2);
				break;
			case 'css': // 添加样式：css-样式名-数值
				var param2 = extList[i][3];
				$('#' + mainID).css(param1, param2);
				break;
			case 'attr': // 修改属性：attr-属性-数值
				var param2 = extList[i][3];
				$('#' + mainID).attr(param1, param2);
				break;
			case 'val': // 设置默认数值：val-数值
				$('#' + mainID).val(param1);
				break;
		}
	}
}

// 显示错误信息(仅用于表单内输入错误提示)
function _showerr(cid, info){
	$('#' + cid + '_div').addClass("has-error");
	$('#' + cid + '_err').html('<span class="_formErrMsg">' + info + '</span>');
	$('#' + cid + '_err').show();
}

// 清空错误信息(仅用于表单内输入错误提示)
function _clearerr(cid){
	$('#' + cid + '_div').removeClass("has-error");
	$('#' + cid + '_err').html('');
	$('#' + cid + '_err').hide();
}

// 验证表单元件
// 错误则显示错误信息，正确则关闭错误信息
// 返回true/false
function _checkFormCom(item) {
	var key = _FormComChecks[item.id];
	if (key != undefined && _regs[key] != undefined) {
		if (!_validate(key, $(item).val())) {
			_showerr(item.id, _regs[key]['msg']);
			return false;
		} else {
			_clearerr(item.id);
			return true;
		}
	}
}

// 验证表单内全部元件
function _checkFormAll() {
	var isOK = true;
	for (var key in _FormComChecks) {
		var obj = $('#' + key)[0];
		if (obj == undefined) {
			console.log('指定了错误的元件ID：' + key + '，请检查你的表单配置数据');
		}
		if (!_checkFormCom(obj)) {
			isOK = false;
		}
	}
	return isOK;
}

//表格控件
//p_id 父级ID（将生成的表单添加到此父级元素中）
//l_id 表格ID
//c_str 样式表类名
//s_str 需额外添加到表格内的样式
//t_t_lst 表格头(标题列表)
//t_t_style_lst (每列样式)
function _tableCom(p_id,l_id,isBord,c_str,s_str,t_t_lst,t_t_style_lst){
	var classStr = c_str;
	var styleStr = s_str;
	var t_thead_lst = t_t_lst;
	var tableStr = "";
	var tableBord = "";
	if(isBord){
		tableBord = "table-bordered ";
	}
	tableStr += '<table class="table '+ tableBord + classStr + '" style="text-align: center; ' + styleStr + '">';
    tableStr += '   <thead>';
    tableStr += '       <tr>';
    for(var i=0;i<t_thead_lst.length;i++){
    	var s_str = "";
    	if(typeof(t_t_style_lst[i]) != "undefined"){
    		s_str = t_t_style_lst[i];
    	}
    	tableStr += '			<th style=\"' + s_str + '\">' + t_thead_lst[i] + '</th>';
    }
    tableStr += '		<\/tr>';
    tableStr += '	<\/thead>';
    tableStr += '   <tbody id="' + l_id + '">';
    tableStr += '   <\/tbody>';
    tableStr += '<\/table>';
    $("#"+p_id).html(tableStr);
}
//更新表格数据
//data 数据源
//l_id 要更新的表格ID
//lst_style 每列样式
//lst_title 是否显示title信息(0--不显示 1--显示)
function _updateTableCom(l_id,data,lst_style,lst_title){
	var tableStr = "";
	for(var i=0;i<data.length;i++){
		tableStr += '<tr>';
		for(var e=0;e<data[i].length;e++){
			var s_str = "";
			var t_str = "";
			if(typeof(lst_style[e])!="undefined"){
				s_str = lst_style[e];
			}
			if(typeof(lst_title)[e]!="undefined"){
				if(lst_title[e]!="0"){
					t_str = data[i][e];
				}
			}
			tableStr += '	<th title="'+t_str+'" style=\'font-weight:normal!important; background-color: #fff!important; text-align: center;'+ s_str +'\'>' + data[i][e] + '</th>';
		}
    	tableStr += '<\/tr>';
    }
    $('#'+l_id).html(tableStr);
}

//翻页控件
var _pageCom = function(p_id,max_page,now_page,fun){
	var that = this;
	that.parentID = p_id;  //父级容器ID
	that.maxPage = max_page;  //最大页数
	that.nowPage = now_page;  //当前页数
	that.returnFun = fun;  //回调函数
	that.activeBg = "#FF0000!important";   //选中时背景颜色
	that.isPDisable = "";
	that.isNDisable = "";

	that.updatePage = function(){
		if(that.maxPage>1){
			var pageStr = "";
			that.isPDisable = "";
			that.isNDisable = "";
			pageStr += '<ul class="pager">';
			if(that.nowPage==1){
				that.isPDisable = "disabled";
			}
		    pageStr += '<li class="previous ' + that.isPDisable + '"><a data-id="previous" href="javascript:"><</a></li>';
		    var leng = parseInt(that.maxPage);
		    if(leng>5){
		    	//var cont = leng - that.nowPage;
		    	var indexPage =  Math.floor((parseInt(that.nowPage)-1)/5);
		    	if(indexPage!=0){
		    		pageStr += '<li><a data-id="'+(parseInt(that.nowPage)-5)+'" href="javascript:">...</a></li>';
		    	}
		    	var startPage = indexPage*5+1;
       			var endPage;
       			if((startPage+4)<=parseInt(that.maxPage)){
		        	endPage = startPage+5;
		       	}else{
		        	endPage=parseInt(that.maxPage)+1;
		       	}
		       	for(var i=startPage;i<endPage;i++ ){
			        var temp;
			        if(i==parseInt(that.nowPage)){
			      	// 当前页码有样式class='hover'
			        	pageStr += '<li class="active"><a data-id="'+i+'" style="background-color:'+that.activeBg+'" href="javascript:">' + i + '</a></li>';
			        }else{
			        	pageStr += '<li><a data-id="'+i+'" href="javascript:">' + i + '</a></li>';
			        }
		       	}
		       	if(indexPage!= Math.floor((that.maxPage-1)/5)){
		        	pageStr += '<li><a data-id="'+(parseInt(that.nowPage)+5)+'" href="javascript:">...</a></li>';
		       	}
		    }else{
		    	for(var i=1;i<=leng;i++){
			    	if(that.nowPage==i){
						pageStr += '<li class="active"><a data-id="'+i+'" style="background-color:'+that.activeBg+'" href="javascript:">' + i + '</a></li>';
			    	}else{
			    		pageStr += '<li><a data-id="'+i+'" href="javascript:">' + i + '</a></li>';
			    	}
			    }
		    }
		    if(that.nowPage==leng){
				that.isNDisable = "disabled";
		    }
		    pageStr += '<li class="next '+that.isNDisable+'"><a data-id="next" href="javascript:">></a></li>';
		    pageStr += '<\/ul>';
		    $('#'+p_id).html(pageStr);
		    $('.pager li a').each(function(index){
		    	var tempObj = $('.pager li a').get(index);
		    	var tempParent = $(tempObj).parent();
		    	if(!tempParent.hasClass('active')&&!tempParent.hasClass('disabled')){
		    		$(this).bind('click',function(){
		                that.turnPage(this);
		            });
		    	}
		    })
		}else{
			$('#'+p_id).html("");
		};
	}
	that.turnPage = function(obj){
		var btnClass = $(obj).data("id");
		var tempMaxPage = 0;
		var tempNowPage = 0;
		if(btnClass=='previous'||btnClass=='next'){
			if(btnClass=='previous'){
				tempNowPage = this.nowPage-1;
			}else{
				tempNowPage = this.nowPage+1;
			}
		}else{
			tempNowPage = parseInt(btnClass);
		}
		that.returnFun(tempNowPage);
		//that.updatePage();
	}
}

// 创建图片上传
// val->_hid{ID}
function _imgUploadCom(id) {
	var str = '<input type="hidden" id="_hidImgUrl'+id+'" value="" />';
	$('#'+id).append(str);
	KindEditor.ready(function(K) {
		var upImg = K.editor({allowFileManager : false});
		K("#"+id).click(function() {
			upImg.loadPlugin("image", function() {
				upImg.plugin.imageDialog({
					showRemote : false,
					imageUrl : K("#_hidImgUrl"+id).val(),
					clickFn : function(url, title, width, height, border, align) {
						K("#_img"+id).attr("src", url);
						K("#_hidImgUrl"+id).val(url);
						upImg.hideDialog();
					}
				});
			});
		});
	});
}

//创建多图片上传
//id -- 上传按键ID
//prenatId -- 父级容器ID
//nodeElement -- 子节点元素
//fun -- 回调函数
function _imgArrUploadCom(id,fun,parentId) {
	KindEditor.ready(function(K) {
		var returnFun = fun;
		var returnPId = parentId;
		var upImg = K.editor({allowFileManager : false});
		K("#"+id).click(function() {
			upImg.loadPlugin("image", function() {
				upImg.plugin.imageDialog({
					showRemote : false,
					clickFn : function(url, title, width, height, border, align) {
						returnFun(url,returnPId);
						upImg.hideDialog();
					}
				});
			});
		});
	});
}
//多图上传
//btId 上传按键的ID
//maxNum  最大上传图片数量
//fun  上传成功后的回调函数(返回参数为上传成功的图片路径)
function _multiImgUploadCom(btId,maxNum,fun){
	KindEditor.ready(function(K) {
		var returnFun = fun;
        var editor = K.editor({
            allowFileManager : true,  //开启多文件上传
            imageUploadLimit : maxNum
        });
        K('#'+btId).click(function() {
            editor.loadPlugin('multiimage', function() {
                editor.plugin.multiImageDialog({
                    clickFn : function(urlList) {
                        var div = K('#J_imageView');
                        returnFun(urlList);
                        K.each(urlList, function(i, data) {
                            div.append('<img src="' + data.url + '">');  //data.url是图片上传之后返回的url
                        });
                        editor.hideDialog();
                    }
                });
            });
        });
    });
}
//创建多文件上传
//id -- 上传按键ID
//fun -- 回调函数
function _fileArrUploadCom(id,fun) {
	KindEditor.ready(function(K) {
		var returnFun = fun;
		var upFile = K.editor({allowFileManager : false});
		K("#"+id).click(function() {
			upFile.loadPlugin("insertfile", function() {
				upFile.plugin.fileDialog({
					clickFn : function(url, title) {
						returnFun(url,title,id);
						upFile.hideDialog();
					}
				});
			});
		});
	});
}

// 百宝箱事件
$(function(){
	$('#_pageTopNavDropdown').mouseover(function() {
		$('.dpwnMenu').stop().fadeIn();
	});
	$('#_pageTopNavDropdown').mouseout(function() {
		$('.dpwnMenu').stop().fadeOut();
	});
});
// nav点击状态
$(function(){
    $('#nav li').click(function() {
        $(this).find('a').addClass('nowClick');
        $(this).siblings().find('a').removeClass('nowClick');
    });
});
//设置省市区三级
function _setRegion(data){
	_region_obj = {};
	_city_obj = {};
	region_lst = [];
	for(var i=0;i<data.arrID.length;i++){
		var c_obj = {};
		var city_id_lst = [];
		for(var e=0;e<data.arrID[i].ids.length;e++){

			var a_obj = {};
			var area_id_lst = [];
			for(var r=0;r<data.arrID[i].ids[e].ids.length;r++){
				a_obj.c_name = data.arrTitle[i]["c"][e]["n"];
				area_id_lst.push(data.arrID[i].ids[e].ids[r]["id"]);
				a_obj[data.arrID[i].ids[e].ids[r]["id"]] = data.arrTitle[i]["c"][e]["a"][r]["s"];
				a_obj.a_id_lst = area_id_lst;
			}
			_city_obj[data.arrID[i].ids[e]["id"]] = a_obj;
			c_obj.p_name = data.arrTitle[i]["p"];
			city_id_lst.push(data.arrID[i].ids[e]["id"]);
			c_obj.c_id_lst = city_id_lst;
			c_obj[data.arrID[i].ids[e]["id"]] = a_obj;
			_region_obj[data.arrID[i].id] = c_obj;
		}
		region_lst.push(data.arrID[i].id);
		_region_obj.p_id_lst = region_lst;
	}
}
//浮点数转换
function _floatChange(str){
	var str_arr = str.split('f');
	var num = parseInt(str_arr[0]);
	var index = parseInt(str_arr[1]);
	var cov = Math.pow(10,index);
	if(index==0){
		return num;
	}else{
		return num/cov;
	}
}
//文本显示长度设定
function _cutString(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return str;
    }
}

$(function(){
    //导航栏的css效果
    function bannerColorChange(){
	    //var string = window.location.href;
	    var string = window.location.pathname;
	    var urlstr = string.split('/');
	    // urlres = '/'+urlstr.join('/');
	    $("#nav >li >a").each(function(){
	        // if (string.indexOf($(this).attr('href')) != -1) {
	        //     $(this).addClass('nowClick');
	        // } else {
	        // 	$(this).removeClass('nowClick');
	        // }
	        var liUrlstr= $(this).attr('href');
	        var lirstr=liUrlstr.split('/');
	        if(urlstr[3]==lirstr[3]){
	        	$(this).addClass('nowClick');
	        }else{
	        	$(this).removeClass('nowClick');
	        }
	    });
    }
    	bannerColorChange();
    $('#nav').click(function(){
    	bannerColorChange();
    })
});

//
var _returnID1 = '';
function _sendAjax1(){
	_returnID1 = arguments[0];
	var mid = arguments[1];
	_mid = mid;
	var paramIdx = 2;
	paramsObj = arguments[2];
	//console.log(_returnID+"  "+_mid);
	if(arguments.length >= paramIdx){
		var session = _ajaxSession;
		// if(_checkval(_localval('session'))){
		// 	session = _localval('session');
		// }
		var postDatas = {};
		postDatas['s_pid'] = 'kcy';
		postDatas['i_mid'] = mid;
		postDatas['s_session'] = session;
		postDatas['s_token'] = _access_token;
		for (var key in paramsObj) {
            postDatas[key] = paramsObj[key];
        }
		var signSrc = '';
		for(var k in postDatas){
			if (signSrc == '') {
				signSrc = signSrc + k + '=' + postDatas[k];
			} else {
				signSrc = signSrc + '&' + k + '=' + postDatas[k];
			}
		}
		signSrc = signSrc + '&key=' + _sha1_key;
		postDatas['s_sign'] = _sha1(signSrc);
		if (!Date.now) {
		    Date.now = function() { return new Date().getTime(); };
		}
		_currentPostTime = Date.now();
		$.post(_url_service, postDatas, function(result){
			_returnPost1(_jsonDecode(result))
		});
		
	}else{
		if(_debug){
			console.log('错误，POST参数数量不能少于3，参数形式为：pagename, kind(ajax/session), mid, param1, param2, ..., paramN');
		}
	}
}

function _returnPost1(){}

//判断当前用户登陆状态
function _isLogin(){
	//console.log(_ajaxSession);
	//if(localStorage.getItem("web#kcy#session")!=""&&localStorage.getItem("web#kcy#session")!="undefined"){
	if(_ajaxSession!=""){
		return true;
	}else{
		return false;
	}
}

//消息提醒信封的功能
$(function(){
	if(_isLogin()){
		_sendAjax1("message_not_read","116");//获取数据
	}
});

//消息返回数据
function _returnPost1 (result) {
	var sta = result["i_sta"]; //返回状态 0失败  1成功
    var errStr = result["s_err"];  //返回错误信息
    var timeStr = result["i_time"];  //返回时间
	var data = {};
	if(_returnID1 == "message_not_read"){
		if(sta==1){
			$(".pay_not_read").text(result["i_pay_num"]);
			$(".system_not_read").text(result["i_system_num"]);
		}else if(sta == "0"){
			_alert("danger",errStr);
		}
		var index = 0;
		var xinfengChange;
		var check =true;
		pay_not_read = Number(result["i_pay_num"]);
		system_not_read = Number(result["i_system_num"]);
		if (pay_not_read > 0 || system_not_read > 0) {
			$('.xinfeng').css("color",'#f8b501');
			xinfengChange = setInterval(function() {
				$(".xinfeng").css("opacity",index);
				if (index ==1) {
					index = 0;
				} else {
					index = 1;
				}
			},1000/2);
		}
		$("#news_message_not_read").mouseover(function () {
			$(".xinfeng").css("opacity",1);
			clearInterval(xinfengChange);
			xinfengChange="";
			$(".message_not_read").show();
			check=false;
		}).mouseout(function(){
			check =true;
			clear_message=setTimeout(function () {
				if(check){
					$(".message_not_read").hide();
				}
			},1000)
		});
		$(".message_not_read").mouseover(function () {
			check=false;
			// $(".message_not_read").show();
		}).mouseout(function () {
			$(".message_not_read").hide();
		})
	}
}
//消息提醒信封的功能结束
function _getMoney(money,kind,number,int){
    var money=parseInt(money);
    var money0=money/number;
    var money1= money0.toFixed(int);
    if(kind=="0"){
        money1="-"+money1;
    }else if(kind=="1"){
        money1="+"+money1;
    }else{
        money1=money1;
    }
    return money1;
}
//设置省
function _setProvinceSelect(){
	var str = "";
	for(var i=0;i<_city.arrTitle.length;i++){
		var p_kind = _city.arrID[i].id;
		str += "<option value='"+p_kind+"' data-index='"+i+"'>"+_city.arrTitle[i].p+"</option>";
	}
	$("#province").html(str);
	$("#province").attr("onchange","_setCitySelect()");
    _setCitySelect();
}
//设置市
function _setCitySelect(){
	var index = document.getElementById('province').selectedIndex;
	var str = "";
	for(var i=0;i<_city.arrTitle[index].c.length;i++){
		var c_kind = _city.arrID[index].ids[i].id;
		str += "<option value='"+c_kind+"'>"+_city.arrTitle[index].c[i]["n"]+"</option>";
	}
	$("#city").html(str);
	$("#city").attr("onchange","_setAreaSelect()");
	_setAreaSelect();
}
//设置区
function _setAreaSelect(){
	var p_index = document.getElementById('province').selectedIndex;
	var c_index = document.getElementById('city').selectedIndex;
	var str = "";
	for(var i=0;i<_city.arrTitle[p_index].c[c_index].a.length;i++){
		var c_kind = _city.arrID[p_index].ids[c_index].ids[i].id;
		str += "<option value='"+c_kind+"'>"+_city.arrTitle[p_index].c[c_index].a[i]["s"]+"</option>";
	}
	$("#area").html(str);
}
//设置select组件中显示的详细省、市、区
function _setSelectProvinceName(pId,cId,aId){
	$("#province").val(pId);
	_setCitySelect();
	$("#city").val(cId);
	$("#area").val(aId);
}
//获取省份名称
function _getProvinceName(id){
	var p_name = "";
	for(var i= 0; i< _city.arrID.length; i++){
		if(_city.arrID[i].id === id ){
			p_name = _city.arrTitle[i].p
			break;
		}
	}
	return p_name;
}
//获取城市名称
function _getCityName(p_id,c_id){
	var c_name = "";
	var p_index = -1;
	var c_index = -1;
	for(var i= 0; i< _city.arrID.length; i++){
		if(_city.arrID[i].id === p_id ){
			p_index = i;
			for(var j = 0;j<_city.arrID[i].ids.length;j++){
				if(_city.arrID[i].ids[j].id === c_id ){
					c_index = j;
					break;
				}
			}
		}
	}
	if(p_index!=-1&&c_index!=-1){
		c_name = _city.arrTitle[p_index].c[c_index].n;
	}
	return c_name;
}
//获取城市名称
function _getCityNameTwo(){
	var c_id = arguments[0];
	var temp_type = "0"; 
	if(arguments.length>1){
		temp_type = "1";
	}
	var region = "";
	var p_index = -1;
	var c_index = -1;
	if(c_id=="500000"){
		region = "重庆市";
	}else if(c_id=="310000"){
		region = "上海市";
	}else{
		for(var i= 0; i< _city.arrID.length; i++){
			for(var j = 0;j<_city.arrID[i].ids.length;j++){
				if(_city.arrID[i].ids[j].id === c_id ){
					p_index = i;
					c_index = j;
					break;
				}
			}
		}
		if(p_index!=-1&&c_index!=-1){
			if(temp_type=="0"){
				region = _city.arrTitle[p_index].p;
				region += _city.arrTitle[p_index].c[c_index].n;
			}else{
				region = _city.arrTitle[p_index].c[c_index].n;
			}		
		}
	}
	return region;
}
//获取区名称
function _getAreaName(p_id,c_id,a_id){
	var a_name = "";
	var p_index = -1;
	var c_index = -1;
	var a_index = -1;
	for(var i= 0; i< _city.arrID.length; i++){
		if(_city.arrID[i].id === p_id ){
			p_index = i;
			for(var j = 0;j<_city.arrID[i].ids.length;j++){
				if(_city.arrID[i].ids[j].id === c_id ){
					c_index = j;
					for(var q=0;q<_city.arrID[i].ids[j].ids.length;q++){
						if(_city.arrID[i].ids[j].ids[q].id === a_id ){
							a_index = q;
							break;
						}
					}
				}
			}
		}
	}
	if(p_index!=-1&&c_index!=-1&&a_index!=-1){
		a_name = _city.arrTitle[p_index].c[c_index].a[a_index].s;
	}
	return a_name;
}
//多类型文件上传
function _uploadsFile(uploadsBtnId,fun){
	var that = this;
	that.returnFun = fun;  //回调函数
	var str = "";
	str += '<div style="position: relative; cursor: pointer; overflow: hidden; width: 70px;">';
    str += '    <input type="button" class="btn btn-primary img-cutter-submit crop-btn-radius" style="height: 25px; width: 70px; padding: 0; margin-top: 7px;" value="上传文件" />';
    str += '	<form id="'+uploadsBtnId+'form" method="post" enctype="multipart/form-data" action="'+ _link_url + '/kcy/adm/assets/kindeditor/php/upload_json.php" style="width: 24px;">';
    str += '    	<input type="file" style="cursor: pointer; top:0; right:0; padding:0; margin:0; border: 0 none; opacity: 0; filter: alpha(opacity=0); z-index: 2; font-size: 60px; position: absolute;" name="imgFile" id="'+ uploadsBtnId +'" value="" tabindex="-1" />';
    str += '	</form>';
    str += '    <input type="hidden" name="'+uploadsBtnId+'_file_url" id="'+uploadsBtnId+'_file_url" value="">';
    str += '    <input type="hidden" name="'+uploadsBtnId+'_file_name" id="'+uploadsBtnId+'_file_name" value="">';
    str += '</div>';
    $("#"+uploadsBtnId).replaceWith(str);
    $("#"+uploadsBtnId).change(function(){
    	$("#" + uploadsBtnId + "form").ajaxSubmit({
            type: "post",
            url: _link_url + '/kcy/adm/assets/kindeditor/php/upload_json.php?dir=file',
            enctype: 'multipart/form-data',
            success: function (data) {
            	//console.log(data);
            	// alert(data);
            	// return;
            	var temp_data = _jsonDecode(data.toString());
            	if(temp_data['error']==0){
            		$("#"+uploadsBtnId+"_file_url").val(temp_data.url);
            		$("#"+uploadsBtnId+"_file_name").val(temp_data.url);
            	}else{
            		alert(temp_data.message);
            	}
            	that.returnFun(temp_data);
            }
    	});
    });
}
//创建二维码
//二维码显示容器ID
//生成的二维码宽高
var _qrcode= function (codeBoxId){
	var temp_div = document.getElementById(codeBoxId);
	var w = parseInt(temp_div.style.width);
	var h = parseInt(temp_div.style.height);
	var aling_center_h = (h-30)/2;
	var aling_center_w = (w-30)/2;
	$('#'+codeBoxId).append('<div id="codeico" style="position:fixed;_position:absolute; border-radius:3px; margin-left:'+aling_center_w+'px;margin-top:'+aling_center_h+'px;z-index:99999997;width:30px; height:30px;background:url(/kcy/comm/images/qrlogo30.png) no-repeat;"></div>');
	this.qrcode = new QRCode(temp_div, {
		width : w,
		height : h,
		correctLevel:0
	});
	//qrcode.makeCode(elText.value);
}
//html符号转义
function _htmlEncode(str){
	var s = "";
	if(str!=""){
		s = str.replace(/[<>&"'{}\[\/\\]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":"&sbquo;","{":"","}":"","[":"","/":"&frasl;","\\":"&nbsp;","]":""}[c];});
    	s = s.replace(/\r?\n/g,"<br />");
	}    
    return s;
}
//符号转义html
function _htmlDecode(str){
	var isBr = arguments[1]?true:false;
	var s = "";
	if(str!=""){
		s = str.replace(/&amp;/g,"&");
		s = s.replace(/&lt;/g,"<");
		s = s.replace(/&gt;/g,">");
		s = s.replace(/&frasl;/g,"\/");
		s = s.replace(/&sbquo;/g,"\'");
		s = s.replace(/&quot;/g,"\"");
		if(isBr){
			s = s.replace(/\<br \/\>/g,"\n");
		}
	}
	//s = s.replace(/\<br \/\>/g,"\n");
    return s;
}
//unicode转字符串
function _unicode2Chr(str) { 
 	if ('' != str) { 
	  	var st, t, i 
	  	st = ''; 
	  	for (i = 1; i <= str.length/4; i ++){ 
		   	t = str.slice(4*i-4, 4*i-2); 
		   	t = str.slice(4*i-2, 4*i).concat(t); 
		   	st = st.concat('%u').concat(t); 
  		} 
  		st = unescape(st); 
  		return(st); 
 	} 
 	else 
  		return(''); 
} 
//敏感词屏蔽
//false 包含敏感词
//true 未搜索到敏感词
function _lexiconFun(vStr) {
	var divObj = arguments[1]?arguments[1]:null;
	//document.getElementById("textContent").innerHTML=content.replace(exp,function(sMatch){   return sMatch.replace(/./g,"*"); });
	var exp = eval("/"+lexiconStr+"/gi");
	var returnBol = true;
	var errMsglst = [];
	if(""!=vStr){
		if(exp.test(vStr)){			
			if(divObj!=null){	
				divObj.val(vStr.replace(exp,function(sMatch){
					if(errMsglst.indexOf(sMatch)==-1){
						errMsglst.push(sMatch);
					}
					return sMatch.replace(/./g,"*"); 
				}));
				var errMsg = "";
				for(var i=0;i<errMsglst.length;i++){
					errMsg +='<span style="color:red;">“'+errMsglst[i]+'”</span>,'; 
				}				  		
				_commTips("您输入的信息中含有"+errMsg+"等不当词汇！");	
				//document.getElementById(divId).innerHTML=vStr.replace(exp,function(sMatch){console.log(sMatch);   return sMatch.replace(/./g,"<span style='color:red'>"+sMatch+"</span>"); });
			}			
			returnBol = false;
		}
	}	
	return returnBol;
}

//敏感词屏蔽(html)
//false 包含敏感词
//true 未搜索到敏感词
function _lexiconHtmlFun(vStr) {
	var divObj = arguments[1]?arguments[1]:null;
	var parentName = arguments[1]?arguments[2]:"";
	//document.getElementById("textContent").innerHTML=content.replace(exp,function(sMatch){   return sMatch.replace(/./g,"*"); });
	var exp = eval("/"+lexiconStr+"/gi");
	var returnBol = true;
	var errMsglst = [];
	if(""!=vStr){
		if(exp.test(vStr)){			
			if(divObj!=null){	
				divObj.html(vStr.replace(exp,function(sMatch){
					if(errMsglst.indexOf(sMatch)==-1){
						errMsglst.push(sMatch);
					}
					return sMatch.replace(/./g,"*"); 
				}));
				var errMsg = "";
				for(var i=0;i<errMsglst.length;i++){
					errMsg +='<span style="color:red;">“'+errMsglst[i]+'”</span>,'; 
				}				  		
				_commTips("<span style='color:red'>" + parentName + "</span>输入的信息中含有"+errMsg+"等不当词汇！");	
				//document.getElementById(divId).innerHTML=vStr.replace(exp,function(sMatch){console.log(sMatch);   return sMatch.replace(/./g,"<span style='color:red'>"+sMatch+"</span>"); });
			}			
			returnBol = false;
		}
	}	
	return returnBol;
}