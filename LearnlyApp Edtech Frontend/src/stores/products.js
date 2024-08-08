import { defineStore } from 'pinia'
import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})
const setAuthToken = () => {
  const token = localStorage.getItem('token')
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

setAuthToken()

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    product: {},
    loading: false,
    searchQuery: '',
    error: null
  }),
  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/product/products')
        this.products = response.data
      } catch (error) {
        this.error = 'Failed to fetch products. Please try again later.'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async fetchProduct(id) {
      this.loading = true
      this.error = null
      try {
        const response = await api.get(`/products/${id}`)
        this.product = response.data
      } catch (error) {
        this.error = `Failed to fetch product with ID ${id}. Please try again later.`
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async searchProducts(query) {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/product/search', {
          query: { name: query }
        })
        this.products = response.data
      } catch (error) {
        this.error = 'Failed to search products. Please try again later.'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async addProduct(newProduct) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('/product/createProduct', newProduct)
        this.products.push(response.data)
        alert('Product added successfully!')
      } catch (error) {
        this.error = 'Failed to add product. Please try again later.'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async updateProduct(id, updatedProduct) {
      this.loading = true
      this.error = null
      try {
        const response = await api.put(`/product/products/${id}`, updatedProduct)
        const index = this.products.findIndex((product) => product.id === id)
        if (index !== -1) {
          this.products[index] = response.data
        }
        alert('Product updated successfully!')
      } catch (error) {
        this.error = `Failed to update product with ID ${id}. Please try again later.`
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async deleteProduct(id) {
      this.loading = true
      this.error = null
      try {
        await api.delete(`/product/products/${id}`)
        this.products = this.products.filter((product) => product.id !== id)
        alert('Product deleted successfully!')
        this.products.push(response.data)
      } catch (error) {
        this.error = `Failed to delete product with ID ${id}. Please try again later.`
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
})
