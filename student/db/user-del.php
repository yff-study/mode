<?php
/**
 * Created by PhpStorm.
 * User: ppp
 * Date: 2018/9/3
 * Time: 13:00
 */
require ("00_init.php");
$uid=$_REQUEST["uid"];
$sql="DELETE FROM xz_user where uid=$uid";
$result=mysqli_query($conn,$sql);
$rows=mysqli_affected_rows($conn);
if (mysqli_error($conn)){
    echo mysqli_error($conn);
}
if($result&&$rows>0){
    echo '{"code":1,"msg":"删除成功"}';
}
else{
    echo '{"code":-1,"msg":"删除失败"}';
}