import { defineStore } from 'pinia'
import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})

const token = localStorage.getItem('token')

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: []
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await api.get('/product/products')
        this.products = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async addProduct(newProduct) {
      try {
        const response = await api.post('/product/createProduct', newProduct)
        this.products.push(response.data)
        alert('Product added successfully!')
      } catch (error) {
        console.error(error)
      }
    }
  }
})
