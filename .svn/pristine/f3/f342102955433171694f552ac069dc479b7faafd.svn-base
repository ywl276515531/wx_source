$(document).ready(function() { _initPage(); })
function _initPage(){      
    if (action=='open') {
        _setProvinceSelect(); //获取城市列表
    }
	 $(document).on('click', '.selectBox>li', function() {
            var select_len = $('.selected').length;
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                if (select_len < 5) {
                    $(this).addClass('selected');
                } else {
                    alert('最多只能选择5个经营范围');
                }
            };
        }); 

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
}
 // 城市
    function _setProvinceSelect() {
        var str = "<option value='0' data-index='-1'>全部</option>";
        for (var i = 0; i < _city.arrTitle.length; i++) {
            var p_kind = _city.arrID[i].id;
            str += "<option value='" + p_kind + "' data-index='" + i + "'>" + _city.arrTitle[i].p + "</option>";
        }
        $("#province").html(str);
        $("#province").attr("onchange", "_setCitySelect()");
        _setCitySelect();
    }
    //城市改变
    function _setCitySelect() {
        //console.log(document.getElementById('province').selectedIndex);
        var index = document.getElementById('province').selectedIndex - 1;
        var str = "<option value='" + $("#province").val() + "' data-index='-1'>全部</option>";
        if (index != -1) {
            for (var i = 0; i < _city.arrTitle[index].c.length; i++) {
                var c_kind = _city.arrID[index].ids[i].id;
                str += "<option value='" + c_kind + "'>" + _city.arrTitle[index].c[i]["n"] + "</option>";
            }
        }
        $("#city").html(str);
        // $("#city").attr("onchange", "citySelect()");
    }
    function sendAjax(res){
        //alert('支付成功!');
        var postList=getData(res);
        $.post("http://www.wfyizhan.com/servicephp",postList,function(result){
            var json_result=JSON.parse(result);
            if (json_result['i_sta']=='1') {
                window.location="shop.php";
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
            dataArr['s_session']=s_session;
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
    function a_up(){
        $('.page_content').hide();
        $('.lo').show().css('opacity','0');
        $('.lo').animate({opacity:'1'});
    }
    function cancle(){
        $('.lo').hide();
        $('.page_content').show().css('opacity','0');
        $('.page_content').animate({opacity:'1'});
    }
    function no_img(){
        $('.page_content').hide();
        $('.img_select').show().css('opacity','0');
        $('.img_select').animate({opacity:'1'});
    }
    function img_cancle(){
        $('.img_select').hide();
        $('.page_content').show().css('opacity','0');
        $('.page_content').animate({opacity:'1'});
    }
    function select_img(){
        var img_url=$('.img_top .img_selected').attr('src');
        $('.img_select').hide();
        $('.page_content').show().css('opacity','0');
        $('.page_content').animate({opacity:'1'});
        $('.upload_img img').attr('src',img_url);
    }
    $('.img_top img').click(function(){
        $('.img_top img').removeClass('img_selected');
        $(this).addClass('img_selected');
    });
    function img_upload(){
        if($('#inputfile').val()==''){
            alert('请选择图片');
            return;
        }
        //创建FormData对象
         var data = new FormData();
         //为FormData对象添加数据
         //
         $.each($('#inputfile')[0].files, function(i, file) {
             data.append('imgFile', file);
         }); 
         $.ajax({
             url:'http://www.wfyizhan.com/kcy/adm/assets/kindeditor/php/upload_json.php',
             type:'POST',
             data:data,
             cache: false,
             contentType: false,    //不可缺
             processData: false,    //不可缺
             success:function(data){
                 var json_data=JSON.parse(data);
                 $('.upload_img img').attr('src',json_data['url']);
                 cancle();
             }
         });
    }
    $('#submit').click(function(){
        var zh=new RegExp(lexiconStr,'g');
        var shop_name=$('#shop_name').val();
        if(shop_name==''){
            alert('请填写店铺名');
            return false;
        }
        if (zh.test(shop_name)) {
            alert('店铺名包含非法字符');
            return false;
        }
        var shop_qq='';
        var qq1=$('#qq1').val();
        var qq2=$('#qq2').val();
        var qq3=$('#qq3').val();
        if(qq1==''&&qq2==''&&qq3==''){
            alert('最少填写一个QQ号');
            return false;
        }else{
            if (qq1!='') {if(!checkNum(qq1)){alert('请输入正确的QQ号码！');$('#qq1').focus();return;}}
            if (qq2!='') {if(!checkNum(qq2)){alert('请输入正确的QQ号码！');$('#qq2').focus();return;}}
            if (qq3!='') {if(!checkNum(qq3)){alert('请输入正确的QQ号码！');$('#qq3').focus();return;}}
            if (qq1!='') {shop_qq+=qq1+'_';}
            if (qq2!='') {shop_qq+=qq2+'_';}
            if (qq3!='') {shop_qq+=qq3+'_';}
            shop_qq=shop_qq.substring(0,shop_qq.length-1);
        }
        var city=$('#city').val();
        if(city==0){
            alert('选择所在城市');
            return false;
        }
        var defalut_url="../images/upload_default.jpg";
        var img_url=$('.upload_img img').attr('src');
        if (defalut_url==img_url) {alert('请上传店铺封面图');return false;}
        var job_kind=[];
        for(var i=0;i<$('.selectBox .selected').length;i++){
            job_kind.push($('.selectBox .selected').eq(i).attr('kind'));
        }
        if (job_kind.length==0) {alert('请选择经营范围');}
        var shop_list={
            's_title':html_encode(shop_name),
            's_cover_pic':img_url,
            's_qq':shop_qq,
            's_address':city,
            'ai_type_ids':JSON.stringify(job_kind)
        };
        var open_shop={
            'i_mid':'19',
            's_kind':'shop',
            'ds_fields':JSON.stringify(shop_list)
        };    
        sendAjax(open_shop);
    });
  $('#editshop').click(function(){
        var logo_img=$('.big').attr('src');
        var shop_qq='';
        var qq1=$('#qq1').val();
        var qq2=$('#qq2').val();
        var qq3=$('#qq3').val();
        if(qq1==''&&qq2==''&&qq3==''){
            alert('最少填写一个QQ号');
            return false;
        }else{
            if (qq1!='') {if(!checkNum(qq1)){alert('请输入正确的QQ号码！');$('#qq1').focus();return;}}
            if (qq2!='') {if(!checkNum(qq2)){alert('请输入正确的QQ号码！');$('#qq2').focus();return;}}
            if (qq3!='') {if(!checkNum(qq3)){alert('请输入正确的QQ号码！');$('#qq3').focus();return;}}
            if (qq1!='') {shop_qq+=qq1+'_';}
            if (qq2!='') {shop_qq+=qq2+'_';}
            if (qq3!='') {shop_qq+=qq3+'_';}
            shop_qq=shop_qq.substring(0,shop_qq.length-1);
        }       
        var img_url=$('.upload_img img').attr('src');
        var job_kind=[];
        for(var i=0;i<$('.selectBox .selected').length;i++){
            job_kind.push($('.selectBox .selected').eq(i).attr('kind'));
        }
        if (job_kind.length==0) {alert('请选择经营范围');}
        var s_content=$('#s_note').val();
        var s_note=Base64.encode(s_content);
        // if (s_note=='') {
        //     alert('请输入店铺简介');
        //     return;
        // }
        // if (testContent(s_content)) {
        //     alert('关于我们栏目输入不合法，只支持汉字、字母、数字！');                    
        //     return;
        // }
        var edit_shop={
            'i_mid':'295',
            's_cover_pic':img_url,
            's_note':s_note,
            's_qq':shop_qq,
            's_banner_pic':logo_img,
            'as_type':JSON.stringify(job_kind)
        };
        sendAjax(edit_shop);
    });
  function testContent(str){   
        if(str!=null){            
            var obj=str.split("");
            var zh=/[\w\u4e00-\u9fa5]/;
            for(var i=0;i<obj.length;i++){
                if (!zh.test(obj[i])) {
                    return true;
                }
            }  
        }
        return false; 
    }
    function html_encode(str)   
    {   
        var s = "";   
        if (str.length == 0) return "";   
        s = str.replace(/&/g, "&gt;");   
        s = s.replace(/</g, "&lt;");   
        s = s.replace(/>/g, "&gt;");   
        s = s.replace(/ /g, "&nbsp;");   
        s = s.replace(/\'/g, "&#39;");   
        s = s.replace(/\"/g, "&quot;");   
        s = s.replace(/\n/g, "<br>");   
        return s;   
    }

