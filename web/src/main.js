import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/style.scss'
Vue.config.productionTip = false
import axios from 'axios'
const http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})
Vue.prototype.$http = http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
