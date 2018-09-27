<?php
/**
 * Created by PhpStorm.
 * User: ppp
 * Date: 2018/8/20
 * Time: 19:05
 */
require("00_init.php");
@$low=$_REQUEST["low"];
@$high=$_REQUEST["high"];
@$kw=$_REQUEST["kw"];
@$pno=$_REQUEST["pno"];
if(!$low){
    $low=0;
}
if(!$high){
    $high=2100000000;
}
if(!$kw){
    $kw="";
}
if(!$pno){
    $pno="1";
}
$sql =  " SELECT count(*) FROM xz_laptop";
$sql .= " WHERE title LIKE  '%$kw%'";
$sql .= " AND price >= $low";
$sql .= " AND price <= $high";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
$recordCount=intval($row[0]);


$pageSize=8;
$offset=($pno-1)*$pageSize;//起始位置,算下一个数据是第几个
$sql = " select p.lid,p.title,p.price";//sql查询语句
$sql .=",p.spec,p";
$sql .=" .expire,pic.sm,f.name";
$sql .=" from xz_laptop p,";
$sql .=" xz_laptop_family f,";
$sql .=" xz_laptop_pic pic";
$sql .=" WHERE p.price >=$low AND p.price <=$high AND p.title LIKE '%$kw%'";
$sql .=" group by p.lid";
$sql .=" limit $offset,$pageSize";//查询出的语句从offset开始，每页pageSize个
$result=mysqli_query($conn,$sql);

if(mysqli_error($conn)){
    echo mysqli_error($conn);
}

$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
$pageConut=ceil($recordCount/$pageSize);
$output=[
    "kw"=>$kw,
    "low"=>$low,
    "high"=>$high,
    "pno"=>$pno,
    "pageSize"=>$pageSize,
    "pageCount"=>$pageConut,
    "data"=>$rows
];
echo json_encode($output);
?>
