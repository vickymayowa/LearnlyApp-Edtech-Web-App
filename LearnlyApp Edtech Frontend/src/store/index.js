import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    user: null
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await axios.get('/api/products')
      commit('SET_PRODUCTS', response.data)
    },
    async addProduct({ dispatch }, product) {
      await axios.post('/api/products', product)
      dispatch('fetchProducts')
    },
    async login({ commit }, credentials) {
      const response = await axios.post('/api/login', credentials)
      commit('SET_USER', response.data)
    }
  }
})
