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
        /*
         * $name=>用户名,$pasw=>用户名密码
         * 这个方法主要用于更新用户信息或者插入新的用户
         */
        $openid = $_SESSION['openid'];//opneid
        $mysql = "select * from user where openid = '{$openid}'";//搜索搜索数据库中
        $data = $this->pdo->query($mysql);
        $shuju = $data->fetch(PDO::FETCH_ASSOC);
        if($shuju){
            //说明数据存在
            $mysql = "update user set `username` = '$name', `userpasw` = '$pasw' where openid = '$openid'";
            $this->pdo->query($mysql);
        }else{
            //说明这个数据不存在
            $mysql = "insert into user values (null,'$name','$pasw','$openid')";
            $this->pdo->exec($mysql);
        }
    }

    public function test(){
        $mysql = "select * from fwb";
        $data = $this->pdo->query($mysql);
        $shuju = $data->fetch(PDO::FETCH_ASSOC);
        return $shuju;
    }

    public function nobang(){
        /**
         * 实现取消绑定的功能
         */
        $mysql = "delete from user where openid = '".$_SESSION['openid']."'";
        $this->pdo->exec($mysql);
    }

    /**
     * @param $data读取数据
     * 这个方法主要用于向数据库插入数据，记录访问次数
     */
    public function llcx($data){
        $sql = "delete from fwb where id >= 1";
        $this->pdo->exec($sql);
        $mysql = $data;
        $this->pdo->exec($mysql);
    }

    public function scsj(){
        //超过一天必须删除数据
        $sql = "delete from fwb where id >= 1";
        $this->pdo->exec($sql);
    }
    public function query(){
        $sql="select * from wx_tongji";
        $data=$this->pdo->query($sql)->fetch(PDO::FETCH_ASSOC);
        return $data;
    }
    public function update($name){
        $sql="update wx_tongji set $name=$name+1";
        $this->pdo->query($sql);
    }
    public function cleartab(){      
        $sql="update wx_tongji set starttime=0,endtime=0,i_loginNum=0,i_regNum=0,i_eventNum=0,i_serviceNum=0,i_applyNum=0,i_newsNum=0,i_projectNum=0,i_liveNum=0";
        $this->pdo->query($sql);
    }

}


