import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: 'main'
  },
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
    name: 'SelfFollowers',
    component: () => import('@/views/SelfFollowers.vue')
  },
  {
    path: '/user/self',
    name: 'UserProfile',
    component: () => import('@/views/UserProfile.vue')
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
    component: () => import('@/views/UserSignIn.vue')
  },
  {
    path: '/reply_list',
    name: 'SingleTweet',
    component: () => import('@/views/SingleTweet.vue')
  },
  {
    path: '/admin',
    component: () => import('@/views/Admin.vue'),
    children: [
      {
        path: '',
        redirect: 'main'
      },
      {
        path: 'signin',
        component: () => import('@/views/UserSignIn.vue')
      },
      {
        path: 'main',
        component: () => import('@/views/admin/AdminMain.vue')
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/views/admin/AdminUsers.vue')
      }
    ]
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
