<?php
/**
 * Created by PhpStorm.
 * User: ppp
 * Date: 2018/9/2
 * Time: 23:16
 */
require("00_init.php");
@$pno=$_REQUEST["pno"];
@$pageSize=$_REQUEST["pageSize"];
if(!$pno){
    $pno=1;
}
if(!$pageSize){
    $pageSize=8;
}
$sql ="SELECT count(*) FROM xz_user";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
$recordCount=$row[0];
$pageCount=ceil($recordCount/$pageSize);
$start=($pno-1)*$pageSize;

$sql = " SELECT uid,uname,phone,avatar,gender";
$sql .= " FROM xz_user";
$sql .= " ORDER BY uid";
$sql .= " LIMIT $start,$pageSize";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
if(mysqli_error($conn)){
    echo mysqli_error($conn);
}
$output=[
    "code"=>1,
    "msg"=>"查询成功",
    "pno"=>$pno,
    "pageSize"=>$pageSize,
    "pageCount"=>$pageCount,
    "data"=>$rows,
    "recordCount"=>$recordCount
];
echo json_encode($output);
