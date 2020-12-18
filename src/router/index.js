import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/Main.vue')
  },
  
  {
    path: '/signup',
    name: "UserSignUp",
    component: () => import('@/views/UserSignUp.vue')
  },
  {
    path: '/user/self/follower',
    name: "SelfFollowers",
    component: () => import('@/views/SelfFollowers.vue')
  },
  {
    path: '/user/self/following',
    name: "SelfFollowing",
    component: () => import('@/views/SelfFollowers.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/Setting.vue')
  },
  {
    path: '/signin',
    name: 'UserSignIn',
    component: () => import('@/views/UserSignIn.vue')
  },
  {
    path: '/reply_list',
    name: 'SingleTweet',
    component: () => import('@/views/SingleTweet.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

export default router
