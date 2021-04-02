import { cateList } from '../../../util/axios'
const state = {
    catelist: []
}
const getters = {
    getcatelist(state) {
        return state.catelist
    }
}
const mutations = {
    REQ_CATELIST(state, payload) {
        state.catelist = payload
    }
}
const actions = {
    cateAction({ commit }) {
        cateList().then(res => {
            commit('REQ_CATELIST', res.data.list)
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