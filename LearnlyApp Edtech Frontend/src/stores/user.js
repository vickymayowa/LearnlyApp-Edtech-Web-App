import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  actions: {
    setUser(userData) {
      this.user = userData
      this.isAuthenticated = true
      localStorage.setItem('userInfo', JSON.stringify(userData))
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('userInfo')
    },
    checkAuth() {
      const storedUser = localStorage.getItem('userInfo')
      if (storedUser) {
        this.user = JSON.parse(storedUser)
        this.isAuthenticated = true
      }
    }
  }
})
