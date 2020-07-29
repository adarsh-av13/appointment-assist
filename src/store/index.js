import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        user_id: null,
        auth_token: null,
        profile_built: false
    },
    mutations: {
        SET_AUTHENTICATION: (state, payload) => {
            state.isAuthenticated = payload.status;
            state.user_id = payload.id;
            state.auth_token = payload.token;
        },
        PROFILE_BUILT: (state, payload) => {
            state.profile_built = payload;
        }
    },
    actions: {
        set_authentication: ({ commit }, payload) => {
            commit('SET_AUTHENTICATION', payload);
        },
        profile_built: ({ commit }, payload) => {
            commit('PROFILE_BUILT', payload);
        }
    },
    modules: {}
})