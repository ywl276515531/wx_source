<?php
header("Content-type:text/html;charset=utf-8");
//新建一个class类专门用来操作数据库
class model{
    private $port = 3306;//数据连接端口
    private $host = "localhost";//连接服务器
    private $dbname = "wxInfo";//数据库名字
    private $user = "root";//登录数据库账号
    private $pasw = "kfgs007";//登录数据库密码
    private $pdo;//操作数据库的pdo
 
    public function __construct(){
        /*
         * 默认要连接数据库
         */
        $q1 = "'mysql:host=".$this->host.";port=".$this->port.";dbname=".$this->dbname."','".$this->user."','".$this->pasw."'";
//        echo $q1;
        $this->pdo = new PDO("mysql:host=$this->host;port=$this->port;dbname=$this->dbname",$this->user,$this->pasw) or die("数据库连接失败");
        $this->pdo->query("set names utf-8");//设置字符集
    }
   public function yz_login($openid){
       /**
        * 验证数据库当中存在的用户能否登录
        */
       $mysql = "select * from user where openid = '{$openid}'";
       $data = $this->pdo->query($mysql);
       $shuju = $data->fetch(PDO::FETCH_ASSOC);
       return $shuju;
   }

    public function check_dd($name,$pasw){
       
            $mysql = "insert into notify values ($name,'$pasw')";
            $this->pdo->exec($mysql);
        
    }

    public function test(){
        //$mysql = "update use set userpasw = 111111 where username = '18990114092'";
        //$data = $this->pdo->query($mysql);
    }

    public function nobang(){
        /**
         * 实现取消绑定的功能
         */
        $mysql = "delete from user where openid = '".$_SESSION['openid']."'";
        $this->pdo->exec($mysql);
    }
}



