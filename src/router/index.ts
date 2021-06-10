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
    path: '/category',
    name: 'Category',
    component: () => import( '../views/Category.vue'),
    meta: {
      title: "分类"
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
