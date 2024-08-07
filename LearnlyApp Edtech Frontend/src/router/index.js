import { createWebHistory, createRouter } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import AddProductView from '../views/AddProduct.vue'
import NotFound from '../views/NotFound.vue'
import { useUserStore } from '../stores/user.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: async (to, from, next) => {
      const userStore = useUserStore()
      userStore.checkAuth()
      if (!userStore.isAuthenticated) {
        return next({ name: 'login' }) // redirect to login page
      }
      next()
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/add-product',
    component: AddProductView
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
