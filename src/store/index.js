import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      avatar: '',
      cover: '',
      name: '',
      account: '',
      introduction: '',
      email: '',
      role: ''
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        const { data, statusText } = await usersAPI.getCurrentUser()
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }
        const { id, name, account, avatar, cover, role, introduction, email } = data

        commit('setCurrentUser', {
          id,
          name,
          account,
          email,
          introduction,
          avatar,
          cover,
          role
        })
        return true
      } catch (error) {
        console.error('can not fetch user information')
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
