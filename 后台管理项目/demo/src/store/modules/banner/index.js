import { bannerList } from '../../../util/axios'
const state = {
    bannerlist: []
}
const getters = {
    getbannerlist(state) {
        return state.bannerlist
    }
}
const mutations = {
    REQ_BANNERLIST(state, payload) {
        state.bannerlist = payload
    }
}
const actions = {
    bannerAction({ commit }) {
        bannerList().then(res => {
            commit('REQ_BANNERLIST', res.data.list)
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