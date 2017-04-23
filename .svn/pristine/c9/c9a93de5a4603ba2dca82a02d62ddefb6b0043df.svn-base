<?php
header("Content-type:text/html;charset=utf-8");
$action=isset($_GET['action']) ? $_GET['action'] : 'index';
if ($action == 'index') {
	include_once 'pages/index.html';
}elseif ($action == 'news') {
	header("location:./control/news.php");
}elseif ($action == 'persion') {
	header("location:./control/persion.php");
}elseif ($action == 'service') {
	header("location:./control/service.php");
}
?>