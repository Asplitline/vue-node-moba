import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import('@/views/Main.vue')
const Login = () => import('@/views/Login.vue')

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

const AdminUserEdit = () => import('@/views/AdminUserEdit.vue')
const AdminUserList = () => import('@/views/AdminUserList.vue')

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
      { path: '/article/edit/:id', component: ArticleEdit, props: true },
      { path: '/article/list', component: ArticleList },

      { path: '/ads/create', component: AdsEdit },
      { path: '/ads/edit/:id', component: AdsEdit, props: true },
      { path: '/ads/list', component: AdsList },

      { path: '/admin_user/create', component: AdminUserEdit },
      { path: '/admin_user/edit/:id', component: AdminUserEdit, props: true },
      { path: '/admin_user/list', component: AdminUserList }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isPublic: true
    },
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.getItem('token')) {
    return next('/login')
  }
  next()
})

export default router
