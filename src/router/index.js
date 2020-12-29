import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store'

Vue.use(VueRouter)

/*
const authorizeIsUser = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && !(currentUser.role === 'user')) {
    next('/admin/main')
    return
  }
  next()
}

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && !(currentUser.role === 'admin')) {
    next('/404')
    return
  }
  next()
}
*/

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/main'
    // beforeEnter: authorizeIsUser
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/Main.vue')
    // beforeEnter: authorizeIsUser
  },
  {
    path: '/signup',
    name: 'UserSignUp',
    component: () => import('@/views/UserSignUp.vue')
  },
  {
    path: '/chat',
    component: () => import('@/views/Chat.vue')
    // beforeEnter: authorizeIsUser
  },
  {
    path: '/user/self/follower',
    name: 'SelfFollowers',
    component: () => import('@/views/SelfFollowers.vue')
    // beforeEnter: authorizeIsUser
  },
  {
    path: '/user/self',
    name: 'UserProfile',
    component: () => import('@/views/UserProfile.vue')
    // beforeEnter: authorizeIsUser
  },
  {
    path: '/user/other/:id',
    name: 'otherProfile',
    component: () => import('@/views/UserProfile.vue')
    // beforeEnter: authorizeIsUser
  },
  {
    path: '/user/self/following',
    name: 'SelfFollowing',
    component: () => import('@/views/SelfFollowers.vue')
    // beforeEnter: authorizeIsUser
  },
  {
    path: '/user/other/:id/following',
    component: () => import('@/views/OtherFollowers.vue')
    // beforeEnter: authorizeIsUser
  },
  {
    path: '/user/other/:id/follower',
    component: () => import('@/views/OtherFollowers.vue')
    // beforeEnter: authorizeIsUser
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/Setting.vue')
    // beforeEnter: authorizeIsUser
  },
  {
    path: '/signin',
    component: () => import('@/views/UserSignIn.vue')
  },
  {
    path: '/reply_list/:id',
    name: 'SingleTweet',
    component: () => import('@/views/SingleTweet.vue')
    // beforeEnter: authorizeIsUser
  },
  {
    path: '/admin',
    component: () => import('@/views/Admin.vue'),
    children: [
      {
        path: '/',
        redirect: 'main'
      },
      {
        path: 'signin',
        component: () => import('@/views/UserSignIn.vue')
      },
      {
        path: 'main',

        component: () => import('@/views/admin/AdminMain.vue')
        // beforeEnter: authorizeIsAdmin
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/views/admin/AdminUsers.vue')
        // beforeEnter: authorizeIsAdmin
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

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  const withoutAuthentication = ['/signin', '/signup', '/admin/signin']

  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    (async () => {
      isAuthenticated = await store.dispatch('fetchCurrentUser')
    })()
  }

  if (!isAuthenticated && !withoutAuthentication.includes(to.path)) {
    next('/signin')
    return
  }

  if (isAuthenticated && to.path === '/signin') {
    next('/main')
    return
  }
  next()
})

router.mode = 'history'

export default router
