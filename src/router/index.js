import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main.vue')
  },
  {
    path: '/signin',
    name: 'UserSignIn',
    component: () => import('@/views/UserSignIn.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
