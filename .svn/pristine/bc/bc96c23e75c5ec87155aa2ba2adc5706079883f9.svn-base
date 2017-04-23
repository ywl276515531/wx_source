--array(4) { ["i_sta"]=> string(1) "0" ["s_err"]=> string(21) "短信验证码错误" ["i_time"]=> string(10) "1477276165" ["s_session"]=> string(0) "" }
--   -192
--新建一个表专门用于存储用户的密码,账号,和微信的openid
create table user(
id int primary key auto_increment,
username varchar(255) comment '用户名',
userpasw varchar(255) comment '用户密码',
openid text comment '用户的openid'
);
--建立一个访问表专门用于存储每天的访问数据
create table fwb(
id  int primary key auto_increment,
text default '' comment '访问数据'
);


--3454293735@qq.com    KFgs＝007
--微信的导航超链接
-- https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx26becdd195c0599b&redirect_uri=http://yunshu.mytykj.com/11/auth.php&response_type=code&scope=snsapi_base&state=1#wechat_redirect
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx26becdd195c0599b&redirect_uri=http://weixin.wfyizhan.com/11/auth.php&response_type=code&scope=snsapi_base&state=1#wechat_redirect