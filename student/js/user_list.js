function loadUserByPage(pno,pageSize) {
    $.ajax({
        type:"GET",
        url:"db/user_list.php",
        data:{pno:pno,pageSize:pageSize},
        success:function (pager) {
            var html="";
            $.each(pager.data,function (idx,obj) {
                html+=` 
                <tr>
                <td>
                    <input type="checkbox">
                </td>
                <th>${obj.uid}</th>
                <th><img src="uploads/m_${obj.avatar}"></th>
                <th class="after" >${obj.uname}</th>`;
                html +=`<th>${sex(obj.gender)}</th>`;
                html +=`<th>${ppp(obj.phone)}</th>`;
                html +=`
                <th>
                <a href="${obj.uid}" class="btn-del">删除</a>
                <a href="${obj.uid}" class="btn-update">更新</a>
                <a href="${obj.uid}" class="btn-detail">详情</a>
                <a href="${obj.uid}" class="btn-trans">上传头像</a>
                <a href="${obj.uid}" class="btn-user">拥有角色</a>
                <a href="${obj.uid}" class="btn-acl">授权</a>

                </th>
                </tr>`;
            });
            $("#tbody1").html(html);
            var html="";
            if(pager.pno-2>0){
                html +=`<li><a href="#" data-toggle="${pager.pno-2}">${pager.pno-2}</a></li>`;
            }
            if(pager.pno-1>0){
                html +=`<li><a href="#" data-toggle="${pager.pno-1}">${pager.pno-1}</a></li>`;
            }
            html +=`<li class="active"><a href="#" data-toggle="${pager.pno}">${pager.pno}</a></li>`;
            if (pager.pno<=pager.pageCount-1){
                html +=`<li><a href="#" data-toggle="${1+parseInt(pager.pno)}">${1+parseInt(pager.pno)}</a></li>`;
            }
            //console.log(pager.pageCount);
            if(pager.pno<=pager.pageCount-2){
                html +=`
            <li><a href="#" data-toggle="${parseInt(pager.pno)+2}">${parseInt(pager.pno)+2}</a></li>>`;
            }
            $("#pagination").html(html);
        },
        error:function () {
            alert("网络连接出错！");
        }
    });

}
loadUserByPage(1,4);

function sex(gender) {
    return gender==0?"男":"女";
}
function ppp(phone){
    phone = phone.replace(/(\d{4})\d{4}(\d{3})/, '$1****$2');
    return phone;
}
$("#pagination").on("click","li a",function (e) {
    e.preventDefault();
    var page=$(this).data("toggle");
    var pageSize=$("#page-size").val();
    loadUserByPage(page,pageSize);
});
$("#page-size").change("option",function () {
    pageSize=$(this).val();
    console.log(pageSize);
    loadUserByPage(1,pageSize);
});
$("#tbody1").on("click","tr a.btn-del",function (e) {
    e.preventDefault();
    var rs=window.confirm("确定删除该用户记录？");
    if(!rs){
        return;
    }
    var uid=$(this).attr("href");
    $.ajax({
        type:"POST",
        url:"db/user-del.php",
        data:{uid:uid},
        success:function (data) {
            if(data.code>0){
                alert(data.msg);
                pageSize=$("select.form-control").val();
                loadUserByPage(1,pageSize);
                /*alert(data.msg);*//*
                refresh();
                window.location.reload();*/
/*
                此处为何不能刷新!页面选择修改时可自动刷新了
*/
            }

            else{
                alert(data.msg);
            }
        },
        error:function () {
            alert("连接出错");
        }
    });
});


$("#tbody1").on("click","tr a.btn-update",function (e) {
    e.preventDefault();
    var uid=$(this).attr("href");
    $("div.update-jumbotron").show(500);
    $("[data-action='update-cancel']").click(function (e) {
        e.preventDefault();
        oldPwd=$("[data-pwd=old]").val("");
        newPwd=$("[data-pwd=new]").val("");
        $("div.update-jumbotron").hide(500);
    });
    $("div.update-jumbotron").one("click","a.tt",function (e) {
        e.preventDefault();
        var oldPwd=$("[data-pwd=old]").val();
        var newPwd=$("[data-pwd=new]").val();
        $.ajax({
            type:"POST",
            url:"db/user-update.php",
            data:{newPwd:newPwd,oldPwd:oldPwd,uid:uid},
            success:function (data) {
                if(data.code==1){
                    alert(data.msg);
                    $("div.update-jumbotron").hide(500);
                    $("[data-pwd=old]").val("");
                    $("[data-pwd=new]").val("");
                }
                else if(data.code==-1){
                    alert(data.msg);
                }else{
                    alert(data.msg);
                }
            },
            error:function () {
                alert("出错！");
            }
        });
    })
});

$("#tbody1").on("click","tr a.btn-detail",function (e) {
    e.preventDefault();
    var uid=$(this).attr("href");
   $.ajax({
       type:"GET",
       url:"db/user-detail.php",
       data:{uid:uid},
       success:function (data) {
          var div=$("div.detail-jumbotron");
          console.log(data.uname);
          div.find(".plid").html(data.uid);
          div.find(".ppname").html(data.user_name);
          data.gender==0?div.find(".pcategory").html("男"):div.find(".pcategory").html("女");
          div.find(".pprice").html(data.phone);
          div.find(".pos").html(data.email);
          div.find(".pdisk").html(data.uname);
          $("div.detail-jumbotron").show(500);
           $("[data-action=detail-cancel]").click(
               function (e) {
                   e.preventDefault();
                   $("div.detail-jumbotron").hide(500);
               }
           );
       },
       error:function () {
           alert("报错！");
       }
   });
});

$(function(){
    //阻止浏览器默认行为(离开;释放;进入;悬停)
    $(document).on({
        dragleave:function(e){e.preventDefault();},
        drop:function(e){e.preventDefault();},
        dragenter:function(e){e.preventDefault();},
        dragover:function(e){e.preventDefault()}
    });
    //*3:获取 "拖拽区域"
    var drop_area = document.querySelector(".drop_area");
    //*4:绑定事件 拖动释放
    drop_area.ondrop = function(e) {
        //*5:阻止事件默认行为
        e.preventDefault();
        //console.log(2);
        //6:获取文件对象
        var fileList = e.dataTransfer.files;
        //console.log(fileList);
        //7:获取拖动上传文件个数量==0 停止
        if(fileList.length==0){
            alert("没有图片上传");
            return;
        }
        //8:获取上传文件(第一张图片)类型--可选
        //9:阻止非图片
        var rs  = fileList[0].type.indexOf("image");
        if(rs==-1){
            alert("只能上传图片格式类型");
            return;
        }   //11:45--11:50
        //9.1:获取上传文件大小 如果超过512K 阻止上传
        var size = Math.floor(fileList[0].size/1024);
        if(size>512){
            alert("上传图片太大，不能超过 512KB");
            return;
        }
        var fileName = fileList[0].name;
        //10:创建预览对象(创建图片对象)
        var img = window.webkitURL.createObjectURL(fileList[0]);
        //console.log(img);
        var str = `<img src="${img}" /> <p>${fileName}</p>`;
        //11:显示预览图片
        $(".preview").html(str);

        //12:通过ajax对象上传文件(表单对象)
        var fd = new FormData();
        fd.append("mypic",fileList[0]);
        //12.1:获取上传对话框中用户编号
        var uid = $(".upload-jumbotron").data("uid");
        //12.2:将uid添加FormData
        //append(参数名,参数值);
        fd.append("uid",uid);

        //13:创建AJAX对象发送数据
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    var json = JSON.parse(xhr.responseText);
                    if(json.code>0){
                        alert(json.msg);
                        var page=$(".active").data("toggle");
                        var size=$(".form-control").val();
                        $(".upload-jumbotron").hide(300);
                        loadUserByPage(page,size);
                    }else{
                        alert(json.msg);
                    }
                }
            }
        }
        //14:打开HTTP连接
        xhr.open("POST","db/user_trans.php",true);
        //15:修改请求头信息
        xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
        //16:发送数据
        xhr.send(fd);
    }
});
    //取消默认事件  然后且把JS执行程序写入到这个函数中  切记！
    $("#tbody1").on("click","tr a.btn-trans",function (e) {
        e.preventDefault();
        var uid=$(this).attr("href");
        $(".upload-jumbotron").data("uid",uid);
        $(".upload-jumbotron").show(500);
        $("[data-action=upload-cancel]").click(function () {
            $(".upload-jumbotron").hide(300);
        })

    });
/*权限管理*/

$("#tbody1").on("click","tr a.btn-user",function (e) {
    e.preventDefault();
    var uid=$(this).attr("href");
    var users=$(this).parent().siblings(".after").html();
    console.log(users);
    $.ajax({
        type:"GET",
        url:"db/role-list.php",
        success:function (data) {
            console.log(data);
            var html="";
            $.each(data,function(idx,obj) {
                html +=`<li><input type="radio" value="${obj.id}" data-uid="${uid}" class="roles">${obj.rname}</li>`;
            });
            $("#adduser").html(users);
            $("#roles").html(html);
            $(".user-jumbotron").show(500);
        },
        error:function () {
            alert("网络连接出错！");
        }
    });
    $("[data-action=userdata-cancel]").click(function (e) {
        e.preventDefault();
        $(".user-jumbotron").hide(500);
    });
});
$(".user-jumbotron").on("click",".roles",function (e) {
    var rid=$(this).val();
    var uid=$(this).data("uid");
    $.ajax({
        type:"POST",
        url:"db/user-role-list.php",
        data:{rid:rid,uid:uid},
        success:function (data) {
            if(data.code>0){
                alert("添加成功！");
                $(".user-jumbotron").hide(500);
            }
        },
        error:function () {
            alert("网络错误请检查！");
        }
    });

});


