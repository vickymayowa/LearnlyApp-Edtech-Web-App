<template>
  <div>
    <div class="text-center">uiiuweuiweuiewu</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductList',
  data() {
    return {
      searchTerm: ''
    }
  },
  computed: {
    ...mapState(['products']),
    ...mapGetters(['filteredProducts'])
  },
  methods: {
    ...mapActions(['fetchProducts'])
  },
  created() {
    this.fetchProducts()
  }
}
</script>
