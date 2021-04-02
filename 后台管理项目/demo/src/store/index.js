import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

import menu from './modules/menu'
import roler from './modules/roler'
import manger from './modules/manger'
import cate from './modules/cate'
import specs from './modules/goodsspecs'
import goods from './modules/goods'
import member from './modules/member'
import banner from './modules/banner'
import seck from './modules/seck'

export default new Vuex.Store({
    state: {
        //用户信息
        //取出存储的信息
        userInfo: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
    },
    getters: {
        //返回用户信息
        getUserInfo(state) {
            return state.userInfo
        }
    },
    mutations: {
        CHANGE_USERINFO(state, payload) {
            //存储
            if (payload) {
                state.userInfo = payload
                sessionStorage.setItem('user', JSON.stringify(payload))
            }else{
                //如果退出，删除存储的内容
                sessionStorage.removeItem('user')
            }
        }
    },
    actions: {
        //封装一个修改用户信息的行动
        userInfoAction({ commit }, payload) {
            commit('CHANGE_USERINFO', payload)
        }
    },
    modules: {
        menu,
        roler,
        manger,
        cate,
        specs,
        goods,
        member,
        banner,
        seck
    }
})