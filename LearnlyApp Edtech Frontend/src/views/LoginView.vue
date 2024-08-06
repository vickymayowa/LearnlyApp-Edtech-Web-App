<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-300">
    <div class="w-full max-w-md space-y-8 p-10 bg-white rounded-xl">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Mia E-commerce</h2>
        <p class="mt-2 text-sm text-gray-600">Sign in to your account</p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div v-if="errors.form" class="text-red-600">{{ errors.form }}</div>
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              :class="[
                'appearance-none rounded-none relative block w-full px-3 py-2 border mt-2',
                errors.email ? 'border-red-300' : 'border-gray-300',
                'placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              ]"
              placeholder="Email address"
              v-model="email"
            />
            <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
          </div>
          <div class="py-5">
            <label for="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              :class="[
                'appearance-none rounded-none relative block w-full px-3 py-2 border mt-2',
                errors.password ? 'border-red-300' : 'border-gray-300',
                'placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              ]"
              placeholder="Password"
              v-model="password"
            />
            <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</p>
          </div>
        </div>
        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span v-if="isLoading">
              <span class="spinner"></span>
              <span class="pl-3">Authenticating</span>
            </span>
            <span v-else class="pl-3">Login</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const errors = reactive({})
    const isLoading = ref(false)

    const store = useStore()
    const router = useRouter()

    const validateForm = () => {
      errors.value = {}
      if (!email.value) errors.value.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(email.value)) errors.value.email = 'Invalid email address'

      if (!password.value) errors.value.password = 'Password is required'
      else if (password.value.length < 8)
        errors.value.password = 'Password must be at least 8 characters'

      return Object.keys(errors.value).length === 0
    }

    const handleSubmit = async () => {
      if (validateForm()) {
        isLoading.value = true
        try {
          await store.dispatch('login', { email: email.value, password: password.value })
          email.value = ''
          password.value = ''
          router.push('/')
        } catch (error) {
          errors.value.form = 'Login failed. Please try again.'
          alert('Login failed. Please try again.')
        } finally {
          isLoading.value = false
        }
      }
    }

    return {
      email,
      password,
      errors,
      isLoading,
      handleSubmit
    }
  }
}
</script>
