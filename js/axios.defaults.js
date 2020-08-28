//对ajax进行二次封装

//配置请求的基本路径
axios.defaults.baseURL = "http://127.0.0.1:8888"; 

axios.defaults.withCredentials = true; //后台请求会带上cook

//数据以表单的形式扔给服务器
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.transformRequest = function(data){
    if(!data) return data; //结束data，不给服务器传递数据
    let result = '';
    for(let attr in data){
        if(!data.hasOwnProperty(attr)) break;
        result += `&${attr}=${data[attr]}`;
    }
    return result.substring(1)
}

axios.interceptors.request.use(config=>{
    return config
})

//配置响应拦截器
axios.interceptors.response.use(response=>{
    return response.data;
}),reason => {
    // console.log(reason)
    if(reason.response){
        switch(String(reason.response.status)){
            case "404":
                alert("当前请求的地址不存在")
                break;
            default:
                break;
        }
    }
    return Promise.reject(reason);
}