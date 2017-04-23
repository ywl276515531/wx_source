
<?php
//file_put_contents("/var/www/html/11/wxPay/logs/pull.txt",file_get_contents("php://input"),FILE_APPEND);
$post=json_decode(file_get_contents("php://input"),true);
if(is_array($post) && $post['password']=='nigeilaozigundan!'){
    $log='';
    $sta=0;
    exec("cd /var/www/html/11 && ssh-agent bash -c 'ssh-add /var/www/.ssh/id_rsa.oschina;' && /usr/local/bin/git pull 2>&1",$log,$sta);
    $txt=implode("\r\n",$log) ."\r\n#########################\r\n";
    file_put_contents("/var/www/html/11/wxPay/logs/pull_log.txt",$txt,FILE_APPEND);
}
?>
