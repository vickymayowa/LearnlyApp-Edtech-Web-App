<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-300">
    <div
      class="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-10 bg-white rounded-xl shadow-md"
    >
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Edit Product</h2>
        <p class="mt-2 text-sm text-gray-600">Enter product details below</p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="updateProduct">
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              v-model="product.name"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-1"
              placeholder="Product Name"
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              id="description"
              v-model="product.description"
              rows="3"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-1"
              placeholder="Product Description"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              v-model="product.price"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-1"
              placeholder="Product Price"
            />
          </div>
          <div>
            <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              id="image"
              @change="handleImageSelect"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-1"
            />
            <p v-if="!product.image" class="mt-2 text-sm text-red-600">Please select an image</p>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Product
          </button>
        </div>
      </form>
      <Loader v-if="loading" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { cloudinary } from '../cloudinary'
import axios from 'axios'
import { useProductsStore } from '../stores/products'
import { useRouter, useRoute } from 'vue-router'
import Loader from '../components/Loader.vue'

const product = ref({
  name: '',
  description: '',
  price: 0,
  image: null
})

const productsStore = useProductsStore()
const router = useRouter()
const route = useRoute()
const loading = ref(false)
const editing = ref(false)

onMounted(async () => {
  const id = route.params.id
  const productData = await productsStore.getProductById(id)
  product.value = { ...productData }
})

function handleImageSelect(event) {
  const file = event.target.files[0]
  if (file) {
    product.value.image = file
  }
}

async function uploadImage(file) {
  const uploadPreset = 'web-app'
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/upload`
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  try {
    const response = await axios.post(cloudinaryUrl, formData)
    return response.data.secure_url
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

async function updateProduct() {
  const id = route.params.id
  try {
    loading.value = true
    if (product.value.image) {
      const imageURL = await uploadImage(product.value.image)
      product.value.imageURL = imageURL
    }
    await productsStore.updateProduct(id, product.value)
  } catch (error) {
    console.log(error)
    console.error('Error updating product:', error)
    alert('Failed to update product. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>
