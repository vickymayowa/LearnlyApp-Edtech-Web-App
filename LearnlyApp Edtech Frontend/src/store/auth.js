import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    error: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.error = null
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    CLEAR_USER(state) {
      state.user = null
      state.error = null
    }
  },
  actions: {
    async login({ commit }, userData) {
      try {
        // Simulate API call
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (userData.email === 'test@example.com') {
              resolve()
            } else {
              reject(new Error('Invalid credentials'))
            }
          }, 2000)
        })
        commit('SET_USER', userData)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      }
    },
    logout({ commit }) {
      commit('CLEAR_USER')
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user
    },
    error(state) {
      return state.error
    }
  }
})
