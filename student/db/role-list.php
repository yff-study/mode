<?php
/**
 * Created by PhpStorm.
 * User: ppp
 * Date: 2018/9/12
 * Time: 15:40
 */
require ("00_init.php");
$sql="SELECT * FROM xz_role ";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($row);