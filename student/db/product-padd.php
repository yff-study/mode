<?php
/**
 * Created by PhpStorm.
 * User: ppp
 * Date: 2018/8/22
 * Time: 18:15
 */
require ("00_init.php");
$sql="SELECT fid,name FROM xz_laptop_family";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($row);
?>