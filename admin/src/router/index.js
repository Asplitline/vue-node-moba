import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import('@/views/Main.vue')

const CategoryEdit = () => import('@/views/CategoryEdit.vue')
const CategoryList = () => import('@/views/CategoryList.vue')

const ItemEdit = () => import('@/views/ItemEdit.vue')
const ItemList = () => import('@/views/ItemList.vue')

const HeroEdit = () => import('@/views/HeroEdit.vue')
const HeroList = () => import('@/views/HeroList.vue')

const ArticleEdit = () => import('@/views/ArticleEdit.vue')
const ArticleList = () => import('@/views/ArticleList.vue')

const AdsEdit = () => import('@/views/AdsEdit.vue')
const AdsList = () => import('@/views/AdsList.vue')

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },

      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList },

      { path: '/heroes/create', component: HeroEdit },
      { path: '/heroes/edit/:id', component: HeroEdit, props: true },
      { path: '/heroes/list', component: HeroList },

      { path: '/article/create', component: ArticleEdit },
      { path: '/article/edit/:id', component: AdsEdit, props: true },
      { path: '/article/list', component: AdsList },

      { path: '/ads/create', component: AdsEdit },
      { path: '/ads/edit/:id', component: AdsEdit, props: true },
      { path: '/ads/list', component: AdsList }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
