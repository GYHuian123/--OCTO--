import axios from 'axios'
import router from '../../router'
let http = axios.create({
    baseURL: '/api'
})

//axios的拦截器
//请求拦截
http.interceptors.request.use(req => {
    let token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : ''
    // console.log(req, '请求');
    //一般在请求头拦截器中会操作请求头，比如添加token
    //设置token请求头
    req.headers.authorization = token
    return req
})

//响应拦截
http.interceptors.response.use(res => {
    //一般会全局拦截错误，或者针对于返回值进行封装
    // console.log(res, '响应');
    //针对于返回值进行封装改变 return res.data
    //针对于token过期货值失效，进行全局拦截
    if (res.data.code == 403) {
        //全局拦截错误，重新登录
        router.push('/login')
    }
    return res
})

export default http