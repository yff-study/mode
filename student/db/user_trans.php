<?php
//1:判断上传文件内容是否不为空  (html5-day-6:homework1.php)
//$_FILES empty();
require("00_init.php");
require ("image-name.php");
$rs = empty($_FILES);
if($rs==true){
    die('{"code":-1,"msg":"没有上传文件请检查"}');
}
//2:获取上传文件名  mypic 上传文件参数名称
//3:获取上传文件大小 name 文件名 size文件大小(字节)
$picname = $_FILES["mypic"]["name"];
$picsize = $_FILES["mypic"]["size"];
//4:判断如果文件超 512KB 禁止上传
//500M可传 512*1024*1024
if($picsize>512*1024){
    die('{"code":-2,"msg":"上传文件过大超过 512K"}');
}
//5:获取上传文件名后缀
$type = strstr($picname,".");//a.jpg->.jpg
//6:通过后缀判断文件类型 .jpg .png .gif .avi .mp4
//8:如果不是图片视频类型禁止上传
if($type != ".gif" && $type != ".jpg" &&
    $type != ".png" && $type != ".avi" &&
    $type != ".mp4"){
    die('{"code":-3,"msg":"上传文件格式不正确"}');
}
//9:创建新文件名 time().rand(1,9999).$type;
$fileName = time().rand(1,9999).$type;
//10:上传(将临时文件移动uploads目录下即可)
$src =  $_FILES["mypic"]["tmp_name"];
//11:修改上传目录[admin/uploads]
//11:检查admin/是否正在uploads
$des =  "../uploads/".$fileName;
move_uploaded_file($src,$des);
//12:获取用户上传uid  9:45--9:50
$uid = $_REQUEST["uid"];
//13:更新
$sql = " UPDATE xz_user SET ";
$sql .= " avatar='$fileName' WHERE uid=$uid";
$result = mysqli_query($conn,$sql);
$row =  mysqli_affected_rows($conn);
if(mysqli_error($conn)){
    echo mysqli_error($conn);
}
//14： 等比例缩放分页图 51*51
mkThumbnail($des,51,51,"../uploads/m_".$fileName);

//15: 等比例缩放分页图 82*83
mkThumbnail($des,82,83,"../uploads/s_".$fileName);
//16: 将二张图片保存uploads




if($result && $row>0){
    echo '{"code":1,"msg":"上传成功"}';
}else{
    echo '{"code":-1,"msg":"上传失败"}';
}