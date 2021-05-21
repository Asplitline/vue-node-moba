import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home = () => import('@/views/Home.vue')
const Main = () => import('@/views/Main.vue')
const Test = () => import('@/views/Test.vue')
const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/', name: 'Home', component: Home },
    ]
  },
  {
    path: '*',
    name: 'test',
    component: Test
  }
]

const router = new VueRouter({
  routes
})

export default router
