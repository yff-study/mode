<?php
/**
 * Created by PhpStorm.
 * User: ppp
 * Date: 2018/9/12
 * Time: 15:42
 */
require ("00_init.php");
$uid=$_REQUEST["uid"];
$rid=$_REQUEST["rid"];
$sql="INSERT INTO xz_users_roles VALUES(null,$rid,$uid)";
$result=mysqli_query($conn,$sql);
$row=mysqli_affected_rows($conn);
if($result&&$row>0){
    echo '{"code":1,"msg":"添加成功"}';
}else{
    echo '{"code":-1,"msg":"添加失败"}';
}

