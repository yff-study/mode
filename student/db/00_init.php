<?php
/**
 * Created by PhpStorm.
 * User: ppp
 * Date: 2018/8/16
 * Time: 23:18
 */
header("Content-Type:application/json;charset:utf-8");
$conn=mysqli_connect("127.0.0.1","root","","xz",3306);
mysqli_query($conn,"SET NAMES UTF8");
?>