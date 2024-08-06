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
          <RouterLink
            to="/login"
            class="text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out"
            >Login</RouterLink
          >
          <RouterLink
            to="/products"
            class="text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out"
            >Products</RouterLink
          >
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
          <RouterLink
            to="/about"
            class="text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out"
            @click="toggleMenu"
            >About</RouterLink
          >
          <RouterLink
            to="/login"
            class="text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out"
            @click="toggleMenu"
            >Login</RouterLink
          >
          <RouterLink
            to="/products"
            class="text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out"
            @click="toggleMenu"
            >Products</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<script setup>
import { ref } from 'vue'
import { MenuIcon, XIcon } from 'lucide-vue-next'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>
