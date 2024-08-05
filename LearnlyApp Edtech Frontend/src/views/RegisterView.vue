<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your name"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="mb-4">
          <label for="gender" class="block text-gray-700 font-medium mb-2">Gender</label>
          <select
            id="gender"
            v-model="gender"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          >
            <option value="" disabled selected>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="occupation" class="block text-gray-700 font-medium mb-2">Occupation</label>
          <select
            id="occupation"
            v-model="occupation"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          >
            <option value="" disabled selected>Select your occupation</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="product_manager">Product Manager</option>
            <option value="qa_engineer">QA Engineer</option>
            <option value="data_scientist">Data Scientist</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2">Skills</label>
          <div class="flex flex-wrap">
            <div class="w-1/2 mb-2">
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="skills"
                  value="Node.js"
                  class="form-checkbox h-4 w-4 text-blue-600"
                />
                <span class="ml-2">Node.js</span>
              </label>
            </div>
            <div class="w-1/2 mb-2">
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="skills"
                  value="TypeScript"
                  class="form-checkbox h-4 w-4 text-blue-600"
                />
                <span class="ml-2">TypeScript</span>
              </label>
            </div>
            <div class="w-1/2 mb-2">
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="skills"
                  value="React.js"
                  class="form-checkbox h-4 w-4 text-blue-600"
                />
                <span class="ml-2">React.js</span>
              </label>
            </div>
            <div class="w-1/2 mb-2">
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  v-model="skills"
                  value="Vue.js"
                  class="form-checkbox h-4 w-4 text-blue-600"
                />
                <span class="ml-2">Vue.js</span>
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
      </form>
      <p v-if="authStore.error" class="error mt-4 text-red-600">{{ authStore.error }}</p>
    </div>
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
    const gender = ref('')
    const occupation = ref('')
    const skills = ref([])

    const handleRegister = async () => {
      try {
        await authStore.register({
          name: name.value,
          email: email.value,
          password: password.value,
          gender: gender.value,
          occupation: occupation.value,
          skills: skills.value
        })
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
      gender,
      occupation,
      skills,
      handleRegister
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
