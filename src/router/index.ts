import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path:"/", name:"base",redirect:{name:'Home'}
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/login.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import( '../views/Detail.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../views/register.vue')
  },
  {
    path: '/bookshelf',
    name: 'bookshelf',
    component: () => import( '../views/bookshelf.vue')
  },
  {
    path: '/cartoon',
    name: 'cartoon',
    component: () => import( '../views/cartoon.vue')
  },
  {
    path: '/cartoon/detail',
    name: 'detail',
    component: () => import( '../views/cartoondetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
