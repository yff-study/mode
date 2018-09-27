/**
 * Created by ppp on 2018/8/14.
 */
$("[name='usubmit']").click(function(e){
    e.preventDefault();
    var uname=$("[name='uname']").val();
    var upwd=$("[name='upwd']").val();
    var up=/[a-zA-Z0-9]{3,12}/;
    if(!up.test(uname)){
        alert("账号格式不对");
    }else if(!up.test(upwd)){
        alert("密码格式不对");
    }else{
    $.ajax({
        type:"POST",
        url:"db/login.php",
        data:{uname:uname,upwd:upwd},
        success:function(data){
            if(data.code>0){
                alert(data.msg);
                location.href="main.html";
            }else if(data.code=-2){
                alert(data.msg);
            }else{
                alert(data.msg);
            }
        },
        error:function(){
            alert("网络出现波动");
        }


    });
    }
});