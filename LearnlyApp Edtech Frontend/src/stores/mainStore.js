// src/stores/mainStore.js
import { defineStore } from 'pinia'
import axios from 'axios' // Make sure to install axios: npm install axios

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null,
    token: null,
    products: [],
    currentProduct: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getProducts: (state) => state.products,
    getCurrentProduct: (state) => state.currentProduct
  },

  actions: {
    setLoading(status) {
      this.loading = status
    },

    setError(error) {
      this.error = error
    },

    async registerUser(userData) {
      this.setLoading(true)
      try {
        const response = await axios.post('/api/register', userData)
        this.user = response.data.user
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        this.setLoading(false)
      } catch (error) {
        this.setError(error.response.data.message || 'Registration failed')
        this.setLoading(false)
        throw error
      }
    },

    async login(credentials) {
      this.setLoading(true)
      try {
        const response = await axios.post('/api/auth', credentials)
        this.user = response.data.user
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        this.setLoading(false)
      } catch (error) {
        this.setError(error.response.data.message || 'Login failed')
        this.setLoading(false)
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },

    async createProduct(productData) {
      this.setLoading(true)
      try {
        const response = await axios.post('/api/createProduct', productData, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.products.push(response.data)
        this.setLoading(false)
      } catch (error) {
        this.setError(error.response.data.message || 'Failed to create product')
        this.setLoading(false)
        throw error
      }
    },

    async getAllProducts() {
      this.setLoading(true)
      try {
        const response = await axios.get('/api/products', {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.products = response.data
        this.setLoading(false)
      } catch (error) {
        this.setError(error.response.data.message || 'Failed to fetch products')
        this.setLoading(false)
        throw error
      }
    },

    async getProductById(id) {
      this.setLoading(true)
      try {
        const response = await axios.get(`/api/products/${id}`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.currentProduct = response.data
        this.setLoading(false)
      } catch (error) {
        this.setError(error.response.data.message || 'Failed to fetch product')
        this.setLoading(false)
        throw error
      }
    },

    async updateProductById(id, productData) {
      this.setLoading(true)
      try {
        const response = await axios.put(`/api/products/${id}`, productData, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.products[index] = response.data
        }
        this.currentProduct = response.data
        this.setLoading(false)
      } catch (error) {
        this.setError(error.response.data.message || 'Failed to update product')
        this.setLoading(false)
        throw error
      }
    },

    async deleteProductById(id) {
      this.setLoading(true)
      try {
        await axios.delete(`/api/products/${id}`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.products = this.products.filter((p) => p.id !== id)
        if (this.currentProduct && this.currentProduct.id === id) {
          this.currentProduct = null
        }
        this.setLoading(false)
      } catch (error) {
        this.setError(error.response.data.message || 'Failed to delete product')
        this.setLoading(false)
        throw error
      }
    }
  }
})
