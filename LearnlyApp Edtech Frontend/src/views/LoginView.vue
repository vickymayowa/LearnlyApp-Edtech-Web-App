  <template>
    <div class="flex justify-center items-center min-h-screen bg-gray-300">
      <div
        class="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-10 bg-white rounded-xl shadow-md"
      >
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-bold text-gray-900">Mia E-commerce</h2>
          <p class="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
          <div v-if="errors.form" class="text-red-600 text-center">{{ errors.form }}</div>
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autocomplete="username"
                required
                :class="[
                  'appearance-none rounded-none relative block w-full px-3 py-2 border mt-2',
                  errors.username ? 'border-red-300' : 'border-gray-300',
                  'placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                ]"
                placeholder="Username"
                v-model="username"
                aria-describedby="username-error"
              />
              <p v-if="errors.username" id="username-error" class="mt-2 text-sm text-red-600">
                {{ errors.username }}
              </p>
            </div>
            <div class="py-5">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
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
                aria-describedby="password-error"
              />
              <p v-if="errors.password" id="password-error" class="mt-2 text-sm text-red-600">
                {{ errors.password }}
              </p>
            </div>
          </div>
          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span v-if="isLoading" class="flex items-center">
                <svg
                  class="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M12 6a6 6 0 0 1 6 6c0 1.8-.7 3.4-1.9 4.6l1.4 1.4a8.962 8.962 0 0 0 2.3-6A8.96 8.96 0 0 0 12 4c-1.8 0-3.4.7-4.6 1.9l1.4 1.4A5.962 5.962 0 0 1 12 6zm-7 6a7 7 0 0 1 14 0h-2a5 5 0 0 0-10 0H5z"
                    fill="currentColor"
                  />
                </svg>
                <span>Authenticating</span>
              </span>
              <span v-else>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import axios from 'axios'

export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const errors = reactive({ form: null, username: null, password: null })
    const isLoading = ref(false)
    const router = useRouter()
    const userStore = useUserStore()
    const validateForm = () => {
      errors.form = null
      errors.username = null
      errors.password = null

      if (!username.value) errors.username = 'Username is required'
      else if (username.value.length < 3) errors.username = 'Username must be at least 3 characters'

      if (!password.value) errors.password = 'Password is required'
      else if (password.value.length < 3) errors.password = 'Password must be at least 3 characters'

      return !errors.username && !errors.password
    }

    const handleSubmit = async () => {
      if (validateForm()) {
        isLoading.value = true
        const userData = {
          username: username.value,
          password: password.value
        }
        try {
          const response = await axios.post('/api/users/auth', userData)
          localStorage.setItem('token', response.data.token)
          const userInfo = response.data
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          userStore.setUser(userInfo) // Store user data in the user store
          router.push('/')
        } catch (error) {
          if (error.response) {
            errors.form = error.response.data.message || 'Login failed'
          } else {
            errors.form = 'Something went wrong. Please try again.'
          }
          console.error('Login error:', error)
        } finally {
          isLoading.value = false
        }
      }
    }

    return { username, password, errors, isLoading, handleSubmit }
  }
}
</script>

<style scoped>
.spinner {
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
