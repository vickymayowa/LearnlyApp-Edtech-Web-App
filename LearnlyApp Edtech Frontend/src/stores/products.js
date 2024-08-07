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
    products: [],
    product: {},
    loading: false,
    error: null
  }),
  actions: {
    async fetchProducts() {
      try {
        this.loading = true
        const response = await api.get('/product/products') // Adjust this endpoint as needed
        this.products = response.data
        this.loading = false
      } catch (error) {
        this.error = error
        this.loading = false
      }
    },
    async fetchProduct(id) {
      try {
        this.loading = true
        const response = await api.get(`/product/products/${id}`)
        this.product = response.data
        this.loading = false
      } catch (error) {
        this.error = error
        this.loading = false
      }
    },
    async addProduct(newProduct) {
      try {
        this.loading = true
        const response = await api.post('/product/createProduct', newProduct)
        console.log(response)
        this.products.push(response.data)
        this.loading = false
        alert('Product Added Successfully')
      } catch (error) {
        this.error = error
        this.loading = false
      }
    },
    async updateProduct(id, updatedProduct) {
      try {
        this.loading = true
        const response = await api.put(`/product/products/${id}`, updatedProduct)
        const index = this.products.findIndex((product) => product.id === id)
        this.products.splice(index, 1, response.data)
        this.loading = false
        alert('Product Updated Successfully')
      } catch (error) {
        this.error = error
        this.loading = false
      }
    },
    async deleteProduct(id) {
      try {
        this.loading = true
        await api.delete(`/product/products/${id}`)
        const index = this.products.findIndex((product) => product.id === id)
        this.products.splice(index, 1)
        this.loading = false
      } catch (error) {
        this.error = error
        this.loading = false
      }
    }
  }
})
