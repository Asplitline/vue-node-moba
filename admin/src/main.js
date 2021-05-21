import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/scss/global.scss'
Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http
import myPlugin from './plugins/myPlugin'
Vue.use(myPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
