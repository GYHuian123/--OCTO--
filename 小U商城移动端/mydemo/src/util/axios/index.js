import http from './axios'

//封装一个会员注册
export function getRegister(data) {
    return http.post('/api/register', data)
}

//封装一个会员登录
export function getLogin(data) {
    return http.post('/api/login', data)
}

//封装一个获取轮播图信息（首页）
export function getBanner() {
    return http.get('/api/getbanner')
}

//封装一个获取商品信息（首页）
export function getindexGoods() {
    return http.get('/api/getindexgoods')
}

//封装一个获取分类树形结构
export function getcateTree() {
    return http.get('/api/getcatetree')
}

//封装一个获取分类商品
export function getGoods(params) {
    return http.get('/api/getgoods', { params })
}

//封装一个获取一个商品信息
export function getgoodsInfo(params) {
    return http.get('/api/getgoodsinfo', { params })
}

//封装一个购物车列表
export function cartList(params) {
    return http.get('/api/cartlist', { params })
}

//封装一个购物车添加
export function cartAdd(data) {
    return http.post('/api/cartadd', data)
}

//封装一个购物车删除
export function cartDel(data) {
    return http.post('/api/cartdelete', data)
}
