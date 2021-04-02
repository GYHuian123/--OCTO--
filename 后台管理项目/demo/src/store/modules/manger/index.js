import { userList, userCount } from '../../../util/axios'
const state = {
    userlist: [],
    size: 2, //查询条数
    page: 1, //页码数
    count: 0 //分页总数
}
const getters = {
    //返回管理员列表
    getuserlist(state) {
        return state.userlist
    },
    //返回分页总数
    getCount(state) {
        return state.count
    },
    //返回每页显示的条数
    getSize(state) {
        return state.size
    }
}
const mutations = {
    REQ_USERLIST(state, payload) {
        state.userlist = payload
    },
    REQ_COUNT(state, payload) {
        state.count = payload
    },
    CHANGE_PAGE(state, payload) {
        state.page = payload
    }
}
const actions = {
    //封装一个获取管理员列表的行动
    userAction(context) {
        userList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                let list = res.data.list ? res.data.list : []
                context.commit('REQ_USERLIST', list)
                //删除的时候，page不等于1并且列表的内容数组为空的时候会出现bug，因此要改变page
                if (context.state.page != 1 && list.length == 0) {
                    //调取分页切换的行动
                    context.dispatch('pageAction', context.state.page - 1)
                }
            }
        })
    },
    //封装一个获取分页总数的行动
    countAction({ commit }) {
        userCount().then(res => {
            if (res.data.code == 200) {
                commit('REQ_COUNT', res.data.list[0].total)
            }
        })
    },
    //封装一个分页切换的行动
    pageAction(context, payload) {
        //payload为点击时的页码
        //切换页码时，修改page
        context.commit('CHANGE_PAGE', payload)
        //重新调用列表
        context.dispatch('userAction')
    }
}
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}