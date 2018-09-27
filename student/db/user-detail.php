<?php
/**
 * Created by PhpStorm.
 * User: ppp
 * Date: 2018/9/3
 * Time: 20:01
 */
require ("00_init.php");
$uid=$_REQUEST["uid"];
$sql="SELECT uid,uname,user_name,phone,email,gender FROM xz_user WHERE uid=$uid";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_assoc($result);
echo json_encode($rows);