import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from './../views/NotFound'

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
  },
  {
    path: '/user/self/follower',
    name: 'self-followers',
    component: () => import('@/views/SelfFollowers.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  },

]

const router = new VueRouter({
  
  routes
})

export default router
