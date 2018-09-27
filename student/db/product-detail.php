<?php
/**
 * Created by PhpStorm.
 * User: ppp
 * Date: 2018/8/19
 * Time: 20:11
 */
require("00_init.php");
$lid=$_REQUEST["lid"];
$sql="SELECT lid,title,price,spec,category,name,cpu,disk FROM xz_laptop WHERE lid=$lid ";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_assoc($result);
if(!$rows){
    echo mysqli_error($conn);
    exit;
}
echo json_encode($rows);