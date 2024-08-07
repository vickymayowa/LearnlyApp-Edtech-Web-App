<template>
  <div class="product-list">
    <h1>Products</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        <Product :product="product" />
      </li>
    </ul>
  </div>
</template>

<script>
import Product from '../components/Product.vue'

export default {
  components: { Product },
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.product-list {
  margin: 20px;
}
</style>
