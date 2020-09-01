$(function(){
    //登录功能
    $(".submit").click(async function(e){
        //点击提交后，首先获取表单的内容
        let account = $(".userName").val().trim();
        let password = $(".userPass").val().trim();

        //登录首先验证输入的内容是否为空
        //在考虑内容满足正则
        if(account === "" || password === ""){
            alert("账号和密码不能为空")
            return;
        }
        //密码加密
        password = md5(password);   

        //axios使用后端接口，post两个表单中输入内容
        let res = await axios.post("/user/login",{account,password})
        //console.log(res)
        //使用后端code值来验证是否通过验证
        if(parseInt(res.code) === 0){
            alert("登陆成功");
            //登录成功后，跳转到主页
            window.location.href = "index.html";
            return;//结束程序
        }
        //否则...
        alert("用户名和密码出错啦")
    })
})