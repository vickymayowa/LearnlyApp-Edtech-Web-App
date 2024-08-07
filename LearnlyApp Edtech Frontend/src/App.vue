<template>
  <nav class="bg-gray-300 p-4">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between">
        <RouterLink to="/" class="text-gray-800 font-bold text-2xl">Mia E-commerce</RouterLink>
        <div class="md:hidden">
          <button @click="toggleMenu" class="text-gray-800 hover:text-gray-600 focus:outline-none">
            <MenuIcon v-if="!isOpen" class="h-6 w-6" />
            <XIcon v-else class="h-6 w-6" />
          </button>
        </div>
        <div class="hidden md:flex space-x-6 font-medium sans-serif not-italic">
          <RouterLink
            to="/"
            class="text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out"
            >Home</RouterLink
          >
          <template v-if="!userStore.isAuthenticated">
            <RouterLink
              to="/login"
              class="text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out"
              >Login</RouterLink
            >
          </template>
          <template v-else>
            <RouterLink
              to="/add-product"
              class="text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out"
              >Add Product</RouterLink
            >
          </template>
        </div>
      </div>
      <div v-if="isOpen" class="md:hidden mt-4">
        <div class="flex flex-col space-y-2">
          <RouterLink
            to="/"
            class="text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out"
            @click="toggleMenu"
            >Home</RouterLink
          >
          <template v-if="!userStore.isAuthenticated">
            <RouterLink
              to="/login"
              class="text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out"
              @click="toggleMenu"
              >Login</RouterLink
            >
          </template>
          <template v-else>
            <RouterLink
              to="/add-product"
              class="text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out"
              >Add Product</RouterLink
            >
          </template>
        </div>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<script setup>
import { ref } from 'vue'
import { MenuIcon, XIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user'

const userStore = useUserStore()
const router = useRouter()

const isOpen = ref(false)

userStore.checkAuth()

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>
