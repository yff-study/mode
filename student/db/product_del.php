<?php
/**
 * Created by PhpStorm.
 * User: ppp
 * Date: 2018/8/17
 * Time: 21:07
 */
require_once("00_init.php");
$lid=$_REQUEST["lid"];
$sql="update xz_laptop set expire =1 where lid=$lid";
$result=mysqli_query($conn,$sql);
$rowsCount=mysqli_affected_rows($conn);
if($result&&$rowsCount>0){
    echo '{"code":1,"msg":"删除成功"}';
}else {
    echo '{"code":-1,"msg":"删除失败"}';
}
?>