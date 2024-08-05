<!-- src/components/Register.vue -->
<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="name">Name:</label>
        <input v-model="name" id="name" type="text" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="email" id="email" type="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <button type="submit" :disabled="authStore.loading">Register</button>
    </form>
    <p v-if="authStore.error" class="error">{{ authStore.error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const name = ref('')
    const email = ref('')
    const password = ref('')

    const handleRegister = async () => {
      try {
        await authStore.register({ name: name.value, email: email.value, password: password.value })
        // router.push('/dashboard')
      } catch (error) {
        console.error('Registration error:', error)
      }
    }

    return {
      authStore,
      name,
      email,
      password,
      handleRegister
    }
  }
}
</script>
