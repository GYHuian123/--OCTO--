import http from './axios'

//封装一个轮播图接口
export function getBanner() {
    return http.get('/banner')
}
//封装一个推荐歌单的接口
export function getrecSong(params) {
    return http.get('/personalized', { params })
}
//封装一个推荐新音乐的接口
export function getnewSong() {
    return http.get('/personalized/newsong')
}
//封装一个获取歌曲详情的接口
export function getsongDetail(params) {
    return http.get('/song/detail', { params })
}
//封装一个获取歌词的接口
export function getLyric(params) {
    return http.get('/lyric', { params })
}
//封装一个获取音乐url的接口
export function getsongUrl(params) {
    return http.get('/song/url', { params })
}
//封装一个获取热歌榜的接口
export function gethotSong() {
    return http.get('/playlist/detail?id=3778678')
}
//封装一个热搜列表的接口
export function gethotSearch() {
    return http.get('/search/hot')
}
//封装一个搜索的接口
export function getSearch(params) {
    return http.get('/search', { params })
}