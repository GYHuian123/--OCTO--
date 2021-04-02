import { seckList } from '../../../util/axios'
const state = {
    secklist: []
}
const getters = {
    getsecklist(state) {
        return state.secklist
    }
}
const mutations = {
    REQ_SECKLIST(state, payload) {
        state.secklist = payload
    }
}
const actions = {
    seckAction({ commit }) {
        seckList().then(res => {
            commit('REQ_SECKLIST', res.data.list)
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