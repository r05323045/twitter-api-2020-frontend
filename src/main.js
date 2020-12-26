import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import moment from 'moment'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import MyLoading from '@/components/MyLoading'
import VueSocketIO from 'vue-socket.io'

Vue.use(VModal)
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://simple-twitter-demo-ac.herokuapp.com',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

Vue.filter('fromNow', function (datetime) {
  if (!datetime) {
    return '-'
  }
  return moment(datetime).fromNow()
})

Vue.component('MyLoading', MyLoading)
Vue.component('Loading', Loading)

Vue.use(Loading, {
  loader: 'spinner',
  opacity: 0.8,
  isFullPage: false,
  height: 32,
  width: 32,
  color: '#00457C'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
