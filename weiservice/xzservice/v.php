<?php
$f = trim($_GET['f']);
if(function_exists($f)) echo '֧��'.$f;
else echo '<b>��</b>֧��'.$f;
echo '<br/>'.mt_rand(1,time());//����ûʲô�ã�������ʾ������ִ�еĲ�ͬ
?>