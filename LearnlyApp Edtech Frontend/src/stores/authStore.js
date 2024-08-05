// src/stores/authStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    setLoading(status) {
      this.loading = status
    },

    setError(error) {
      this.error = error
    },

    async register(userData) {
      this.setLoading(true)
      try {
        const response = await axios.post('/users/register', userData)
        this.user = response.data.user
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        this.setError(null)
      } catch (error) {
        this.setError(error.response?.data?.message || 'Registration failed')
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async login(credentials) {
      this.setLoading(true)
      try {
        const response = await axios.post('/api/auth', credentials)
        this.user = response.data.user
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        this.setError(null)
      } catch (error) {
        this.setError(error.response?.data?.message || 'Login failed')
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
