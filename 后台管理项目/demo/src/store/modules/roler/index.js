import { roleList } from '../../../util/axios'
const state = {
    rolerList: []
}
const getters = {
    getrolerList(state) {
        return state.rolerList
    }
}
const mutations = {
    REQ_ROLER(state, payload) {
        state.rolerList = payload
    }
}
const actions = {
    rolerAction({ commit }) {
        roleList().then(res => {
            if (res.data.code == 200) {
                commit('REQ_ROLER', res.data.list)
            }
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