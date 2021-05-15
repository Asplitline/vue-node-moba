import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/scss/global.scss'
Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

Vue.mixin({
  computed: {
    uploadURL () {
      return this.$http.defaults.baseURL + '/upload'
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
