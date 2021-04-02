import axios from 'axios'
import store from '../../store'
let http = axios.create({
    baseURL: '/api'
})

//axios的拦截器
//请求拦截
http.interceptors.request.use(req => {
    //给购物车接口添加请求头
    if (store.getters.getuserInfo) {
        req.headers.authorization = store.getters.getuserInfo.token
    }
    return req
})

//响应拦截
http.interceptors.response.use(res => {
    console.log(res, '响应');
    return res.data
})

export default http