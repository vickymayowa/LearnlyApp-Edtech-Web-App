import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { createPinia } from 'pinia'
import router from './router'
const pinia = createPinia()

createApp(App).use(store).use(pinia).use(router).mount('#app')
