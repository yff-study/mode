<?php
require ("00_init.php");
$uname=$_REQUEST["uname"];
$upwd=$_REQUEST["upwd"];
$un='/[a-zA-Z0-9]{3,12}/';
$up='/[a-zA-Z0-9]{3,12}/';
if(!preg_match($un,$uname)){
    echo '{"code":-2,"msg":"用户名格式不正确"}';
    exit;
}
if(!preg_match($up,$upwd)){
    echo '{"code":-2,"msg":"密码格式不正确"}';
    exit;
}
$sql="select * from xz_user where uname='$uname' and upwd=$upwd";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row==null) { echo '{"code":-1,"msg":"密码错误"}';}
else { echo '{"code":1,"msg":"登录成功"}';}
?>