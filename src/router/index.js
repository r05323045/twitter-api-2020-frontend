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
    path: '/regist',
    name: "SignUp",
    component: () => import('@/views/SignUp.vue')
  },
  {
    path: '/user/self/follower',
    name: "SelfFollowers",
    component: () => import('@/views/SelfFollowers.vue')
  },
  // {
  //   path: '/setting',
  //   name: 'Setting',
  //   component: () => import('@/views/Setting.vue')
  // },
  {
    path: '/signin',
    name: 'UserSignIn',
    component: () => import('@/views/UserSignIn.vue')
  },
  {
    path: '/reply_list',
    name: 'SingleTweet',
    component: () => import('@/views/SingleTweet.vue')
  }
  // {
  //   path: '/tweet',
  //   name: 'NewPopUp.vue',
  //   component: () => import()
  // }
]

const router = new VueRouter({
  routes
})

export default router
