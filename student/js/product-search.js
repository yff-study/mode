
/*low 产品下限
high 产品上限
pno 当前页页码
kw  搜索关键字*/
function loadProductByLikePage(low,high,pno,kw) {
    $("#tbody1").html(`<div class="loading">
                    <img src="img/loading.gif" alt="">
                  </div>`);
    $.ajax({
        type:"GET",
        url:"db/product-search.php",
        data:{pno:pno,kw:kw,low:low,high:high},
        success:function (pager) {
            var html="";
            $.each(pager.data,function (idx,obj) {
                html+=`<tr>
                <td>
                  <div class="checkbox" style="margin: 0;">
                    <label>
                      <input type="checkbox">
                    </label>
                  </div>
                </td>
                <td>${obj.lid}</td>
                <td><img src="${obj.sm}"></td>
                <td>${obj.name}</td>
                <td>${obj.title}</td>
                <td>${obj.spec}</td>
                <td>${obj.price}</td>
                <td>
                <a href="${obj.lid}" class="btn-del">删除</a>
                <a href="${obj.lid}" class="btn-update">更新</a>
                <a href="${obj.lid}" class="btn-detail">详情</a>
</td>
              </tr>`;
            });
            $("#tbody1").html(html);
            pager.pno=parseInt(pager.pno);
            var html="";
            if(pager.pno-2>0){
                html +=`
            <li><a href="#"
            data-page="${pager.low}_${pager.high}_${pager.kw}_${pager.pno-2}"
            >${pager.pno-2}</a></li>>
            `;
            }
            if(pager.pno-1>0){
                html +=`
            <li><a href="#"
            data-page="${pager.low}_${pager.high}_${pager.kw}_${pager.pno-1}"
            >${pager.pno-1}</a></li>>
            `;
            }
            html +=`
            <li class="active"><a href="#"
            data-page="${pager.low}_${pager.high}_${pager.kw}_${pager.pno}"
            >${pager.pno}</a></li>>
            `;
            if(pager.pno+1<=pager.pageCount){
                html +=`
            <li><a href="#"
            data-page="${pager.low}_${pager.high}_${pager.kw}_${pager.pno+1}"
            >${pager.pno+1}</a></li>>
            `;
            }
            if(pager.pno+2<=pager.pageCount){
                html +=`
            <li><a href="#"
            data-page="${pager.low}_${pager.high}_${pager.kw}_${pager.pno+2}"
            >${pager.pno+2}</a></li>>
            `;
            }
            $("#pagination").html(html);
        },
        error:function () {
            alert("网络连接错误请检查");
        }
    });
}
loadProductByLikePage(0,21000000,1," ");


//处理分页条单机事件
//处理用户输入 上限 下限 关键字回车事件
$("#pagination").on("click","li a",function (e) {
    e.preventDefault();
    var data=$(this).data("page");
    var arr=data.split("_");
    loadProductByLikePage(arr[0],arr[1],arr[3],arr[2]);
});
$("#product-kw").keyup(function (e) {
    var high=$("#price_high").val();
    var low=$("#price_low").val();
    var kw=$(this).val();
    if(e.keyCode==13){
        loadProductByLikePage(low,high,1,kw);
    }

});
