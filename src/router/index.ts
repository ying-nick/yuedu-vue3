import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../components/header.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component:Home 
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/login.vue')
  },
  {
    path: '/content',
    name: 'content',
    component: () => import( '../views/BookContent.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
