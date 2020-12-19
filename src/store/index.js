import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      avatar: '',
      name: '',
      account: '',
      introduction: '',
      email: '',
      role: ''
    },
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
    }
  },
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()

        const { id, name, account, avatar, role, introduction, email } = data

        commit('setCurrentUser', {
          id,
          name,
          account,
          email,
          introduction,
          avatar,
          role
        })
      } catch (error) {
        console.error(error.message)
      }
    }
  },
  modules: {
  }
})
