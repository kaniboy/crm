$(function(){
    init();
    let $plan = $.Callbacks();

    $plan.add((_,baseInfo)=>{
        $(".baseBox>span").html(`你好，${baseInfo.name || ''}`)
    })
    $plan.add((power)=>{
        console.log("渲染菜单:",power)
    })

    //是否携带cook，没有返回登录页面
    async function init(){
        let result = await axios.get("/user/login");
        //console.log(result)
        if(result.code != 0){
            alert("你还没有登录，请先登录");
            window.location.href = "login.html";
            return;
        }
        let [power,baseInfo] = await axios.all([
            axios.get("/user/power"),
            axios.get("/user/info")
        ])
        baseInfo.code === 0 ? baseInfo = baseInfo.data : null;
        $plan.fire(power,baseInfo)
    }
})