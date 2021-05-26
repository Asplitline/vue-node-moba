import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home = () => import('@/views/Home.vue')
const Main = () => import('@/views/Main.vue')
const Article = () => import('@/views/Article.vue')
const Test = () => import('@/views/Test.vue')
const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/', name: 'Home', component: Home },
      { path: '/article/:id', name: 'Article', component: Article, props: true },
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
