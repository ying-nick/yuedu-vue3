import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
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
  history: createWebHashHistory(),
  routes
})

export default router
