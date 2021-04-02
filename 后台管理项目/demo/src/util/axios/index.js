import http from './axios'

//=============菜单管理接口==================
//菜单添加
export function menuAdd(data) {
    return http.post('/api/menuadd', data)
}
//菜单编辑
export function menuEdit(data) {
    return http.post('/api/menuedit', data)
}
//菜单删除
export function menuDel(data) {
    return http.post('/api/menudelete', data)
}
//菜单列表
export function menuList() {
    return http.get('/api/menulist', {
        params: {
            istree: true
        }
    })
}
//菜单获取（一条）
export function menuInfo(params) {
    return http.get('/api/menuinfo', {
        params
    })
}

//=============角色管理接口==================
//角色添加
export function roleAdd(data) {
    return http.post('/api/roleadd', data)
}
//角色编辑
export function roleEdit(data) {
    return http.post('/api/roleedit', data)
}
//角色删除
export function roleDel(data) {
    return http.post('/api/roledelete', data)
}
//角色列表
export function roleList() {
    return http.get('/api/rolelist')
}
//角色获取（一条）
export function roleInfo(params) {
    return http.get('/api/roleinfo', {
        params
    })
}

//=============管理员管理接口==================
//管理员添加
export function userAdd(data) {
    return http.post('/api/useradd', data)
}
//管理员编辑
export function userEdit(data) {
    return http.post('/api/useredit', data)
}
//管理员删除
export function userDel(data) {
    return http.post('/api/userdelete', data)
}
//管理员列表
export function userList(params) {
    return http.get('/api/userlist', { params })
}
//管理员获取（一条）
export function userInfo(params) {
    return http.get('/api/userinfo', {
        params
    })
}
//管理员总数（用于计算分页）
export function userCount() {
    return http.get('/api/usercount')
}
//管理员登录（后台管理登录）
export function userLogin(data) {
    return http.post('/api/userlogin', data)
}

//=============商品分类管理接口==================
//商品分类添加
export function cateAdd(data) {
    return http.post('/api/cateadd', data)
}
//商品分类编辑
export function cateEdit(data) {
    return http.post('/api/cateedit', data)
}
//商品分类删除
export function cateDel(data) {
    return http.post('/api/catedelete', data)
}
//商品分类列表
export function cateList() {
    return http.get('/api/catelist', {
        params: {
            istree: true
        }
    })
}
//商品分类获取（一条）
export function cateInfo(params) {
    return http.get('/api/cateinfo', {
        params
    })
}

//=============商品规格管理接口==================
//商品规格添加
export function specsAdd(data) {
    return http.post('/api/specsadd', data)
}
//商品规格编辑
export function specsEdit(data) {
    return http.post('/api/specsedit', data)
}
//商品规格删除
export function specsDel(data) {
    return http.post('/api/specsdelete', data)
}
//商品规格列表
export function specsList(params) {
    return http.get('/api/specslist', { params })
}
//商品规格获取（一条）
export function specsInfo(params) {
    return http.get('/api/specsinfo', {
        params
    })
}
//商品规格总数（用于计算分页）
export function specsCount() {
    return http.get('/api/specscount')
}

//=============商品管理接口==================
//商品添加
export function goodsAdd(data) {
    return http.post('/api/goodsadd', data)
}
//商品编辑
export function goodsEdit(data) {
    return http.post('/api/goodsedit', data)
}
//商品删除
export function goodsDel(data) {
    return http.post('/api/goodsdelete', data)
}
//商品列表
export function goodsList(params) {
    return http.get('/api/goodslist', { params })
}
//商品获取（一条）
export function goodsInfo(params) {
    return http.get('/api/goodsinfo', {
        params
    })
}
//商品总数（用于计算分页）
export function goodsCount() {
    return http.get('/api/goodscount')
}

//=============会员管理接口==================
//会员列表
export function memberList() {
    return http.get('/api/memberlist')
}
//会员获取（一条）
export function memberInfo(params) {
    return http.get('/api/memberinfo', {
        params
    })
}
//会员编辑
export function memberEdit(data) {
    return http.post('/api/memberedit', data)
}

//=============轮播图管理接口==================
//轮播图添加
export function bannerAdd(data) {
    return http.post('/api/banneradd', data)
}
//轮播图编辑
export function bannerEdit(data) {
    return http.post('/api/banneredit', data)
}
//轮播图删除
export function bannerDel(data) {
    return http.post('/api/bannerdelete', data)
}
//轮播图列表
export function bannerList() {
    return http.get('/api/bannerlist')
}
//轮播图获取（一条）
export function bannerInfo(params) {
    return http.get('/api/bannerinfo', {
        params
    })
}

//=============限时秒杀管理接口==================
//限时秒杀添加
export function seckAdd(data) {
    return http.post('/api/seckadd', data)
}
//限时秒杀编辑
export function seckEdit(data) {
    return http.post('/api/seckedit', data)
}
//限时秒杀删除
export function seckDel(data) {
    return http.post('/api/seckdelete', data)
}
//限时秒杀列表
export function seckList() {
    return http.get('/api/secklist')
}
//限时秒杀获取（一条）
export function seckInfo(params) {
    return http.get('/api/seckinfo', {
        params
    })
}