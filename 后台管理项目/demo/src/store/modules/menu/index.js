import { menuList } from '../../../util/axios'
const state = {
    menulist: []
}
const getters = {
    getmenulist(state) {
        return state.menulist
    }
}
const mutations = {
    REQ_MENULIST(state, payload) {
        state.menulist = payload
    }
}
const actions = {
    menuAction({ commit }) {
        menuList().then(res => {
            commit('REQ_MENULIST', res.data.list)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}