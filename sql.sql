--array(4) { ["i_sta"]=> string(1) "0" ["s_err"]=> string(21) "������֤�����" ["i_time"]=> string(10) "1477276165" ["s_session"]=> string(0) "" }
--   -192
--�½�һ����ר�����ڴ洢�û�������,�˺�,��΢�ŵ�openid
create table user(
id int primary key auto_increment,
username varchar(255) comment '�û���',
userpasw varchar(255) comment '�û�����',
openid text comment '�û���openid'
);
--����һ�����ʱ�ר�����ڴ洢ÿ��ķ�������
create table fwb(
id  int primary key auto_increment,
text default '' comment '��������'
);


--3454293735@qq.com    KFgs��007
--΢�ŵĵ���������
-- https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx26becdd195c0599b&redirect_uri=http://yunshu.mytykj.com/11/auth.php&response_type=code&scope=snsapi_base&state=1#wechat_redirect
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx26becdd195c0599b&redirect_uri=http://weixin.wfyizhan.com/11/auth.php&response_type=code&scope=snsapi_base&state=1#wechat_redirect