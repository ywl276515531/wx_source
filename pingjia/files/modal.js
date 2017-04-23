var strVar = "";
    strVar += "<div class=\"modal fade\" id=\"applyErr\" tabindex=\"-1\" role=\"dialog\"";
    strVar += "   aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">";
    strVar += "   <div class=\"modal-dialog\" style=\"width: 753px;padding: 0;\">";
    strVar += "      <div class=\"modal-content\">";
    strVar += "         <div class=\"modal-header\" style=\"width: 751px;height: 30px; background-color: #2db0b8;\">";
    strVar += "            <button type=\"button\" class=\"close\" style=\"margin-top: -10px;\" data-dismiss=\"modal\" aria-hidden=\"true\">×<\/button>";
    strVar += "         <\/div>";
    strVar += "         <div class=\"modal-body\" style=\"width: 751px;background-color: #fff;padding: 20px 0;\">";
    strVar += "         <\/div>";
    strVar += "      </div>";
    strVar += "   <\/div>";
    strVar += "<\/div>";
    strVar += "<div class=\"modal fade\" id=\"urlErrTS\" tabindex=\"\" role=\"dialog\" aria-labelledby=\"myModalLabel12\" aria-hidden=\"true\">";
    strVar += "    <div class=\"modal-dialog\">";
    strVar += "        <div class=\"modal-content\">";
    strVar += "            <div class=\"modal-header\" style=\"background: #666;height:40px;\">";
    strVar += "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" style=\" margin-top: -5px;\">";
    strVar += "                            &times;";
    strVar += "                <\/button>";
    strVar += "                <h4 class=\"modal-title\" id=\"myModalLabel12\" style=\"color: #ffffff; margin-top: -10px; font-size: 20px !important; font-weight: 400!important;\" >温馨提示<\/h4>";
    strVar += "            <\/div>";
    strVar += "            <div class=\"modal-body\">";
    strVar += "                <div class=\"main_content\" style=\"height: 200px; width: 100%; text-align: center; font-size: 20px; line-height: 200px;\">";
    strVar += "                    产权交易模块正在建设中，敬请期待！";
    strVar += "                <\/div>";
    strVar += "            <\/div>";
    strVar += "        <\/div>";
    strVar += "    <\/div>";
    strVar += "<\/div>";
    document.write(strVar);

function _errPopUp(){
	var strVar1 = "";
	strVar1 += "<div id=\"fixd\">";
	strVar1 += "    <div class=\"max_mask\"><\/div>";
	strVar1 += "    <div class=\"prompt\">";
	strVar1 += "        <p class=\"p1\">温馨提示<\/p>";
	strVar1 += "        <div class=\"fix_cen\">";
	strVar1 += "            <p class=\"p3\">该模块正在调试中，待调试完成后即会开放体验，对您带来的不便敬请谅解！<\/p>";
	strVar1 += "        <\/div>";
	strVar1 += "        <p class=\"p2\"><a class=\"aBtn close1\">关闭<\/a><\/p>";
	strVar1 += "    <\/div>";
	strVar1 += "<\/div>";
	$('body').append(strVar1);
	$(".close1").click(function(){
		$("#fixd").remove();
	});
}
function _errPopUp1(){
	var strVar1 = "";
	strVar1 += "<div id=\"fixd\">";
	strVar1 += "    <div class=\"max_mask\"><\/div>";
	strVar1 += "    <div class=\"prompt\">";
	strVar1 += "        <p class=\"p1\">温馨提示<\/p>";
	strVar1 += "        <div class=\"fix_cen\">";
	strVar1 += "            <p class=\"p3\">产权交易模块正在建设中，对您带来的不便敬请谅解！<\/p>";
	strVar1 += "        <\/div>";
	strVar1 += "        <p class=\"p2\"><a class=\"aBtn close1\">关闭<\/a><\/p>";
	strVar1 += "    <\/div>";
	strVar1 += "<\/div>";
	$('body').append(strVar1);
	$(".close1").click(function(){
		$("#fixd").remove();
	});
}

function _errPopUp2(){
	var strVar = "";
	strVar += "<div id=\"fiexd\">";
    strVar += "        <div class=\"fiexd\"><\/div>";
    strVar += "        <div class=\"fie_cen\">";
    strVar += "            <div class=\"top_img1\">温馨提示<a class=\"close2\">×<\/a><\/div>";
    strVar += "            <div class=\"cen_nr\">该模块正在开发中，敬请期待！<\/div>";
    strVar += "            <button class=\"public_btn_a close2\">确定<\/button>";
    strVar += "        <\/div>";
    strVar += "    <\/div>";
	$('body').append(strVar);
	$(".close2").click(function(){
		$(this).parents("#fiexd").remove();
	});
}

//登陆跳转
function _jumpLogin(tips_str) {
	var strVar = "";
	strVar += "<div id=\"fiexd\">";
    strVar += "        <div class=\"fiexd\"><\/div>";
    strVar += "        <div class=\"fie_cen\">";
    strVar += "            <div class=\"top_img1\">温馨提示<a class=\"close2\">×<\/a><\/div>";
    strVar += "            <div class=\"cen_nr\">"+tips_str+"<\/div>";
    strVar += "            <button class=\"public_btn_a ok\">确定<\/button>";
    strVar += "        <\/div>";
    strVar += "    <\/div>";
	$('body').append(strVar);
	$(".close2").click(function() {
		$("#fiexd").remove();
	});
	$(".ok").click(function() {
		document.location.href = "http://sso.wfyizhan.com:20160/sso/api/login?service=http://www.wfyizhan.com/kcy/web/index.php";
		$("#fiexd").remove();
	});
}

//登陆跳转
function _jumpLoginUrl(tips_str, url_str) {
	var strVar = "";
	strVar += "<div id=\"fiexd\">";
    strVar += "        <div class=\"fiexd\"><\/div>";
    strVar += "        <div class=\"fie_cen\">";
    strVar += "            <div class=\"top_img1\">温馨提示<a class=\"close2\">×<\/a><\/div>";
    strVar += "            <div class=\"cen_nr\">"+tips_str+"<\/div>";
    strVar += "            <button class=\"public_btn_a ok\">确定<\/button>";
    strVar += "        <\/div>";
    strVar += "    <\/div>";
	$('body').append(strVar);
	$(".close2").click(function() {
		$("#fiexd").remove();
	});
	$(".ok").click(function() {
		document.location.href = url_str;
		$("#fiexd").remove();
	});
}

//公用提示框
// tips_str 提示文字信息
// fun 确定后的返回函数
function _commTips(tips_str, fun) {
	var strVar = "";
	strVar += "<div id=\"fiexd\">";
    strVar += "        <div class=\"fiexd\"><\/div>";
    strVar += "        <div class=\"fie_cen\">";
    strVar += "            <div class=\"top_img1\">温馨提示<a class=\"close2\">×<\/a><\/div>";
    strVar += "            <div class=\"cen_nr\">"+tips_str+"<\/div>";
    strVar += "            <button class=\"public_btn_a ok\">确定<\/button>";
    strVar += "        <\/div>";
    strVar += "    <\/div>";
	$('body').append(strVar);
	$(".close2").click(function() {
		$("#fiexd").remove();
	});
	$(".ok").click(function() {
		fun;
		$("#fiexd").remove();
	});
}

$(function(){
    $('#applyErr,#urlErrTS').on('show.bs.modal', centerModals);
    $(window).on('resize', centerModals);
});
function centerModals() {
    $('#applyErr,#urlErrTS').each(function(i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top);
    });
}

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

//sliderbar
var sliderBarFun=function(ids){
	var init=function(){
		loadHtml();
		$('#myModal').on('show.bs.modal', centerModals);
		$(window).on('resize', centerModals);
		//返回顶部
		$(".aside>.icons .top").click(function() {
			$("html,body").animate({
				scrollTop: 0
			}, 500);
		})
	};
	function loadHtml(){
		var strVar = "";
		strVar += " <style type=\"text/css\">";
		strVar += "        #asideBar textarea {";
		strVar += "            resize: none;";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar a:hover {";
		strVar += "            text-decoration: none;";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar .close:focus,";
		strVar += "        #asideBar .close:hover {";
		strVar += "            color: #ff0000;";
		strVar += "            text-decoration: none;";
		strVar += "            cursor: pointer;";
		strVar += "            filter: alpha(opacity=50);";
		strVar += "            opacity: .5;";
		strVar += "            -webkit-transition: -webkit-transform 2s ease-out;";
		strVar += "            -moz-transition: -moz-transform 2s ease-out;";
		strVar += "            -o-transition: -o-transform 2s ease-out;";
		strVar += "            -ms-transition: -ms-transform 2s ease-out;";
		strVar += "            -webkit-transform: rotateZ(360deg);";
		strVar += "            -moz-transform: rotateZ(360deg);";
		strVar += "            -o-transform: rotateZ(360deg);";
		strVar += "            -ms-transform: rotateZ(360deg);";
		strVar += "            transform: rotateZ(360deg);";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar .aside {";
		strVar += "            position: fixed;";
		strVar += "            bottom: 100px;";
		strVar += "            right: 1%;";
		strVar += "            width: 40px;";
		strVar += "            z-index: 100;";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar .aside .icons {";
		strVar += "            width: 40px;";
		strVar += "            height: 40px;";
		strVar += "            display: block;";
		strVar += "            background-color: #fff;";
		strVar += "            border: 1px solid #999;";
		strVar += "            margin-top: 10px;";
		strVar += "            overflow: hidden;";
		strVar += "            position:relative;";
		strVar += "            cursor:pointer;";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar .aside .icons .tb {";
		strVar += "            width: 38px;";
		strVar += "            height: 38px;";
		strVar += "            display: block;";
		strVar += "            color: #00b8ee;";
		strVar += "            border: 0;";
		strVar += "            margin: 0;";
		strVar += "            padding: 0;";
		strVar += "            text-align: center;";
		strVar += "            line-height: 38px;";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar .aside .ewm {";
		strVar += "            width: 40px;";
		strVar += "            height: 40px;";
		strVar += "            display: block;";
		strVar += "            color: #fff;";
		strVar += "            text-align: center;";
		strVar += "            line-height: 40px;";
		strVar += "            background-color: #00b8ee;";
		strVar += "            margin-top: 10px;";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar .aside .qrcode {";
		strVar += "            width: 132px;";
		strVar += "            height: 162px;";
		strVar += "            position:absolute;";
		strVar += "            top:60px;";
		strVar += "            right:50px;";
		strVar += "            background-color: #fff;";
		strVar += "            border:#999 solid 1px;";
		strVar += "            display:none;";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar .aside .qrcode img{";
		strVar += "            text-align: center;";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar .aside .qrcode p{";
		strVar += "            text-align: center;";
		strVar += "        }";
		strVar += "";
		strVar += "";
		strVar += "        #asideBar .aside .icons .fonttext {";
		strVar += "            width: 38px;";
		strVar += "            height: 38px;";
		strVar += "            display: block;";
		strVar += "            background-color: #00b8ee;";
		strVar += "            font-size: 12px;";
		strVar += "            color: #fff;";
		strVar += "            text-align: center;";
		strVar += "            padding-top: 2px;";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar .main_content {";
		strVar += "            position: relative;";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar .main_content .up_img {";
		strVar += "            position: absolute;";
		strVar += "            bottom: 30px;";
		strVar += "            left: 30px;";
		strVar += "            width: 130px;";
		strVar += "            height: 90px;";
		strVar += "            border: 1px solid #dddddd;";
		strVar += "            text-align: center;";
		strVar += "            font-size: 12px;";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar .main_content .up_img .up_img_add {";
		strVar += "            color: #dddddd;";
		strVar += "            margin-top: 20px;";
		strVar += "            font-size: 18px;";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar .main_content .up_img .up_img_font {";
		strVar += "            color: #e5e5e5;";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar .star {";
		strVar += "            font-size: 14px;";
		strVar += "            color: #ff0000;";
		strVar += "            margin-right: 5px;";
		strVar += "            margin-top: 5px;";
		strVar += "            height: 16px;";
		strVar += "            line-height: 16px;";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar .modal-footernew {";
		strVar += "            border-top: none;";
		strVar += "        }";
		strVar += "";
		strVar += "";
		strVar += "        #asideBar .modal-footernew a{";
		strVar += "            width:120px;";
		strVar += "            height:40px;";
		strVar += "            display:block;";
		strVar += "            float:left;";
		strVar += "            color:#999;";
		strVar += "            text-align: center;";
		strVar += "            line-height: 40px;";
		strVar += "";
		strVar += "        }";
		strVar += "";
		strVar += "        #asideBar a.btnAct{";
		strVar += "            background-color: #00b8ee;";
		strVar += "            color:#fff;";
		strVar += "            margin-left: 180px;";
		strVar += "        }";
		strVar += "";
		strVar += "";
		strVar += "    <\/style>";
		strVar += "    <div id=\"asideBar\">";
		strVar += "        <div class=\"aside\">";
		strVar += "            <a class=\"icons\" href='tencent://message/?uin=480001896&Site=www.wfyizhan.com&Menu=yes' onmouseover=\"tbon_1()\" onmouseout=\"tbout_1()\">";
		strVar += "                <span id=\"tb1\" class=\"icon-2x icon-user  _iconfont tb\"><\/span>";
		strVar += "                <span class=\"fonttext\">在线<br>客服<\/span>";
		strVar += "            <\/a>";
		strVar += "            <a class=\"icons tishi\"  onmouseover=\"tbon_2()\" onmouseout=\"tbout_2()\">";
		strVar += "                <span id=\"tb2\" class=\"icon-2x icon-pencil  _iconfont tb\"><\/span>";
		strVar += "                <span class=\"fonttext\">意见<br>反馈<\/span>";
		strVar += "            <\/a>";
		strVar += "            <a class=\"icon-2x icon-qrcode _iconfont ewm\"  onmouseover=\"tbon_4()\" onmouseout=\"tbout_4()\"><\/a>";
		strVar += "            <div id=\"tb4\" class=\"qrcode\">";
		strVar += '                <img src="/kcy/comm/images/microcode.png" height="129" width="130" alt="">';
		strVar += "                <p>时刻关注微服<\/p>";
		strVar += "            <\/div>";
		strVar += "            <a class=\"icons\" onmouseover=\"tbon_3()\" onmouseout=\"tbout_3()\">";
		strVar += "                <span id=\"tb3\" class=\"icon-2x icon-chevron-up  _iconfont tb\"><\/span>";
		strVar += "                <span class=\"fonttext top\">返回<br>顶部<\/span>";
		strVar += "            <\/a>";
		strVar += "        <\/div>";
		strVar += '        <div class="modal fade" id="myModal" tabindex="" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
		strVar += '            <div class="modal-dialog" style="width:572px;">';
		strVar += '                <div class="modal-content" style="width:570px;">';
		strVar += '                    <div class="modal-header" style="width:570px;">';
		strVar += "                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">";
		strVar += "                            &times;";
		strVar += "                        <\/button>";
		strVar += "                        <h4 class=\"modal-title\" id=\"myModalLabel\">";
		strVar += "                        意见反馈";
		strVar += "                        <\/h4>";
		strVar += "                    <\/div>";
		strVar += '                    <div class="modal-body" style="width:570px;">';
		strVar += "                        <div class=\"main_content\">";
		strVar += "                            <div class=\"form-group\">";
		strVar += "                                <label><span class=\"star\">*<\/span>反馈内容<\/label>";
		strVar += "                                <textarea class=\"form-control\" rows=\"10\" placeholder=\"请输入您的问题描述或建议，您的意见将帮助我们改进产品及服务，1000字以内。\"><\/textarea>";
		strVar += "                            <\/div>";
		strVar += "                            <div class=\"up_img\">";
		strVar += "                                <p class=\"up_img_add\">+<\/p>";
		strVar += "                                <p class=\"up_img_font\">上传图片<\/p>";
		strVar += "                            <\/div>";
		strVar += "                        <\/div>";
		strVar += "                        <p style=\"color: #ff0000\">请填写反馈内容<\/p>";
		strVar += "                        <p><span class=\"star\">*<\/span><span>QQ号码<\/span><\/p>";
		strVar += "                        <div class=\"form-group\">";
		strVar += "                            <input type=\"text\" class=\"form-control\" style=\"width: 60%\" placeholder=\"留下您的联系方式方便我们联系到您\">";
		strVar += "                        <\/div>";
		strVar += "                    <\/div>";
		strVar += '                    <div class="modal-footer modal-footernew" style="width:570px;">';
		strVar += '                        <a class="button button-primary button-pill button-small btnAct" data-dismiss="modal">关闭</a>';
		strVar += '                        <a class="button  button-caution button-pill button-small" data-dismiss="modal">提交</a>';
		strVar += "                    <\/div>";
		strVar += "                <\/div>";
		strVar += "            <\/div>";
		strVar += "        <\/div>";
		strVar += "    <\/div>";
		$("#"+ids).html(strVar);
		$(".tishi").click(function(){
			 _errPopUp();
		})
	}
	//模太框垂直居中
	function centerModals() {
		$('#myModal').each(function(i) {
			var $clone = $(this).clone().css('display', 'block').appendTo('body');
			var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
			top = top > 0 ? top : 0;
			$clone.remove();
			$(this).find('.modal-content').css("margin-top", top);
		});
	}
	init();
};
function tbon_1() {
	document.getElementById('tb1').style.display = 'none';
};

function tbout_1() {
	document.getElementById('tb1').style.display = 'block';
};

function tbon_2() {
	document.getElementById('tb2').style.display = 'none';
};

function tbout_2() {
	document.getElementById('tb2').style.display = 'block';
};

function tbon_3() {
	document.getElementById('tb3').style.display = 'none';
};

function tbout_3() {
	document.getElementById('tb3').style.display = 'block';
};
function tbon_4() {
	document.getElementById('tb4').style.display = 'block';
};

function tbout_4() {
	document.getElementById('tb4').style.display = 'none';
};

// 商品页脚
function _shoppingGuide(){
	var strVar = '';
    strVar += '    <div style="border-top: 1px solid #000;"></div>';
    strVar += '    <div class="container">';
    strVar += '        <div class="_guideBox">';
    strVar += '            <div class="_imgBox">';
    strVar += '                <ul class="imggroup">';
    strVar += '                    <li class="marginRight100">';
    strVar += '                        <img class="center-block" src="http://www.wfyizhan.com/kcy/web/_global/buytrue.png" alt="">';
    strVar += '                        <p class="text-center">正品采购</p>';
    strVar += '                    </li>';
    strVar += '                    <li class="marginRight100">';
    strVar += '                        <img class="center-block" src="http://www.wfyizhan.com/kcy/web/_global/buysafe.png" alt="">';
    strVar += '                        <p class="text-center">正品保障</p>';
    strVar += '                    </li>';
    strVar += '                    <li class="marginRight100">';
    strVar += '                        <img class="center-block" src="http://www.wfyizhan.com/kcy/web/_global/goodsend.png" alt="">';
    strVar += '                        <p class="text-center">专业配送</p>';
    strVar += '                    </li>';
    strVar += '                    <li class="marginRight100">';
    strVar += '                        <img class="center-block" src="http://www.wfyizhan.com/kcy/web/_global/bestservice.png" alt="">';
    strVar += '                        <p class="text-center">金牌服务</p>';
    strVar += '                    </li>';
    strVar += '                    <li class="marginRight100">';
    strVar += '                        <img class="center-block" src="http://www.wfyizhan.com/kcy/web/_global/trust.png" alt="">';
    strVar += '                        <p class="text-center">万千信赖</p>';
    strVar += '                    </li>';
    strVar += '                    <li>';
    strVar += '                        <img class="center-block" src="http://www.wfyizhan.com/kcy/web/_global/honour.jpg" alt="">';
    strVar += '                        <p class="text-center">权威荣誉</p>';
    strVar += '                    </li>';
    strVar += '                </ul>';
    strVar += '            </div>';
    strVar += '            <div class="_helpBox">';
    strVar += '                <ul>';
    strVar += '                    <li class="marginRight15">';
    strVar += '                        <ul class="helpMain">服务保障';
    strVar += '                            <li class="top30">保证原创</li>';
    strVar += '                            <li>保证完成</li>';
    strVar += '                            <li>保证维护</li>';
    strVar += '                            <li>保证提供源码</li>';
    strVar += '                        </ul>';
    strVar += '                    </li>';
    strVar += '                    <li class="marginRight15">';
    strVar += '                        <ul class="helpMain">购物指南';
    strVar += '                            <li class="top30">购物演示</li>';
    strVar += '                            <li>订单操作</li>';
    strVar += '                            <li>会员注册</li>';
    strVar += '                            <li>账户管理</li>';
    strVar += '                            <li>收货样品</li>';
    strVar += '                            <li>会员等级</li>';
    strVar += '                        </ul>';
    strVar += '                    </li>';
    strVar += '                    <li class="marginRight15">';
    strVar += '                        <ul class="helpMain">支付方式';
    strVar += '                            <li class="top30">23家主流网银支付</li>';
    strVar += '                            <li>支付宝、银联等支付</li>';
    strVar += '                            <li>信用卡支付</li>';
    strVar += '                        </ul>';
    strVar += '                    </li>';
    strVar += '                    <li class="marginRight15">';
    strVar += '                        <ul class="helpMain">配送方式';
    strVar += '                            <li class="top30">配送范围及运费</li>';
    strVar += '                            <li>验货及签收</li>';
    strVar += '                        </ul>';
    strVar += '                    </li>';
    strVar += '                    <li>';
    strVar += '                        <ul class="helpMain">售后服务';
    strVar += '                            <li class="top30">退货政策</li>';
    strVar += '                            <li>退货流程</li>';
    strVar += '                            <li>退款方式和时效</li>';
    strVar += '                        </ul>';
    strVar += '                    </li>';
    strVar += '                </ul>';
    strVar += '            </div>';
    strVar += '        </div>';
    strVar += '    </div>';
	$('#_shoppingGuide').html(strVar);
};


// 公用测试提示弹窗
function _publicPop(){
	var strVar = '';
	strVar += '<div class="container">';
	strVar += '    <div class="modal fade" id="_publicTips">';
	strVar += '        <div class="modal-dialog">';
	strVar += '            <div class="modal-content">';
	strVar += '                <div class="modal-header">';
	strVar += '                    <h4 class="modal-title">温馨提示</h4>';
	strVar += '                </div>';
	strVar += '                <div class="modal-body">';
	strVar += '                    <p>该模块正在调试中，待调试完成后即会开放体验，对您带来的不便敬请谅解！</p>';
	strVar += '                </div>';
	strVar += '                <div class="modal-footer">';
	strVar += '                    <button type="button" class="btn btn-default" onclick="historyWin()">关闭</button>';
	strVar += '                </div>';
	strVar += '            </div>';
	strVar += '        </div>';
	strVar += '    </div>';
	strVar += '</div>';
	strVar += '<script>';
	strVar += '    $(document).ready(function() {';
	strVar += '        $("#_publicTips").modal({backdrop: "static", keyboard: false})';
	strVar += '    });';
	strVar += '    function historyWin(){';
	strVar += '        history.go(-1);';
	strVar += '    };';
	strVar += '</script>';
	$("#_publicPop").html(strVar);
};