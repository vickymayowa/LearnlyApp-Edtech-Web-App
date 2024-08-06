import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    user: null,
    token: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/api/user/auth', credentials)
        commit('SET_USER', response.data.user)
        commit('SET_TOKEN', response.data.token)
      } catch (error) {
        throw error
      }
    }
  }
})

export default store
