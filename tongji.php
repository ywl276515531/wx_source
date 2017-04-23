<?php
include_once 'function/sql.php';
include_once 'function/fc.php';
$sql=new model();
$data=$sql->query();
statistics($data);
$sql->cleartab();
?>
