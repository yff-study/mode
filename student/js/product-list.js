
//分页效果
function ppp(pno,pageSize) {
    $.ajax({
        type:"GET",
        url:"db/product_list.php",
        data:{pno:pno,pageSize:pageSize},
        success:function (pager) {
            var html="";
            var rows=pager.data;
            for(var i=0;i<rows.length;i++){
                var obj=rows[i];
                html +=`<tr `;
                if(obj.expire==1){
                    html +=`class="expire"`;
                }
                html +=`>
                    <th><input type="checkbox"></th>
                    <th>${obj.lid}</th>
                    <th><img src="${obj.sm}"></th>
                    <th class="pprice">${obj.price}</th>
                    <th class="pname">${obj.name}</th>
                    <th>${obj.spec}</th>
                    <th>`;
                if(obj.expire==0){
                    html +=` 
                        <a href="${obj.lid}" class="btn-del">删除</a>
                        <a href="${obj.lid}" class="btn-update">更新</a>
                        <a href="${obj.lid}" class="btn-detail">详细</a>
                `;
                }


                html+=`</th>
                </tr>
                `;
            }
            $("#tbody1").html(html);
            var html="";
            if(pager.pno-2>0){
                html +=`
            <li><a href="#">${pager.pno-2}</a></li>>
            `;
            }
            if(pager.pno-1>0){
                html +=`
            <li><a href="#">${pager.pno-1}</a></li>>
            `;
            }
            html +=`
            <li class="active"><a href="#">${pager.pno}</a></li>>
            `;
            if(pager.pno+1<=pager.pageCount){
                html +=`
            <li><a href="#">${pager.pno+1}</a></li>>
            `;
            }
            if(pager.pno+2<=pager.pageCount){
                html +=`
            <li><a href="#">${pager.pno+2}</a></li>>
            `;
            }
            $("#pagination").html(html);
        },
        error:function () {
            alert("网络出现故障！");
        }
    });
}ppp(1,10);
$("#pagination").on("click","li a",function (e) {
    e.preventDefault();
    var pno=$(this).html();
    ppp(pno,8);
});

//删除记录
$("#tbody1").on("click","a.btn-del",function (e) {
    e.preventDefault();
    var rs=window.confirm("你是否要删除这条记录");
    if(!rs){
        return;
    }
        var lid=$(this).attr("href");
        $.ajax({
            type:"POST",
            url:"db/product_del.php",
            data:{lid:lid},
            success:function (data) {
                if(data.code>0){
                    alert("删除成功");
                    ppp(1,8);
                }else{
                    alert("删除失败");
                }
                }
            ,
            error:function () {
                alert("网络故障请检查");
            }
        });
});


//更新价格
$("#tbody1").on("click","a.btn-update",function(e){
    e.preventDefault();
    var tr=$(this).parents("tr");
    var fname=tr.find(".pname").html();
    var price=tr.find(".pprice").html();
    var updateDiv=$(".update-jumbotron");
    updateDiv.find(".pname").html(fname);
    updateDiv.find(".input-price").val(price);
    var lid=$(this).attr("href");
    $("[data-action='update-ok']").data("lid",lid);
    $("[data-action='update-ok']").click(function (e) {
        e.preventDefault();
        var lid=$(this).data("lid");
        var price=$(".input-price").val();
        $.ajax({
            type:"POST",
            url:"db/product-update.php",
            data:{lid:lid,price:price},
            success:function (data) {
                if(data.code>0){
                    alert(data.msg);
                    $(".update-jumbotron").hide(700);
                    ppp(1,8);
                }
            },
            error:function () {
                alert("网络故障请检查！");
            }
        });
    });
    $("[data-action='update-cancel']").click(function(e){
        e.preventDefault();
        $(".update-jumbotron").hide(700);
    });
    updateDiv.show(700);
});



//商品详情页
$("#tbody1").on("click","a.btn-detail",function(e){
    e.preventDefault();
    var lid=$(this).attr("href");
    $.ajax({
        type:"GET",
        url:"db/product-detail.php",
        data:{lid:lid},
        success:function (data) {
            var div=$(".detail-jumbotron");
            div.find(".ppname").html(data.name);
            div.find(".plid").html(data.lid);
            div.find(".pcategory").html(data.category);
            div.find(".pprice").html(data.price);
            div.find(".pos").html(data.cpu);
            div.find(".pdisk").html(data.disk);
            div.show(500);
            $("[data-action='detail-cancel']").click(function (e) {
                e.preventDefault();
                div.hide(500);
            });

        },
        error:function () {
            alert("出错啦");
        }
        
    })
});