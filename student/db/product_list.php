<?php
header("Access-Control-Allow-Origin:*");
@$pno=$_REQUEST["pno"];
@$pageSize=$_REQUEST["pageSize"];
if(!$pno){
    $pno=1;//默认第一页
}else{
    $pno=intval($pno);
}
if(!$pageSize){
    $pageSize=8;//默认第8页
}else{
    $pageSize=intval($pageSize);
}
$offset=($pno-1)*$pageSize;//起始位置,算下一个数据是第几个
require("00_init.php");
$sql = " select p.lid,p.title,p.price";//sql查询语句
$sql .=",p.spec,p";
$sql .=" .expire,pic.sm,f.name";
$sql .=" from xz_laptop p,";
$sql .=" xz_laptop_family f,";
$sql .=" xz_laptop_pic pic";
$sql .=" group by p.lid";
$sql .=" limit $offset,$pageSize";//查询出的语句从offset开始，每页pageSize个
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);

$sql ="select count(*) from xz_laptop";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);//索引
$count=intval($row[0]);
$pageCount=ceil($count/$pageSize);
$output=[
    "recordCount"=>$count,//总记录数
    "pageSize"=>$pageSize,//页大小
    "pageCount"=>$pageCount,//总页数
    "pno"=>$pno,//当前页码
    "data"=>$rows//当前页内容
    ];
    echo json_encode($output);//输出
?>