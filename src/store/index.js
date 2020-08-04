import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        user_id: null,
        auth_token: null,
        profile_built: false,
        profile: null,
        consultee: null,
    },
    mutations: {
        SET_AUTHENTICATION: (state, payload) => {
            state.isAuthenticated = payload.status;
            state.user_id = payload.id;
            state.auth_token = payload.token;
        },
        PROFILE_BUILT: (state, payload) => {
            state.profile_built = payload;
        },
        SET_CONSULTEE_DETAILS: (state, payload) => {
            state.consultee = payload;
        },
        SET_PROFILE: (state, payload) => {
            state.profile = payload;
        }
    },
    actions: {
        set_authentication: ({ commit }, payload) => {
            commit('SET_AUTHENTICATION', payload);
        },
        profile_built: ({ commit }, payload) => {
            commit('PROFILE_BUILT', payload);
        },
        set_consultee_details: ({ commit }, payload) => {
            commit('SET_CONSULTEE_DETAILS', payload);
        },
        set_profile: ({ commit }, payload) => {
            commit('SET_PROFILE', payload);
        }
    },
    modules: {}
})