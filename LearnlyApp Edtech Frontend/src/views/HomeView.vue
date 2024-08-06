<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const products = ref([])

    const searchQuery = ref('')

    const filteredProducts = computed(() => {
      return products.value.filter((product) => {
        return product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      })
    })

    const searchProducts = () => {}

    return {
      products,
      searchQuery,
      filteredProducts,
      searchProducts
    }
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto text-center text-gray-600 text-3xl">Our Products</div>
  </div>
</template>
