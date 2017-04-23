<?php
$f = trim($_GET['f']);
if(function_exists($f)) echo '支持'.$f;
else echo '<b>不</b>支持'.$f;
echo '<br/>'.mt_rand(1,time());//这行没什么用，用于提示你两次执行的不同
?>