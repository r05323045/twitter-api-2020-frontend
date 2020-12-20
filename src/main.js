import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import moment from 'moment'

Vue.use(VModal)
Vue.config.productionTip = false

Vue.filter('fromNow', function (datetime) {
  if (!datetime) {
    return '-'
  }
  return moment(datetime).fromNow()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
