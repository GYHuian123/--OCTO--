import { memberList } from '../../../util/axios'
const state = {
    memberList: []
}
const getters = {
    getmemberList(state) {
        return state.memberList
    }
}
const mutations = {
    REQ_MEMBER(state, payload) {
        state.memberList = payload
    }
}
const actions = {
    memberAction({ commit }) {
        memberList().then(res => {
            if (res.data.code == 200) {
                commit('REQ_MEMBER', res.data.list)
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