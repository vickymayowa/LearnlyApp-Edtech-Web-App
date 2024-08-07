<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">Welcome to Our Store</h1>
    <div v-if="loading" class="text-center text-xl">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      <p class="mt-4">Loading products...</p>
    </div>
    <div v-else-if="error" class="text-center text-xl text-red-600">{{ error }}</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
      >
        <div class="relative">
          <img
            :src="product.imageURL"
            :alt="product.name"
            class="w-full h-48 object-cover"
            @error="handleImageError"
          />
          <div
            class="absolute top-0 right-0 bg-indigo-600 text-white px-2 py-1 m-2 rounded-full text-sm"
          >
            {{ product.inStock }} in stock
          </div>
        </div>
        <div class="p-4">
          <div class="flex justify-between items-start mb-2">
            <h2 class="text-xl font-semibold">{{ product.name }}</h2>
            <p class="text-gray-600 text-sm">By {{ product.creator }}</p>
          </div>
          <p class="text-gray-600 mb-4 h-20 overflow-hidden">{{ product.description }}</p>
          <div class="flex justify-between items-center mb-4">
            <p class="text-2xl font-bold text-indigo-600">${{ product.price.toFixed(2) }}</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              @click="editProduct(product)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
              <span>Edit</span>
            </button>
            <button
              class="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              @click="confirmDelete(product)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductsStore } from '../stores/products'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'HomeView',
  computed: {
    ...mapState(useProductsStore, ['products', 'loading', 'error'])
  },
  methods: {
    ...mapActions(useProductsStore, ['fetchProducts', 'editProduct', 'deleteProduct']),
    handleImageError(e) {
      e.target.src = '/placeholder-image.jpg'
    },
    confirmDelete(product) {
      if (confirm(`Are you sure you want to delete ${product.name}?`)) {
        this.deleteProduct(product._id)
      }
    }
  },
  created() {
    this.fetchProducts()
  }
}
</script>
