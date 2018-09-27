<?php
/**
 * Created by PhpStorm.
 * User: ppp
 * Date: 2018/9/3
 * Time: 13:14
 */
require ("00_init.php");
$uid=$_REQUEST["uid"];
$oldpwd=$_REQUEST["oldPwd"];
$newPwd=$_REQUEST["newPwd"];
$sql="SELECT * FROM xz_user WHERE uid=$uid AND upwd=$oldpwd";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row==null){
    die('{"code":-2,"msg":"密码输入错误"}');
}
$sql="UPDATE xz_user SET upwd=$newPwd WHERE uid=$uid";
$result=mysqli_query($conn,$sql);
$rows=mysqli_affected_rows($conn);

if($rows>0&&$result){
    echo '{"code":1,"msg":"密码修改成功！"}';
}else{
    echo '{"code":-1,"msg:"密码修改失败！"}';
}